import { Box, TextField } from '@mui/material';
import React from 'react';
import CustomButton from './CustomButton';
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  buttonLabel?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClick,
  buttonLabel = 'Search',
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'gray',
            '& fieldset': { borderColor: 'gray' },
            '&.Mui-focused fieldset': { borderColor: '#9333ea' },
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'gray',
            opacity: 1,
          },
        }}
      />
      <CustomButton label={buttonLabel} onClick={onClick} />
    </Box>
  );
};

export default SearchBar;
