import React, { useState, useEffect } from 'react';
import {
    IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Paper, Container,
    Typography, CircularProgress, Button, SpeedDial, SpeedDialAction, Modal,
    ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import {
    Delete as DeleteIcon,
    PostAdd as PostAddIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
    AddCard as AddCardIcon,
    MoreVert as MoreVertIcon,
    Menu as MenuIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllBatches } from '../../../redux/batchRelated/batchHandle';

// Assuming these are defined elsewhere and imported
// For this example, they are created here for completeness.
const Popup = ({ message, showPopup, setShowPopup }) => {
    if (!showPopup) return null;
    return (
        <Modal open={showPopup} onClose={() => setShowPopup(false)}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', border: 'none', borderRadius: '16px',
                boxShadow: 24, p: 4, textAlign: 'center'
            }}>
                <Typography variant="h6" component="h2" gutterBottom>Notification</Typography>
                <Typography sx={{ mt: 2 }}>{message}</Typography>
                <Button onClick={() => setShowPopup(false)} sx={{ mt: 3 }} variant="contained">Close</Button>
            </Box>
        </Modal>
    );
};

const TableTemplate = ({ columns, rows, buttonHaver: ButtonHaver }) => (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px', boxShadow: 'none' }}>
        <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <Box component="thead">
                    <Box component="tr" sx={{ bgcolor: 'action.hover' }}>
                        {columns.map((column) => (
                            <Box component="th" key={column.id} sx={{ p: 2, textAlign: 'left', fontWeight: 'bold', borderBottom: 1, borderColor: 'divider' }}>
                                {column.label}
                            </Box>
                        ))}
                        <Box component="th" sx={{ p: 2, textAlign: 'right', fontWeight: 'bold', borderBottom: 1, borderColor: 'divider' }}>
                            Actions
                        </Box>
                    </Box>
                </Box>
                <Box component="tbody">
                    {rows.map((row) => (
                        <Box component="tr" key={row.id} sx={{ '&:hover': { bgcolor: 'action.selected' } }}>
                            {columns.map((column) => (
                                <Box component="td" key={column.id} sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                                    {row[column.id]}
                                </Box>
                            ))}
                            <Box component="td" sx={{ p: 2, borderBottom: 1, borderColor: 'divider', textAlign: 'right' }}>
                                <ButtonHaver row={row} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    </Paper>
);

const SpeedDialTemplate = ({ actions }) => (
    <SpeedDial
        ariaLabel="SpeedDial actions"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<MenuIcon />}
    >
        {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
            />
        ))}
    </SpeedDial>
);


// --- Main Component ---

const ShowBatches = () => {
    // A basic theme for consistent styling
    const theme = createTheme({ palette: { mode: 'light' } });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { batchesList, loading, error, getresponse } = useSelector((state) => state.batch);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAllBatches(currentUser._id, "Batch"));
        }
    }, [currentUser?._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllBatches(currentUser._id, "Batch"));
            });
    };

    const batchColumns = [{ id: 'name', label: 'Batch Name' }];

    const batchRows = batchesList && batchesList.length > 0
        ? batchesList.map((batch) => ({
            name: batch.batchName,
            id: batch._id,
        }))
        : [];

    const BatchButtonHaver = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);

        const actions = [
            { icon: <PostAddIcon fontSize="small" />, name: 'Add Hostels', action: () => navigate(`/Admin/addhostel/${row.id}`) },
            { icon: <PersonAddAlt1Icon fontSize="small" />, name: 'Add Student', action: () => navigate(`/Admin/batch/addstudents/${row.id}`) },
        ];

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/Admin/batches/batch/${row.id}`)}
                >
                    View
                </Button>
                <Tooltip title="More Actions">
                    <IconButton onClick={handleClick} size="small">
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 1,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                            mt: 1.5,
                            '&:before': {
                                content: '""', display: 'block', position: 'absolute',
                                top: 0, right: 14, width: 10, height: 10,
                                bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {actions.map((action) => (
                        <MenuItem key={action.name} onClick={() => { action.action(); handleClose(); }}>
                            <ListItemIcon>{action.icon}</ListItemIcon>
                            {action.name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={() => { deleteHandler(row.id, "Batch"); handleClose(); }} sx={{ color: 'error.main' }}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>
        );
    };

    const pageActions = [
        { icon: <AddCardIcon />, name: 'Add New Batch', action: () => navigate("/Admin/addbatch") },
        { icon: <DeleteIcon />, name: 'Delete All Batches', action: () => deleteHandler(currentUser._id, "Batches") },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                background: '#f4f6f8',
                minHeight: '100vh',
                py: 4
            }}>
                <Container maxWidth="lg">
                    <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgb(0 0 0 / 0.05)' }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Manage Batches
                        </Typography>

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            (getresponse || batchRows.length === 0) ? (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="h6" gutterBottom>No batches found.</Typography>
                                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                                        Get started by creating a new batch.
                                    </Typography>
                                    <Button variant="contained" onClick={() => navigate("/Admin/addbatch")}>
                                        Create Batch
                                    </Button>
                                </Box>
                            ) : (
                                <TableTemplate buttonHaver={BatchButtonHaver} columns={batchColumns} rows={batchRows} />
                            )
                        )}
                    </Paper>
                </Container>
                <SpeedDialTemplate actions={pageActions} />
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Box>
        </ThemeProvider>
    );
};

export default ShowBatches;