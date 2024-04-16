import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function AdminDashboard() {
    const isLoggedIn = localStorage.getItem('login') === 'true';
    const [openDrawer, setOpenDrawer] = useState(false);
    const [users, setUsers] = useState([]);
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        phone: '',
        age: ''
    });
    const navigate = useNavigate();


    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleUserListClick = () => {
        navigate('/45a5ds4fsdd5sdf545sd/users');
    };

    const handleLogout = () => {
        localStorage.removeItem('login');
        navigate('/');
    };

    const handleCreateUserClick = () => {
        setOpenCreateUserModal(true);
    };

    const handleCloseCreateUserModal = () => {
        setOpenCreateUserModal(false);
        setNewUserData({
            name: '',
            email: '',
            phone: '',
            age: ''
        });
    };

    const handleCreateUser = () => {

        if (!newUserData.name || !newUserData.email || !newUserData.phone || !newUserData.age) {
            alert('All fields are required');
            return;
        }
        const user = { ...newUserData, id: Date.now() };

        setUsers([...users, user]);
        localStorage.setItem('user', JSON.stringify(user));

        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        setSnackbarMessage('User created successfully!');
        setTimeout(() => {
            handleCloseCreateUserModal();
            setOpenDrawer(!openDrawer);
        }, 3000)

        setNewUserData({
            name: '',
            email: '',
            phone: '',
            age: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({
            ...newUserData,
            [name]: value
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        isLoggedIn ?
            <Box style={{ flexGrow: 1 }}>

                <AppBar position="fixed" style={{ background: '#1976d2' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            style={{ marginRight: '16px' }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Admin Dashboard
                        </Typography>
                        <Button color="inherit" onClick={handleLogout} style={{ color: '#fff' }}> <LogoutIcon style={{ marginRight: '5px' }} />  Logout</Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    open={openDrawer}
                    onClose={toggleDrawer}
                    style={{ width: 300 }}
                >
                    <List style={{ width: 300, marginLeft: 16, marginRight: 16, marginTop: 3 }}>
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={toggleDrawer}
                            sx={{ position: 'absolute', top: 15, right: 10, zIndex: 1 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <ListItem>
                            <Typography variant="h6" align="center" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2', marginBottom: '10px' }}>
                                Admin
                            </Typography>
                        </ListItem>
                        <ListItem onClick={handleUserListClick} className="listItemHover">
                            <ListItemText primary="Users List" />
                        </ListItem>
                        <ListItem onClick={handleCreateUserClick} className="listItemHover">
                            <ListItemText primary="Create User" />
                        </ListItem>
                        <Divider style={{ background: '#1976d2', width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '5px', marginBottom: '5px' }} />
                        <ListItem className="listItemHover">
                            <LogoutIcon style={{ color: '#1976d2', marginRight: '5px' }} />
                            <ListItemText primary="Logout" onClick={handleLogout} />
                        </ListItem>
                    </List>
                </Drawer>

                <Modal open={openCreateUserModal} onClose={handleCloseCreateUserModal}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={handleCloseCreateUserModal}
                            sx={{ position: 'absolute', top: 5, right: 15, zIndex: 1 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">Create User</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={newUserData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newUserData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            value={newUserData.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="age"
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            value={newUserData.age}
                            onChange={handleInputChange}
                        />
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '5px' }}>
                            <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={handleCloseCreateUserModal}>Cancel</Button>
                            <Button variant="contained" color="primary" onClick={handleCreateUser}>Save</Button>
                        </div>
                    </div>
                </Modal>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleCloseSnackbar}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>

                <h1 style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)', color: '#1976d2' }}>Welcome! Explore the results by selecting actions from the menu!</h1>
            </Box>
            :
            <div style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)', }}>
                <h1 style={{ color: '#1976d2' }}>Please Login!</h1>
                <Button color="inherit" onClick={() => { navigate('/') }} style={{ background: '#1976d2', color: 'white', height: '45px' }}>Login Page</Button>
            </div>
    );
}
