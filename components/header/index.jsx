import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Profilelogo from "../../public/images/profilelogo.png";
import Logoutlogo from "../../public/images/logoutlogo.png";
import { auth } from "../../firebaseconfig";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [anchorEh, setAnchorEh] = useState(null);
  const open = Boolean(anchorEh);

  const handleClick = (event) => {
    setAnchorEh(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEh(null);
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="profile-button">
        <Button
          id="header-profile-menu"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img src="/images/profile.jpg" width="34" height="34" style={{ borderRadius: "2rem" }} />
        </Button>
      </div>

      <Menu
        anchorEl={anchorEh}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ borderRadius: "2rem" }}
      >
        <div id="header-profile-email1">
          <img
            src={user?.photoURL ? user?.photoURL : "/images/profile.jpg"}
            width="32"
            height="32"
            style={{ borderRadius: "2rem" }}
          />
          <div style={{ marginLeft: "1rem" }}>
            <div className="header-profile-dropdown-name">{user?.displayName}</div>
            <div className="header-profile-dropdown-email">{user?.email}</div>
          </div>
        </div>
        <Divider />

        <MenuItem
          style={{ display: "block" }}
          id="header-profile-menu-signout"
          onClick={handleLogOut}
        >
          <div className="header-profile-email-profile">
            <Image src={Logoutlogo} width="13" height="15" />
            <div style={{ marginLeft: "1rem" }}>LogOut</div>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
}
