/**
 * Utility functions for handling token operations
 */

/**
 * Checks if a token address is valid
 * @param tokenAddress The token address to check
 * @returns True if the address is valid, false otherwise
 */
export const isValidTokenAddress = (tokenAddress: string | undefined): boolean => {
  // Check if tokenAddress is undefined, null, empty, or contains only whitespace
  if (!tokenAddress || tokenAddress.trim() === '') {
    return false;
  }

  // Check if the address has the correct format (0x followed by 40 hex characters)
  // This is a simple check, not a full validation
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(tokenAddress);
};

/**
 * Normalizes a token address by removing whitespace and converting to lowercase
 * @param tokenAddress The token address to normalize
 * @returns The normalized token address
 */
export const normalizeTokenAddress = (tokenAddress: string): string => {
  return tokenAddress.trim().toLowerCase();
};
