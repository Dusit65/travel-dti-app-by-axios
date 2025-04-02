import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  TextField,
  styled,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Travel from "./../assets/travel.png"; //Logo image
import Profile from "../assets/profile.png";
import axios from "axios";

function AddMyTravel() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");

  const [travelImage, setTravelImage] = useState("");
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const navigator = useNavigate();
//===========================End of Import======================================

//Use Effect ========================================================
  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory

    const traveller = JSON.parse(localStorage.getItem("traveller"));
    //take data from variable and use with state

    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerId(traveller.travellerId);

    setTravelImage(traveller.travelImage);
  }, []);

  //select file func +++++++++++++++++++++++++++
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
    }
  };

  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  //+++++++++++++++++++++++++++++++++++++++++++
  const handleSaveTravelClick = async (e) => {
    
    //Validate Register Button
    e.preventDefault();
    if (travelPlace.trim().length == 0) {
      alert("ป้อนสถานที่ด้วย");
    } else if (travelStartDate.trim().length == 0) {
      alert("ป้อนวันที่ไปด้วย");
    } else if (travelEndDate.trim().length == 0) {
      alert("ป้อนวันที่กลับด้วย");
    } else if (travelCostTotal.trim().length == 0) {
      alert("ป้อนค่าใช้จ่ายในการเดินทางด้วย");
    } else {
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      //Packing data
      const formData = new FormData();

      formData.append("travelPlace", travelPlace);
      formData.append("travelStartDate", travelStartDate);
      formData.append("travelEndDate", travelEndDate);
      formData.append("travelCostTotal", travelCostTotal);
      formData.append("travellerId", travellerId);

      if (travellerImage) {
        formData.append("travelImage", travelImage);
      }

      //send data from formData to API (http://localhost:4000/travel) POST
      try {
        //Use Fetch===========================
        // const response = await fetch("http://localhost:4000/travel/", {
        //   method: "POST",
        //   body: formData,
        // });

        //Use Axios===========================
        const response = await axios.post("https://travel-service-server-by-prisma-tqp8.vercel.app/travel/",
          formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        if (response.status == 201) {
          alert("เพิ่มบันทึกการเดินทางสําเร็จOwO");
          navigator("/mytravel");
          // window.location.href("/")
        } else {
          alert("เพิ่มบันทึกการเดินทางไม่สำเร็จโปรดลองใหม่อีกครั้งTwT");
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในเพิ่มบันทึกการเดินทาง+_+", error);
      }
    }
  };
//=========================== UI Component ======================================
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Link to="/mytravel">
                  <FlightTakeoffIcon sx={{ color: "yellow" }} />
                </Link>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                เพิ่มบันทึกการเดินทาง
              </Typography>
              {/* Go to editprofile */}
              <Link to="/editprofile">
                <Button color="inherit">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travelImage == ""
                    ? Travel
                    : `${travelImage}`
                }
              />
              {/* logout */}
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
        </Box>
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Travel DTI
          </Typography>
          {/* Logo image =====================================*/}
          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            เพิ่มการเดินทาง
          </Typography>

          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            สถานที่ที่เดินทางไป
          </Typography>
          {/* TextField  Place =====================================*/}
          <TextField
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            วันที่เดินทางไป
          </Typography>
          {/* TextField StartDate  =====================================*/}
          <TextField
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            วันที่เดินทางกลับ
          </Typography>
          {/* TextField EndDate  =====================================*/}
          <TextField
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            ค่าใช้จ่ายในการเดินทาง
          </Typography>
          {/* TextField costTravel  =====================================*/}
          <TextField
            fullWidth
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
          />

          <Avatar
            src={
              travelImage && travelImage instanceof Blob
                ? URL.createObjectURL(travelImage)
                : Travel
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>

          {/* btSelectFile   =====================================*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mx: "auto" }}
              component="label"
            >
              อัปโหลดรูปภาพโปรไฟล์
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>

          {/* btAddMyTravel   =====================================*/}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
            onClick={handleSaveTravelClick}
          >
            บันทึการเดินทาง
          </Button>

          <Link
            to="/mytravel"
            style={{ textDecoration: "none", color: "#259e69" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้าการเดินทางของฉัน
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AddMyTravel;
