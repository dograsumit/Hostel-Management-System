import { useState, useMemo } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Switch,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Container,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

// Component Imports 
import Logout from "../Logout";
import SideBar from "./SideBar";
import AdminProfile from "./AdminProfile";
import AdminHomePage from "./AdminHomePage";
import AddStudent from "./studentRelated/AddStudent";
import SeeComplains from "./studentRelated/SeeComplains";
import ShowStudents from "./studentRelated/ShowStudents";
import StudentAttendance from "./studentRelated/StudentAttendance";
import StudentExamMarks from "./studentRelated/StudentExamMarks";
import ViewStudent from "./studentRelated/ViewStudent";
import AddNotice from "./noticeRelated/AddNotice";
import ShowNotices from "./noticeRelated/ShowNotices";
import ShowHostels from "./hostelRelated/ShowHostels";
import HostelForm from "./hostelRelated/HostelForm";
import ViewHostel from "./hostelRelated/ViewHostel";
import AddWarden from "./wardenRelated/AddWarden";
import ChooseBatch from "./wardenRelated/ChooseBatch";
import ChooseHostel from "./wardenRelated/ChooseHostel";
import ShowWardens from "./wardenRelated/ShowWardens";
import WardenDetails from "./wardenRelated/WardenDetails";
import AddBatch from "./batchRelated/AddBatch";
import BatchDetails from "./batchRelated/BatchDetails";
import ShowBatches from "./batchRelated/ShowBatches";
import AccountMenu from "../../components/AccountMenu";

const drawerWidth = 240;

// Styled components for a modern look
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // Modern glassy effect
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(18, 18, 18, 0.7)"
      : "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(18, 18, 18, 0.9)"
        : "rgba(255, 255, 255, 0.9)",
    borderRight: `1px solid ${theme.palette.divider}`,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // A more refined and modern theme
  const modernTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                // Dark mode palette
                primary: { main: "#90caf9" },
                divider: "rgba(255, 255, 255, 0.12)",
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "rgba(255, 255, 255, 0.7)",
                },
              }
            : {
                // Light mode palette
                primary: { main: "#1976d2" },
                divider: "rgba(0, 0, 0, 0.12)",
                background: {
                  default: "#f4f6f8",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#212b36",
                  secondary: "#637381",
                },
              }),
        },
        typography: {
          fontFamily: "'Inter', sans-serif",
          h6: {
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.05)",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={modernTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Top AppBar */}
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" /* keep right padding when drawer closed */ }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            <AccountMenu />
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <SideBar />
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* All your routes will render inside this container */}
            <Routes>
              {/* The routes remain the same */}
              <Route path="/" element={<AdminHomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/Admin/dashboard" element={<AdminHomePage />} />
              <Route path="/Admin/profile" element={<AdminProfile />} />
              <Route path="/Admin/complains" element={<SeeComplains />} />

              {/* Notice */}
              <Route path="/Admin/addnotice" element={<AddNotice />} />
              <Route path="/Admin/notices" element={<ShowNotices />} />

              {/* Hostel */}
              <Route path="/Admin/hostels" element={<ShowHostels />} />
              <Route
                path="/Admin/hostels/hostel/:batchID/:hostelID"
                element={<ViewHostel />}
              />
              <Route
                path="/Admin/hostels/choosebatch"
                element={<ChooseBatch situation="Hostel" />}
              />
              <Route path="/Admin/addhostel/:id" element={<HostelForm />} />
              <Route
                path="/Admin/batch/hostel/:batchID/:hostelID"
                element={<ViewHostel />}
              />
              <Route
                path="/Admin/hostel/student/attendance/:studentID/:hostelID"
                element={<StudentAttendance situation="Hostel" />}
              />
              <Route
                path="/Admin/hostel/student/marks/:studentID/:hostelID"
                element={<StudentExamMarks situation="Hostel" />}
              />

              {/* Batch */}
              <Route path="/Admin/addbatch" element={<AddBatch />} />
              <Route path="/Admin/batches" element={<ShowBatches />} />
              <Route
                path="/Admin/batches/batch/:id"
                element={<BatchDetails />}
              />
              <Route
                path="/Admin/batch/addstudents/:id"
                element={<AddStudent situation="Batch" />}
              />

              {/* Student */}
              <Route
                path="/Admin/addstudents"
                element={<AddStudent situation="Student" />}
              />
              <Route path="/Admin/students" element={<ShowStudents />} />
              <Route
                path="/Admin/students/student/:id"
                element={<ViewStudent />}
              />
              <Route
                path="/Admin/students/student/attendance/:id"
                element={<StudentAttendance situation="Student" />}
              />
              <Route
                path="/Admin/students/student/marks/:id"
                element={<StudentExamMarks situation="Student" />}
              />

              {/* Warden */}
              <Route path="/Admin/wardens" element={<ShowWardens />} />
              <Route
                path="/Admin/wardens/warden/:id"
                element={<WardenDetails />}
              />
              <Route
                path="/Admin/wardens/choosebatch"
                element={<ChooseBatch situation="Warden" />}
              />
              <Route
                path="/Admin/wardens/choosehostel/:id"
                element={<ChooseHostel situation="Norm" />}
              />
              <Route
                path="/Admin/wardens/choosehostel/:batchID/:wardenID"
                element={<ChooseHostel situation="Warden" />}
              />
              <Route
                path="/Admin/wardens/addwarden/:id"
                element={<AddWarden />}
              />

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;