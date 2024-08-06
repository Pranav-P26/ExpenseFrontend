import React from 'react';
import { Button, Typography, Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h1">Welcome to My App</Typography>
      <Typography variant="body1">This text uses the theme's body1 style.</Typography>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
        Secondary Button
      </Button>
    </Box>
  );
}

export default App;