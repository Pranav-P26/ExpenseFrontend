import React, { useState, useMemo, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExpenserLogo from "../../assets/ExpenserLogo.png";

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#023047",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1100,
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  margin: theme.spacing(1),
  transition: "background-color 0.3s, border-radius 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
  },
}));

const StyledMobileMenu = styled(Paper)({
  backgroundColor: "#023047",
  color: "#fff",
  borderRadius: 0,
});

const StyledLoginSignupButton = styled(Button)(({ theme }) => ({
  color: "#023047",
  backgroundColor: "#ffb703",
  margin: theme.spacing(1),
  transition: "background-color 0.3s, border-radius 0.3s",
  "&:hover": {
    backgroundColor: "#fb8500",
    borderRadius: "20px",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(4),
  color: "#023047",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ContactForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(to top, #023047 0%, #034160 100%)",
  color: "white",
}));

const HeroContent = styled(Box)({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  maxWidth: "800px",
  padding: "0 20px",
});

const HeroTitle = styled(motion.h1)({
  fontSize: "3.5rem",
  marginBottom: "20px",
});

const HeroSubtitle = styled(motion.p)({
  fontSize: "1.2rem",
  marginBottom: "30px",
});

const HeroButton = styled(motion.button)(({ theme }) => ({
  backgroundColor: "#ffb703",
  color: "#023047",
  border: "none",
  padding: "12px 24px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s, border-radius 0.3s, transform 0.3s",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#fb8500",
    borderRadius: "20px",
    transform: "translateY(-2px)",
  },
}));

const GraphAnimation = styled(motion.div)({
  position: "absolute",
  right: "5%",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40%",
  height: "300px",
  background: 'url("/path-to-your-graph-svg.svg") no-repeat center center',
  backgroundSize: "contain",
});

const FloatingElement = styled(motion.div)({
  position: "absolute",
  color: "white",
  textShadow: "0 0 5px rgba(255, 255, 255, 0.5)", // Optional: adds a subtle glow
});

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

// Function to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({ top: 0 });
};

const centerMenuItems = ["About", "Features", "Contact"];

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -64; // Adjust this value based on your navbar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const mobileMenu = useMemo(
    () => (
      <Collapse in={menuOpen}>
        <StyledMobileMenu elevation={3}>
          <List component="nav" aria-label="main mailbox folders">
            {[...centerMenuItems, "Start Saving"].map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </StyledMobileMenu>
      </Collapse>
    ),
    [menuOpen]
  );

  const features = [
    {
      title: "Expense Tracking",
      description: "Easily log and categorize your expenses",
    },
    {
      title: "Budget Planning",
      description: "Set budgets and get alerts when you're close to limits",
    },
    {
      title: "Reports & Analytics",
      description: "Visualize your spending patterns with charts and graphs",
    },
    {
      title: "Multi-currency Support",
      description: "Track expenses in different currencies",
    },
    {
      title: "Get Assistance",
      description: "Get AI assistance to help manage your spending",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <StyledAppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={ExpenserLogo}
              alt="Expenser Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              component="div"
              onClick={scrollToTop}
              sx={{
                fontWeight: "bold",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
            >
              Expenser
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            {!isMobile &&
              centerMenuItems.map((item) => (
                <StyledButton
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </StyledButton>
              ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
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

      {/* New Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empower Your Financial Future
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover smart strategies for wealth growth and management
          </HeroSubtitle>
          <HeroButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Saving
          </HeroButton>
        </HeroContent>
        <GraphAnimation
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        {[...Array(30)].map((_, index) => (
          <FloatingElement
            key={index}
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 * index }}
          >
            {["$", "%", "£", "€", "¥"][Math.floor(Math.random() * 5)]}
          </FloatingElement>
        ))}
      </HeroSection>

      <Box>
        {/* About Section */}
        <AnimatedSection>
          <Container maxWidth="lg" sx={{ py: 8 }} id="about">
            <SectionTitle variant="h2" align="center">
              About Expenser
            </SectionTitle>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  Expenser is your go-to solution for effortless expense
                  tracking and budget management. We understand the challenges
                  of keeping finances in check, which is why we've created an
                  intuitive and powerful tool to help you take control of your
                  spending.
                </Typography>
                <Typography variant="body1" paragraph>
                  With Expenser, you can easily log expenses, set budgets, and
                  gain valuable insights into your financial habits. Our goal is
                  to empower you to make informed decisions about your money and
                  achieve your financial goals.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={ExpenserLogo}
                  alt="Expenser Logo"
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection>
          <Box
            sx={{ backgroundColor: "#023047", color: "white", py: 8 }}
            id="features"
          >
            <Container maxWidth="lg">
              <SectionTitle variant="h2" align="center" sx={{ color: "white" }}>
                Features
              </SectionTitle>
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={index}>
                    <FeatureCard>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 48, color: "#ffb703" }}
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          component="div"
                          align="center"
                          gutterBottom
                        >
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" align="center">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection>
          <Container maxWidth="md" sx={{ py: 8 }} id="contact">
            <SectionTitle variant="h2" align="center">
              Contact Us
            </SectionTitle>
            <ContactForm>
              <TextField label="Name" variant="outlined" fullWidth required />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Send Message
              </Button>
            </ContactForm>
          </Container>
        </AnimatedSection>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ backgroundColor: "#023047", color: "white", py: 3, mt: "auto" }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Expenser. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
