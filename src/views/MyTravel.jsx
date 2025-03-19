import axios from "axios"; //Use Axios
import { React, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
//Table Material
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Profile from "./../assets/profile.png";
import Place from "./../assets/travel.png";
import { Link, useNavigate } from "react-router-dom";

//===========================End of Import======================================

function MyTravel() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travel, setTravel] = useState([]);

  const navigator = useNavigate();

  //Use Effect ========================================================
  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory
    const traveller = JSON.parse(localStorage.getItem("traveller"));

    //take data from variable and use with state
    setTravellerFullname(traveller.travellerFullname);

    // setTravellerEmail(traveller.travellerEmail);
    setTravellerImage(traveller.travellerImage);

    //Get data From DB of traveller that login and show in table
    const getAllTravel = async () => {
      const resData = await axios.get(
        `http://localhost:4000/travel/${traveller.travellerId}`
      );
      //Have a data
      if (resData.status == 200) {
        //Use Fetch===========================
        // const data = await resData.json();
        // setTravel(data["data"]);
        
        //Use Axios===========================
        setTravel(resData.data["data"]);
      }
    };
    getAllTravel();
  }, []);

  //Delete Click Func================================
  const handleDeleteTravelClick = async (travelId) => {
    try {
      //Use Fetch===========================
      // const response = await fetch(`http://localhost:4000/travel/${travelId}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      
      //Use Axios===========================
      const response = await axios.delete(`http://localhost:4000/travel/${travelId}`); 
        
      if (response.status == 200) {
        alert("ลบข้อมูลเรียบร้อยOwO");
        // navigator("/mytravel");
        window.location.reload();
      }
    } catch (error) {
      alert("ข้อผิดพลาดในการลบข้อมูล");
    }
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* AppBar====================================== */}
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FlightTakeoffIcon sx={{ color: "yellow" }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                บันทึกการเดินทาง
              </Typography>

              {/* Go to editprofile*/}
              <Link to="/editprofile">
                <Button color="warning">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travellerImage
                    ? `http://localhost:4000/images/traveller/${travellerImage}`
                    : Profile
                }
              />
              {/* Link Logout*/}
              <Link
                to="/"
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
          {/* End of AppBar======================================*/}
        </Box>
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          {/* Travel Head Text */}
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", mb: 2 }}
          >
            การเดินทางของฉัน
          </Typography>

          {/* Display travel_tb=============================== */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              {/* Table Head */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#aaaaaa" }}>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">สถานที่ไป</TableCell>
                  <TableCell align="center">รูป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {travel.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 0 ? "ffffff" : "#ffc0cb",
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.travelPlace}</TableCell>
                    <TableCell align="center">
                      {/* TravelImage */}
                      <Avatar
                        src={
                          row.travelImage
                            ? `http://localhost:4000/images/travel/${row.travelImage}`
                            : Place
                        }
                        sx={{ width: 60, height: 60, boxShadow: 4 }}
                        variant="rounded"
                      />
                    </TableCell>
                    <TableCell align="center">{row.travelStartDate}</TableCell>
                    <TableCell align="center">{row.travelEndDate}</TableCell>
                    <TableCell align="center">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        to={`/editmytravel/${row.travelId}`}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        onClick={() => handleDeleteTravelClick(row.travelId)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Go to AddMyTravel============================================*/}
          <Link
            to="/addmytravel"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ py: 2, my: 2, mx: "auto" }}
            >
              เพิ่มการเดินทาง
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default MyTravel;
