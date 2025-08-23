import { Card, CardContent, Container, Grid, Typography, Box, Avatar } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllBatches } from '../../redux/batchRelated/batchHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllWardens } from '../../redux/wardenRelated/wardenHandle';

// Icons for a professional look
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// Reusable StatCard Component
const StatCard = ({ icon, title, count }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="subtitle1" color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        <CountUp start={0} end={count || 0} duration={2.5} separator="," />
                    </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    {icon}
                </Avatar>
            </CardContent>
        </Card>
    );
};


const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { batchesList } = useSelector((state) => state.batch);
    const { wardensList } = useSelector((state) => state.warden);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllBatches(adminID, "Batch"));
        dispatch(getAllWardens(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfBatches = batchesList?.length || 0;
    const numberOfWardens = wardensList?.length || 0;
    
    // Dynamic welcome message
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Header */}
                <Grid item xs={12}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                            {getGreeting()}, {currentUser.name}! 👋
                        </Typography>
                        <Typography color="text.secondary">
                            Here's what's happening today.
                        </Typography>
                    </Box>
                </Grid>

                {/* Stat Cards */}
                <Grid item xs={12} md={4}>
                    <StatCard 
                        icon={<PeopleAltIcon sx={{ color: 'white' }} />} 
                        title="Total Students" 
                        count={numberOfStudents} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        icon={<SchoolIcon sx={{ color: 'white' }} />} 
                        title="Total Batches" 
                        count={numberOfBatches} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard 
                        icon={<SupervisorAccountIcon sx={{ color: 'white' }} />} 
                        title="Total Wardens" 
                        count={numberOfWardens} 
                    />
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <StyledPaper>
                        <SeeNotice />
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

// You can still use styled-components for complex custom components
const StyledPaper = styled(Card)`
    padding: 16px;
`;

export default AdminHomePage;