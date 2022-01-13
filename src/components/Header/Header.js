import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../images/mateGadges.png";
import { Link } from "react-router-dom";
import { loginContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(loginContext)
  const pages = ["Products", "Pricing", "Blog"];
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (param) => {
    // setAnchorElNav(null);
    if(param === "signOut"){
      setLoggedInUser("")
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




  const linkStyle = {
    marginRight:"50px",
    textDecoration:"none",
    fontWeight:"700",
    color:"black"
  }

  return (
    <div>
      <AppBar color="transparent" position="static" sx={{ boxShadow: 0 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img style={{ width: "100px" }} src={logo} alt="" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to="/">
                  <img style={{ width: "100px" }} src={logo} alt="" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: 'flex-end'} }}>
              <Link
              style={linkStyle}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  ml: "auto",
                  mr: 5,
                  fontWeight: "bold",
                  color: "black",
                  display: "block",
                }}
                to="/"
                
              >
                Home
              </Link>
              <Link
              style={linkStyle}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mr: 5,
                  fontWeight: "bold",
                  color: "black",
                  display: "block",
                }}
                to="/orders"
                
              >
                Orders
              </Link>
              <Link
              style={linkStyle}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mr: 5,
                  fontWeight: "bold",
                  color: "black",
                  display: "block",
                }}
                to="/"
                
              >
                Deals
              </Link>
              <Link
              style={linkStyle}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mr: 10,
                  fontWeight: "bold",
                  color: "black",
                  display: "block",
                }}
                to="/admin"
                
              >
                Admin
              </Link>
            </Box>

            { loggedInUser.email ? (<Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={loggedInUser.name} src={loggedInUser.img ? loggedInUser.img : loggedInUser.name}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem sx={{textAlign:"center"}} onClick={handleCloseNavMenu}>
                    <Typography >{loggedInUser.name}</Typography>
                  </MenuItem>
                  <MenuItem sx={{textAlign:"center"}} onClick={() => handleCloseNavMenu("signOut")}>
                    <Typography>Sign Out</Typography>
                  </MenuItem>
              </Menu>
            </Box>)
            :
            (<Link
              style={linkStyle}
                sx={{
                  my: 5,
                  mr: 10,
                  fontWeight: "bold",
                  color: "black",
                  display: "block",
                }}
                to="/login"
                
              >
                Login
              </Link>)}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
