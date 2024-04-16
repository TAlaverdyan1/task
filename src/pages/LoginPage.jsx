import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setError('');
      localStorage.setItem('login', true);
      navigate('/45a5ds4fsdd5sdf545sd/admin');
    } else {
      setError('Invalid username or password');
      alert('Invalid username or password! Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={isInitialLoad ? -100 : 15}
        sx={{
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          transition: 'margin-top 0.9s ease',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2, height: '56px' }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2, height: '56px' }}
        />
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2, height: '56px' }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
