import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  hoverColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color = '#9333ea',
  hoverColor = '#7e22ce',
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: color,
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
