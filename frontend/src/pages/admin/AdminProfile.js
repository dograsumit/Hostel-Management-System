import React, { useState } from 'react';
import {
    Button,
    Collapse,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
    Box,
    Avatar,
    Grid,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, response, error } = useSelector((state) => state.user);

    // Initialize state with currentUser values
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [collegeName, setCollegeName] = useState(currentUser.collegeName);

    const address = "Admin";

    // This useEffect can be used to show snackbar notifications on success/error
    // useEffect(() => {
    //     if (response) { /* show success message */ }
    //     else if (error) { /* show error message */ }
    // }, [response, error]);

    const submitHandler = (event) => {
        event.preventDefault();
        const fields = password === ""
            ? { name, email, collegeName }
            : { name, email, password, collegeName };
        dispatch(updateUser(fields, currentUser._id, address));
    };

    const deleteHandler = () => {
        try {
            // Only dispatch the action to delete the admin user
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Profile
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                            {String(currentUser.name).charAt(0).toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" component="h2">{currentUser.name}</Typography>
                        <Typography color="text.secondary">{currentUser.email}</Typography>
                        <Typography color="text.secondary">{currentUser.collegeName}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => setShowTab(!showTab)}
                    startIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                >
                    {showTab ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button variant="contained" color="error" onClick={handleOpenDialog}>
                    Delete Account
                </Button>
            </CardActions>
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Edit Your Details</Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="collegeName"
                            label="College Name"
                            name="collegeName"
                            autoComplete="off"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            placeholder="Fill only to change password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </CardContent>
            </Collapse>

            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account? This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteHandler} color="error" autoFocus>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default AdminProfile;