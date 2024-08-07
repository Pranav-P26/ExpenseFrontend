import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Collapse, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Paper } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import ExpenserLogo from '../assets/ExpenserLogo.png';

const HomePage = () => {
  // State to manage the mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Use MUI's useTheme and useMediaQuery hooks for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Array of menu items
  const menuItems = ['Dashboard', 'Analytics', 'Reports'];

  return (
    <Box sx={{ backgroundColor: '#8ecae6', minHeight: '100vh' }}>
      {/* AppBar component for the header */}
      <AppBar position="static" style={{ backgroundColor: '#023047' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and app name */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '33%' }}>
            <img src={ExpenserLogo} alt="Expenser Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              Expenser
            </Typography>
          </Box>

          {/* Navigation links for non-mobile screens */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '33%' }}>
              {menuItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile menu toggle button */}
          <Box sx={{ width: '33%', display: 'flex', justifyContent: 'flex-end' }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
              >
                {menuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Collapsible mobile menu */}
      {isMobile && (
        <Collapse in={menuOpen}>
          <Paper elevation={3}>
            <List component="nav" aria-label="main mailbox folders">
              {menuItems.map((item) => (
                <ListItem button key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>
      )}
    </Box>
  );
};

export default HomePage;