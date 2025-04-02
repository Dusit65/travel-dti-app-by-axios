import axios from "axios";
import { React, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import Travel from "./../assets/travel.png";
import Profile from "./../assets/profile.png";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [travellerImage, setTravellerImage] = useState(null);
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  const navigator = useNavigate();
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravellerImage(file);
    }
  };

  const handleRegisterClick = async (e) => {
    console.log(travellerFullname, travellerEmail, travellerPassword);
    //Validate Register Button
    e.preventDefault();
    if (travellerFullname.trim().length == 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
    } else if (travellerEmail.trim().length == 0) {
      alert("ป้อนอีเมล์ด้วย");
    } else if (travellerPassword.trim().length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
    } else {
      //Send data to API, save to DB and redirect to Login page.
      //Packing data
      const formData = new FormData();

      formData.append("travellerFullname", travellerFullname);
      formData.append("travellerEmail", travellerEmail);
      formData.append("travellerPassword", travellerPassword);

      if (travellerImage) {
        formData.append("travellerImage", travellerImage);
      }

      //send data from formData to API (http://localhost:4000/traveller) POST
      try {
        // const response = await fetch("http://localhost:4000/traveller/", {
        //   method: "POST",
        //   body: formData,
        // });
        const response = await axios.post(`${API_URL}/traveller`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 201) {
          alert("สมัครสมาชิกสําเร็จOwO");
          navigator("/");
          // window.location.href("/")
        } else {
          alert("สมัครสมาชิกไม่สำเร็จดปรดลองใหม่อีกครั้งTwT");
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในการสมัครสมาชิก", error);
      }
    }
  };

  //select image func
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", my: "auto", p: 5 }}>
        {/* Head text =====================================*/}
        <Typography
          variant="h5"
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

        {/* Login text =====================================*/}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          เข้าใช้งานระบบ
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
          ชื่อ-สกุล
        </Typography>
        {/* TextField Fullname  =====================================*/}
        <TextField
          fullWidth
          value={travellerFullname}
          onChange={(e) => setTravellerFullname(e.target.value)}
        />

        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          ชื่อผู้ใช้ (Email)
        </Typography>
        {/* TextField Username  =====================================*/}
        <TextField
          fullWidth
          value={travellerEmail}
          onChange={(e) => setTravellerEmail(e.target.value)}
        />

        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          รหัสผ่าน
        </Typography>
        {/* TextField passwords  =====================================*/}
        <TextField
          fullWidth
          type="password"
          value={travellerPassword}
          onChange={(e) => setTravellerPassword(e.target.value)}
        />

        {/* Profile Image =====================================*/}
        <Avatar
          src={
            travellerImage == null
              ? Profile
              : URL.createObjectURL(travellerImage)
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

        {/* btRegister   =====================================*/}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
          onClick={handleRegisterClick}
        >
          Register
        </Button>

        <Link to="/" style={{ textDecoration: "none", color: "#259e69" }}>
          <Typography
            sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
          >
            กลับไปหน้าLogin
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Register;
