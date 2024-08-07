import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Collapse, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Paper } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import ExpenserLogo from '../assets/ExpenserLogo.png';

// HomePage component definition
const HomePage = () => {
  // State to manage the menu's open/close status
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme and media query to determine if the screen size is mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Array of menu items
  const menuItems = ['Dashboard', 'Analytics', 'Reports'];

  return (
    // Main container with background color and minimum height
    <Box sx={{ backgroundColor: '#8ecae6', minHeight: '100vh' }}>
      {/* AppBar component for the navigation bar */}
      <AppBar position="static" style={{ backgroundColor: '#023047' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Site Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={ExpenserLogo} alt="Expenser Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              Expenser
            </Typography>
          </Box>

          {/* Menu items for larger screens */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              {menuItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Menu icon for mobile screens */}
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
        </Toolbar>
      </AppBar>

      {/* Collapsible menu for mobile screens */}
      {isMobile && (
        <Collapse in={menuOpen}>
          <Paper elevation={3}>
            <List component="nav" aria-label="main mailbox folders">
              {menuItems.map((item) => (
                <ListItem component="button" key={item}>
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