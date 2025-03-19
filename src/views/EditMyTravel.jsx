import { React, useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Travel from "./../assets/travel.png"; //Logo image
import Profile from "../assets/profile.png";
import axios from "axios";//
import { Edit } from "@mui/icons-material";
//===========================End of Import======================================
function EditMyTravel() {
  //เอาข้อมูลใน memory มาแสดงที่ AppBar
  //อ่านข้อมูลจาก memory เก็บในตัวแปร
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");

  const traveller = JSON.parse(localStorage.getItem("traveller"));
  //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
  const [travelImage, setTravelImage] = useState("");
  const [travelNewImage, setTravelNewImage] = useState(null);

  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const { travelId } = useParams();

  const navigator = useNavigate();
  //===========================Use Effect======================================
  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory
    const traveller = JSON.parse(localStorage.getItem("traveller"));

    //take data from variable and use with state
    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerId(traveller.travellerId);

    //GetSelectedTravel Func
    const getThisTravel = async () => {
      //Use Fetch===========================
      // const resData = await fetch(
      //   `http://localhost:4000/travel/one/${travelId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const data = await resData.json();
      // setTravelPlace(data["data"].travelPlace);
      // setTravelStartDate(data["data"].travelStartDate);
      // setTravelEndDate(data["data"].travelEndDate);
      // setTravelCostTotal(data["data"].travelCostTotal);
      // setTravelImage(data["data"].travelImage);

      //Use Axios===========================
      const resData = await axios.get(
        `http://localhost:4000/travel/one/${travelId}`
      );

      setTravelPlace(resData.data["data"].travelPlace);
      setTravelStartDate(resData.data["data"].travelStartDate);
      setTravelEndDate(resData.data["data"].travelEndDate);
      setTravelCostTotal(resData.data["data"].travelCostTotal);
      setTravelImage(resData.data["data"].travelImage);
    };
    //Call Func
    getThisTravel();
  }, []);

  //select file func =================================
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelNewImage(file);
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
  //===================================================
  const handleUpdateTravelClick = async (e) => {
    //Validate Register Button
    e.preventDefault();
    if (travelPlace.trim().length == 0) {
      alert("ป้อนสถานที่ด้วย");
    } else if (travelStartDate.trim().length == 0) {
      alert("ป้อนวันที่ไปด้วย");
    } else if (travelEndDate.trim().length == 0) {
      alert("ป้อนวันที่กลับด้วย");
    } else if (travelCostTotal.length == 0) {
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

      if (travelNewImage) {
        formData.append("travelImage", travelNewImage);
      }

      //send data from formData to API (http://localhost:4000/travel) PUT
      try {
        const response = await axios.put(
          `http://localhost:4000/travel/${travelId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          alert("แก้ไขการเดินทางสําเร็จ OwO");
          navigator("/mytravel");
          // window.location.href("/")
          console.log(
            travelPlace,
            travelStartDate,
            travelEndDate,
            travelCostTotal
          );
        } else {
          alert("แก้ไขการเดินทางไม่สำเร็จโปรดลองใหม่อีกครั้ง TwT");
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในเแก้ไขการเดินทาง +_+", error);
      }
    }
  };
  //Edit Travel Func====================================

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* ====================AppBar========================= */}
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
                  travellerImage == ""
                    ? Profile
                    : `http://localhost:4000/images/traveller/${travellerImage}`
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
        {/* ====================AppBar========================= */}
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
            แก้ไขการเดินทาง
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

          {/* Travel Image=========================================== */}
          <Avatar
            src={
              travelNewImage == null
                ? travelImage == ""
                  ? Travel
                  : `http://localhost:4000/images/travel/${travelImage}`
                : URL.createObjectURL(travelNewImage)
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />

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
            onClick={handleUpdateTravelClick}
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

export default EditMyTravel;
