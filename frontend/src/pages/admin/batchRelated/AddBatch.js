import React, { useEffect, useState } from "react";
import {
    Box, Button, CircularProgress, Container, Paper, TextField,
    Typography, CssBaseline, ThemeProvider, createTheme
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Classroom from "../../../assets/classroom.png";

// Reusable Popup Component (assuming it exists elsewhere)
const Popup = ({ message, showPopup, setShowPopup }) => {
    if (!showPopup) return null;
    return (
        <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 1000, textAlign: 'center'
        }}>
            <p>{message}</p>
            <Button variant="contained" onClick={() => setShowPopup(false)}>Close</Button>
        </div>
    );
};

const AddBatch = () => {
    const [batchName, setBatchName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, tempDetails } = useSelector(state => state.user);
    const adminID = currentUser._id;

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const theme = createTheme({
        palette: {
            primary: { main: '#1976d2' },
            background: { default: '#f4f6f8' },
        },
        typography: {
            h4: { fontWeight: 700, },
        },
    });

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff({ batchName, adminID }, "Batch"));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate(`/Admin/batches/batch/${tempDetails._id}`);
            dispatch(underControl());
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                py: 4
            }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <img src={Classroom} alt="classroom" style={{ width: '120px', marginBottom: '1rem' }} />
                            <Typography variant="h4" component="h1" gutterBottom>
                                Create a New Batch
                            </Typography>
                        </Box>
                        <form onSubmit={submitHandler}>
                            <TextField
                                fullWidth
                                label="Batch Name"
                                variant="outlined"
                                value={batchName}
                                onChange={(event) => setBatchName(event.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                disabled={loader}
                                sx={{ py: 1.5, borderRadius: '8px', textTransform: 'none', fontSize: '1rem' }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Batch"}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ mt: 2, borderRadius: '8px', textTransform: 'none' }}
                            >
                                Go Back
                            </Button>
                        </form>
                    </Paper>
                </Container>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Box>
        </ThemeProvider>
    );
}

export default AddBatch;