// components/HorizontalScrollSection.tsx
"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ReactNode } from "react";

interface Props {
  id: string;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  showScrollButtons?: boolean;
  headerRight?: ReactNode;
}

export default function HorizontalScrollSection({
  id,
  title,
  icon,
  children,
  showScrollButtons = true,
  headerRight,
}: Props) {
  const scrollLeft = () => {
    const container = document.getElementById(id);
    if (container) container.scrollLeft -= 300;
  };

  const scrollRight = () => {
    const container = document.getElementById(id);
    if (container) container.scrollLeft += 300;
  };

  return (
    <Box position="relative" mb={6}>
      {showScrollButtons && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronLeft sx={{ color: "white" }} />
        </IconButton>
      )}

      {(title || headerRight) && (
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            {title && (
              <Typography variant="h5" fontWeight="bold">
                {title}
              </Typography>
            )}
          </Box>
          {headerRight}
        </Box>
      )}

      <Box
        id={id}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {children}
      </Box>

      {showScrollButtons && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: "-42px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ChevronRight sx={{ color: "white" }} />
        </IconButton>
      )}
    </Box>
  );
}
