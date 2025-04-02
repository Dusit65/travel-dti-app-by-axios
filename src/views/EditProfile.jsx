import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Profile from "./../assets/profile.png";
import Travel from "./../assets/travel.png";
import axios from "axios"; //Use Axios
//===========================End of Import======================================

function EditProfile() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const [travellerNewImage, setTravellerNewImage] = useState(null); //*****/
  const [travellerNewFullname, setTravellerNewFullname] = useState(""); //*****/

  const navigator = useNavigate();

  //UseEffect ========================================
  useEffect(() => {
    //เอาข้อมูลใน memory มาแสดงที่ AppBar
    //อ่านข้อมูลจาก memory เก็บในตัวแปร

    const traveller = JSON.parse(localStorage.getItem("traveller")) || {};

    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerEmail(traveller.travellerEmail);
    setTravellerPassword(traveller.travellerPassword);
    setTravellerId(traveller.travellerId);
    setTravellerNewFullname(traveller.travellerFullname);
  }, []);
  //Select file func +++++++++++++++++++++++++++
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];

    if (file) {
      setTravellerNewImage(file);
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

  //EditClick func +++++++++++++++++++++++++++
  const handleEditProfileClick = async (e) => {
    //Validate Register Button
    e.preventDefault();
    if (travellerNewFullname.trim().length == 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
    } else if (travellerEmail.trim().length == 0) {
      alert("ป้อนชื่อผู้ใช้ด้วย(Email)");
    } else if (travellerPassword.trim().length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
    } else {
      //Send data to API, save to DB and redirect to Login page.
      //Packing data
      const formData = new FormData();

      formData.append("travellerFullname", travellerNewFullname);
      formData.append("travellerEmail", travellerEmail);
      formData.append("travellerPassword", travellerPassword);
      formData.append("travellerId", travellerId);

      if (travellerNewImage) {
        formData.append("travellerImage", travellerNewImage);
      }

      //Send data to API
      try {
        // const response = await fetch(
        //   `http://localhost:4000/traveller/${travellerId}`,
        //   {
        //     method: "PUT",
        //     body: formData,
        //   }
        // );
        const response = await axios.put(
          `https://travel-service-server-by-prisma-tqp8.vercel.app/traveller/${travellerId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == 200) {
          alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
          // const data = await response.json();
          // localStorage.setItem("traveller", JSON.stringify(data["data"]));
          localStorage.setItem(
            "traveller",
            JSON.stringify(response.data["data"])
          );
          navigator("/mytravel");
        }
      } catch (error) {
        alert("พบข้อผิดพลาด: " + error.message);
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* AppBar ===============================================*/}
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
                บันทึกการเดินทาง
              </Typography>
              <Link to={"/editprofile"} style={{ color: "white" }}>
                <Button color="inherit">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travellerImage == ""
                    ? Profile
                    : `${travellerImage}`
                }
              />
              <Link
                to={"/"}
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
        {/* AppBar ================================================*/}

        <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Travel DTI
          </Typography>

          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />

          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            แก้ไขข้อมูลส่วนตัว
          </Typography>

          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อ-นามสกุล
          </Typography>
          {/* TextField travellerFullname============================= */}
          <TextField
            fullWidth
            value={travellerNewFullname}
            onChange={(e) => setTravellerNewFullname(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อผู้ใช้ (E-Mail)
          </Typography>
          {/* TextField travellerEmail============================= */}
          <TextField
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            รหัสผ่าน
          </Typography>
          {/* TextField travellerPassword============================= */}
          <TextField
            fullWidth
            type="password"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
          />
          {/* Traveller Image=========================================== */}
          <Avatar
            src={
              travellerNewImage == null
                ? `${travellerImage}`
                : URL.createObjectURL(travellerNewImage)
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />
          {/* SelectFileButton======================================= */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              เลือกรูป
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>

          {/* Edit Button   =====================================*/}
          <Link onClick={handleEditProfileClick}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
            >
              แก้ไขข้อมูลส่วนตัว
            </Button>
          </Link>

          <Link
            to="/mytravel"
            style={{ textDecoration: "none", color: "#259e69" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้า การเดินทางของฉัน
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
