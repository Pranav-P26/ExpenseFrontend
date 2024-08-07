import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Collapse, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Paper, styled } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import ExpenserLogo from '../assets/ExpenserLogo.png';

// Styled components for custom appearance
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #023047 30%, #219ebc 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 158, 188, .3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(1),
  transition: 'background-color 0.3s, border-radius 0.3s', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
  },
}));

const StyledMobileMenu = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(45deg, #023047 30%, #219ebc 90%)',
  color: '#fff',
}));

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
  const menuItems = ['About', 'Features', 'Contact', 'Login', 'Sign Up'];

  return (
    <Box sx={{ backgroundColor: '#8ecae6', minHeight: '100vh' }}>
      {/* AppBar component for the header*/}
      <StyledAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and app name */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '33%' }}>
            <img src={ExpenserLogo} alt="Expenser Logo" style={{ height: '40px', marginRight: '10px' }} />
            {/* Enhanced Typography for app name */}
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>
              Expenser
            </Typography>
          </Box>

          {/* Navigation links for non-mobile screens*/}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '33%' }}>
              {menuItems.map((item) => (
                <StyledButton key={item}>
                  {item}
                </StyledButton>
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
      </StyledAppBar>

      {/* Collapsible mobile menu*/}
      {isMobile && (
        <Collapse in={menuOpen}>
          <StyledMobileMenu elevation={3}>
            <List component="nav" aria-label="main mailbox folders">
              {menuItems.map((item) => (
                <ListItem component="button" key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </StyledMobileMenu>
        </Collapse>
      )}
    </Box>
  );
};

export default HomePage;