import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Users = () => {
    const isLoggedIn = localStorage.getItem('login') === 'true';
    const postedUser = JSON.parse(localStorage.getItem('user'));
    const [users, setUsers] = useState(postedUser ? [{
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        age: 23
    },
    {
        id: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        age: 53
    }, postedUser
    ] : [
        {
            id: 1,
            name: 'Leanne Graham',
            email: 'Sincere@april.biz',
            phone: '1-770-736-8031 x56442',
            age: 23
        },
        {
            id: 2,
            name: 'Ervin Howell',
            email: 'Shanna@melissa.tv',
            phone: '010-692-6593 x09125',
            age: 53
        }
    ]);

    const [editingUser, setEditingUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate('/45a5ds4fsdd5sdf545sd/admin');
    };

    const handleEdit = (userId) => {
        let user = users.find(user => user.id === userId);
        if (user) {
            setEditingUser(user);
            setModalOpen(true);
        }
    };

    const handleDelete = (userId) => {
        setDeleteUserId(userId);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteUserId) {
            const updatedUsers = users.filter((u) => u.id !== deleteUserId);
            setUsers(updatedUsers);
            setSnackbarOpen(true);
            setSnackbarSeverity('success');
            setSnackbarMessage('User deleted successfully!');
            setDeleteUserId(null);
        } else {
            setSnackbarOpen(true);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to delete user');
        }
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
        setDeleteUserId(null);
        setModalOpen(false);
    };

    const handleSaveEdit = () => {
        if (editingUser) {
            const userId = editingUser.id;
            const updatedUserData = {
                ...editingUser
            };

            const userIndex = users.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                users[userIndex] = updatedUserData;

                setSnackbarSeverity('success');
                setSnackbarMessage('User edited successfully!');
                setSnackbarOpen(true);
                setEditingUser(null);
                setModalOpen(false);
            } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to edit user');
            }
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        isLoggedIn ?
            <>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={handleNavigate}>Go Back to Dashboard</Button>
                </div>
                <TableContainer component={Paper} style={{ maxWidth: '960px', margin: 'auto' }}>
                    <Table aria-label="simple table">
                        <TableHead style={{ backgroundColor: '#1976d2' }}>
                            <TableRow>
                                <TableCell style={{ color: '#fff', fontSize: '1.1rem' }}>Name</TableCell>
                                <TableCell style={{ color: '#fff', fontSize: '1.1rem' }}>Email</TableCell>
                                <TableCell style={{ color: '#fff', fontSize: '1.1rem' }}>Phone Number</TableCell>
                                <TableCell style={{ color: '#fff', fontSize: '1.1rem' }}>Age</TableCell>
                                <TableCell style={{ color: '#fff', fontSize: '1.1rem' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow key={user?.id || index} style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : 'inherit' }}>
                                        <TableCell>{user?.name}</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                        <TableCell>{user?.phone}</TableCell>
                                        <TableCell>{user?.age}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(user.id)}>Edit</Button>
                                            <Button variant="contained" color="error" size="small" onClick={() => handleDelete(user.id)} style={{ marginLeft: '8px' }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Loading...</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
                        <IconButton
                            edge="end"
                            aria-label="close"
                            onClick={handleCloseModal}
                            sx={{ position: 'absolute', top: 5, right: 15, zIndex: 1 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ marginBottom: '8px' }}>{editingUser ? 'Edit User' : 'Delete User'}</Typography>
                        {editingUser && (
                            <>
                                <TextField label="Name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} fullWidth style={{ marginBottom: '20px' }} />
                                <TextField label="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} fullWidth style={{ marginBottom: '20px' }} />
                                <TextField label="Phone Number" value={editingUser.phone} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} fullWidth style={{ marginBottom: '20px' }} />
                                <TextField label="Age" value={editingUser.age} onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })} fullWidth style={{ marginBottom: '20px' }} />
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
                                    <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={handleCloseModal}>Cancel</Button>
                                    <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                                </div>
                            </>
                        )}
                        {!editingUser && (
                            <>
                                <Typography variant="body1" style={{ marginBottom: '20px' }}>Are you sure you want to delete this user?</Typography>
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
                                    <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={handleCloseModal}>Cancel</Button>
                                    <Button variant="contained" color="error" onClick={confirmDelete}>Delete</Button>
                                </div>
                            </>
                        )}
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
            </>
            :
            <div style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)', }}>
                <h1 style={{ color: '#1976d2' }}>Please Login!</h1>
                <Button color="inherit" onClick={() => { navigate('/') }} style={{ background: '#1976d2', color: 'white', height: '45px' }}>Login Page</Button>
            </div>
    );
};

export default Users;
