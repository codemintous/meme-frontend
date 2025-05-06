import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { jwtToken, setJwtToken } = useAuth();

  const authenticateUser = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/authenticate`, {
        address,
      });

      if (res.status === 200 && res.data.token) {
        setJwtToken(res.data.token);
        localStorage.setItem('jwtToken', res.data.token);
        console.log('JWT token set:', res.data.token);
      } else {
        console.error('Authentication failed: no token in response');
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Authentication Error:', error.response?.data?.message || error.message);
        } else {
          console.error('Unexpected Error:', error);
        }
      }
  };

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
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
          address,
          accountId: '0.0.5952027',
          network: 'testnet',
          privateKey: '3030020100300706052b8104000a04220420ea7737ce0b516f956c1f699090823505f259d6dd026579802c8e2c2259f95f8e',
          publicKey: '302d300706052b8104000a03220003b38703f1497428022ccfaebe6bf68b46ae3cf38c58b176c6e7bff021502329b3',
        });

        console.log('User registered successfully');
        await authenticateUser();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          if (
            error.response?.status === 400 &&
            (message?.includes('User already exists') || message?.includes('address'))
          ) {
            console.log('User already exists, proceeding to authenticate...');
            await authenticateUser();
          } else {
            console.error('Registration Error:', message || error.message);
          }
        } else {
          console.error('Unexpected Error:', error);
        }
      }
    };

    initAuth();
  }, [isConnected, address]);

  // Clear token on disconnect
  useEffect(() => {
    if (!isConnected) {
      localStorage.removeItem('jwtToken');
      setJwtToken(null);
      console.log('Wallet disconnected, JWT token cleared');
    }
  }, [isConnected]);
};
