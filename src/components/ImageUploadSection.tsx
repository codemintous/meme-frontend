import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CardMedia
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploadSection = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addImages(files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    addImages(files);
  };

  const addImages = (files: File[]) => {
    const newTotal = totalSize + files.reduce((sum, f) => sum + f.size, 0);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setImageURLs((prev) => [...prev, ...newImageURLs]);
    setTotalSize(newTotal);
  };

  const removeAll = () => {
    setImages([]);
    setImageURLs([]);
    setTotalSize(0);
  };

  const formatMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="gray" mb={1}>
        {formatMB(totalSize)}mb / 100mb
      </Typography>

      <Typography variant="h6" mb={1}>
        Start training your image model
      </Typography>
      <Typography variant="body2" color="gray" mb={3}>
        Upload the best images that you have from your meme.
       
      </Typography>

      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input')?.click()}
        sx={{
          border: '2px dashed gray',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          mb: 3,
          minHeight: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: images.length > 0 ? 'flex-start' : 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />

        {imageURLs.length === 0 ? (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography color="gray">
              Drag and drop images here or{' '}
              <span style={{ textDecoration: 'underline' }}>click to add images</span>
            </Typography>
          </Box>
        ) : (
          imageURLs.map((url, index) => (
            <CardMedia
              key={index}
              component="img"
              image={url}
              alt={`uploaded-${index}`}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          ))
        )}
      </Box>

      {images.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            startIcon={<CloudUploadIcon />}
            variant="contained"
            color="primary"
            onClick={() => alert('Training started...')}
            sx={{ backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
          >
            Start training your image model
          </Button>

          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={removeAll}
          >
            Remove all images
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadSection;
