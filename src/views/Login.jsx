import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material"; //material ui
import Travel from "./../assets/travel.png"; //Logo image

function Login() {
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const navigator = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    // Validate UI
    if (travellerEmail.length == 0) {
      alert("ป้อนชื่อผู้ใช้");
      return;
    } else if (travellerPassword.length == 0) {
      alert("ป้อนรหัสผ่าน");
      return;
    } else {
      //send data to API and go to MyTravel.jsx("/mytravel") GET
      try {
        const response = await axios.get(
          `https://travel-service-server-by-prisma-tqp8.vercel.app/traveller/${travellerEmail}/${travellerPassword}`
        );
        if (response.status == 200) {
          //get data Traveller and save in memory

          //Use Fetch===========================
          // const data = await response.json();
          // localStorage.setItem("traveller", JSON.stringify(data["data"]));
          //go to (/mytravel)

          //Use Axios===========================
          localStorage.setItem("traveller", JSON.stringify(response.data["data"]));

          navigator("/mytravel");
        } else if (response.status == 404) {
          alert("ชื่อผู้ใช้(Email)หรือรหัสผ่านไม่ถูกต้อง");
        } else {
          alert("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error);
      }
    }
  };
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
          ชื่อผู้ใช้
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
        <Button
          variant="contained"
          onClick={handleLoginClick}
          fullWidth
          sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
        >
          LOGIN
        </Button>

        {/* Link to Resgister Page */}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#259e69" }}
        >
          <Typography
            sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
          >
            ลงทะเบียน
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;
