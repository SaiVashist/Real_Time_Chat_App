import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Link } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', fontFamily: 'Roboto' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 5,
          px: 2,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Welcome to DSVConnect
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Connect, Chat, and Share with your friends and community.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
          <Button
  variant="outlined"
  color="primary"
  onClick={() => navigate('/login')}
>
  Login
</Button>

        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 5,                 //py - for classes that set both *-top and *-bottom
          px: 2,                 //px- for classes that set both *-left and *-right
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Why Choose DSVConnect?
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          <Grid2 xs={12} sm={6} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <ChatIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Real-Time Chat</Typography>
              <Typography variant="body2" color="text.secondary">
                Stay connected with friends instantly.
              </Typography>
            </Box>
          </Grid2>
          {/* xs 12 -> full width for elemet
          sm -> 50% width
          md -> 33% width */}
          <Grid2 xs={12} sm={6} md={4}> 
            <Box
              sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Make Friends</Typography>
              <Typography variant="body2" color="text.secondary">
                Grow your network and meet new people.
              </Typography>
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <LockIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Private & Secure</Typography>
              <Typography variant="body2" color="text.secondary">
                Your data is safe with us.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Footer */}
      {/* xs: 5 (0px and up)
      sm: 10 (600px and up)
      md: 20 (900px and up)
      lg: 30 (1200px and up)
      xl: 37.5 (1536px and up) */}
      <Box
        sx={{
          backgroundColor: '#333',
          color: '#fff',
          py: 3,
          mt: [5, 10, 20, 30, 37.5],
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2024 DSVConnect. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
