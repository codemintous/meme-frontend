import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { jwtToken, setJwtToken } = useAuth();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('jwtToken');

      if (jwtToken || storedToken) {
        setJwtToken(storedToken);
        console.log('Token already present:', storedToken);
        return;
      }

      if (!isConnected || !address) return;

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/authenticate`, {
          userAddress: address,
          serverAddress: "server_address",
        });

        if (res.status === 200 && res.data.token) {
          setJwtToken(res.data.token);
          localStorage.setItem('jwtToken', res.data.token);
          console.log('JWT token set:', res.data.token);
        } else {
          console.error('Authentication failed: no token in response');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    initAuth();
  }, [isConnected, address]);

  useEffect(() => {
    if (!isConnected) {
      localStorage.removeItem('jwtToken');
      setJwtToken(null);
      console.log('Wallet disconnected, JWT token cleared');
    }
  }, [isConnected]);
};
