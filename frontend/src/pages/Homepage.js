import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <Background>
            <StyledContainer maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    
                    {/* Left Side - Text */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Title>
                                Welcome to <Highlight>Hostel Management</Highlight> System
                            </Title>
                            <Subtitle>
                                Manage hostels, track attendance, monitor students and faculty —
                                all in one simple platform designed to make your life easier.
                            </Subtitle>

                            <ButtonsWrapper>
                                <StyledLink to="/choose">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <LightPurpleButton variant="contained" size="large">
                                            Get Started
                                        </LightPurpleButton>
                                    </motion.div>
                                </StyledLink>

                                <StyledText>
                                    Don’t have an account?{" "}
                                    <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </ButtonsWrapper>
                        </motion.div>
                    </Grid>

                    {/* Right Side - Illustration */}
                    <Grid item xs={12} md={6}>
                        <motion.img
                            src={Students}
                            alt="students"
                            style={{ width: '100%' }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </Grid>
                </Grid>
            </StyledContainer>
        </Background>
    );
};

export default Homepage;

// ---------- Styles ----------
const Background = styled.div`
  position: relative;
  min-height: 100vh;
  background: #ffffff;   /* clean white background */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;
  color: #333;
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #222;
`;

const Highlight = styled.span`
  color: #550080;   /* your theme color */
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #555;
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const StyledText = styled.p`
  font-size: 1rem;
  margin-top: 10px;
  color: #666;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
