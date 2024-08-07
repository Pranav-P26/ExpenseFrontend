import React, { useState, useMemo } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Collapse, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Paper } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import ExpenserLogo from '../assets/ExpenserLogo.png';

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#023047',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(1),
  transition: 'background-color 0.3s, border-radius 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
  },
}));

const StyledMobileMenu = styled(Paper)({
  backgroundColor: '#023047',
  color: '#fff',
  borderRadius: 0,
});

const StyledLoginSignupButton = styled(Button)(({ theme }) => ({
  color: '#023047',
  backgroundColor: '#ffb703',
  margin: theme.spacing(1),
  transition: 'background-color 0.3s, border-radius 0.3s',
  '&:hover': {
    backgroundColor: '#fb8500',
    borderRadius: '20px',
  },
}));

const centerMenuItems = ['About', 'Features', 'Contact'];

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const mobileMenu = useMemo(() => (
    <Collapse in={menuOpen}>
      <StyledMobileMenu elevation={3}>
        <List component="nav" aria-label="main mailbox folders">
          {[...centerMenuItems, 'Start Saving'].map((item) => (
            <ListItem component="button" key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </StyledMobileMenu>
    </Collapse>
  ), [menuOpen]);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={ExpenserLogo} alt="Expenser Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>
              Expenser
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            {!isMobile && centerMenuItems.map((item) => (
              <StyledButton key={item}>{item}</StyledButton>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile ? (
              <StyledLoginSignupButton variant="contained">
                Start Saving
              </StyledLoginSignupButton>
            ) : (
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

      {isMobile && mobileMenu}
    </Box>
  );
};

export default HomePage;