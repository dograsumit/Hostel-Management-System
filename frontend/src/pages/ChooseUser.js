// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Grid,
//   Paper,
//   Box,
//   Container,
//   CircularProgress,
//   Backdrop,
// } from '@mui/material';
// import { AccountCircle, School, Group } from '@mui/icons-material';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/userRelated/userHandle';
// import Popup from '../components/Popup';

// const ChooseUser = ({ visitor }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const password = "zxc"

//   const { status, currentUser, currentRole } = useSelector(state => state.user);;

//   const [loader, setLoader] = useState(false)
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   const navigateHandler = (user) => {
//     if (user === "Admin") {
//       if (visitor === "guest") {
//         const email = "yogendra@12"
//         const fields = { email, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Adminlogin');
//       }
//     }

//     else if (user === "Student") {
//       if (visitor === "guest") {
//         const rollNum = "1"
//         const studentName = "Dipesh Awasthi"
//         const fields = { rollNum, studentName, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Studentlogin');
//       }
//     }

//     else if (user === "Warden") {
//       if (visitor === "guest") {
//         const email = "tony@12"
//         const fields = { email, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Wardenlogin');
//       }
//     }
//   }

//   useEffect(() => {
//     if (status === 'success' || currentUser !== null) {
//       if (currentRole === 'Admin') {
//         navigate('/Admin/dashboard');
//       }
//       else if (currentRole === 'Student') {
//         navigate('/Student/dashboard');
//       } else if (currentRole === 'Warden') {
//         navigate('/Warden/dashboard');
//       }
//     }
//     else if (status === 'error') {
//       setLoader(false)
//       setMessage("Network Error")
//       setShowPopup(true)
//     }
//   }, [status, currentRole, navigate, currentUser]);

//   return (
//     <StyledContainer>
//       <Container>
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12} sm={6} md={4}>
//             <div onClick={() => navigateHandler("Admin")}>
//               <StyledPaper elevation={3}>
//                 <Box mb={2}>
//                   <AccountCircle fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Admin
//                 </StyledTypography>
//                 Login as an administrator to access the dashboard to manage app data.
//               </StyledPaper>
//             </div>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <StyledPaper elevation={3}>
//               <div onClick={() => navigateHandler("Student")}>
//                 <Box mb={2}>
//                   <School fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Student
//                 </StyledTypography>
//                 Login as a student to explore course materials and assignments.
//               </div>
//             </StyledPaper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <StyledPaper elevation={3}>
//               <div onClick={() => navigateHandler("Warden")}>
//                 <Box mb={2}>
//                   <Group fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Warden
//                 </StyledTypography>
//                 Login as a teacher to create courses, assignments, and track student progress.
//               </div>
//             </StyledPaper>
//           </Grid>
//         </Grid>
//       </Container>
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loader}
//       >
//         <CircularProgress color="inherit" />
//         Please Wait
//       </Backdrop>
//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };

// export default ChooseUser;

// const StyledContainer = styled.div`
//   background: linear-gradient(to bottom, #411d70, #19118b);
//   height: 120vh;
//   display: flex;
//   justify-content: center;
//   padding: 2rem;
// `;

// const StyledPaper = styled(Paper)`
//   padding: 20px;
//   text-align: center;
//   background-color: #1f1f38;
//   color:rgba(255, 255, 255, 0.6);
//   cursor:pointer;

//   &:hover {
//     background-color: #2c2c6c;
//     color:white;
//   }
// `;

// const StyledTypography = styled.h2`
//   margin-bottom: 10px;
// `;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { motion } from 'framer-motion';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Warden") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Wardenlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Warden') {
        navigate('/Warden/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Overlay />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {[
              { role: "Admin", icon: <AccountCircle fontSize="large" />, desc: "Access the administrator dashboard to manage hostel data." },
              { role: "Student", icon: <School fontSize="large" />, desc: "Login as a student to view assignments, attendance, and records." },
              { role: "Warden", icon: <Group fontSize="large" />, desc: "Login as a warden to manage students and hostel facilities." }
            ].map(({ role, icon, desc }) => (
              <Grid item xs={12} sm={6} md={4} key={role}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <StyledPaper elevation={6} onClick={() => navigateHandler(role)}>
                    <IconWrapper>{icon}</IconWrapper>
                    <StyledTypography>{role}</StyledTypography>
                    <p>{desc}</p>
                  </StyledPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// ---------- Styles ----------
const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f9f9ff 0%, #e8e8ff 100%);
  overflow: hidden;
`;

// Decorative abstract circles
const Overlay = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #550080 0%, transparent 70%);
  opacity: 0.15;
  border-radius: 50%;

  &::after {
    content: "";
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #2575fc 0%, transparent 70%);
    opacity: 0.15;
    border-radius: 50%;
  }
`;


const StyledPaper = styled(Paper)`
  padding: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  color: #333;
  cursor: pointer;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #550080;
    color: #fff;
  }

  p {
    font-size: 0.9rem;
    margin-top: 10px;
    color: inherit;
  }
`;

const IconWrapper = styled.div`
  background: #ececff;
  border-radius: 50%;
  padding: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 2rem;
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  font-weight: 600;
`;
