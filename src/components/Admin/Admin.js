import './Admin.css';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddProduct from '../AddProduct/AddProduct';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
import { useState, createContext } from 'react';
import ManageProduct from '../ManageProduct/ManageProduct';
import EditProduct from '../EditProduct/EditProduct';
import CloseIcon from '@mui/icons-material/Close';
import icon from "../../images/mateGadges 1.png"
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const MyContext = createContext();

export default function Admin() {
  const [open, setOpen] = useState(true);

  const initialState = { manageProduct: true, addProduct: false, editProduct: false }
  const [selectedComponent, setSelectedComponent] = useState(initialState);
  const [editProductId, setEditProductId] = useState();
  const [successMessage, setSuccessMessage] = useState(true)
  const handleDrawer = () => {
    setOpen(!open);
  };


  const handleChangeComponent = (componentName) => {
    if (componentName === "manageProduct") {
      const showComponent = { ...selectedComponent }
      showComponent.manageProduct = true;
      showComponent.addProduct = false;
      showComponent.editProduct = false;
      setSelectedComponent(showComponent)
      setSuccessMessage(false)
    }

    if (componentName === "addProduct") {
      const showComponent = { ...selectedComponent }
      showComponent.addProduct = true;
      showComponent.manageProduct = false;
      showComponent.editProduct = false;
      setSelectedComponent(showComponent)
      setSuccessMessage(false)
    }

    if (componentName === "editProduct") {
      const showComponent = { ...selectedComponent }
      showComponent.editProduct = true;
      showComponent.manageProduct = false;
      showComponent.addProduct = false;
      setSelectedComponent(showComponent)
      setSuccessMessage(false)
    }

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="success">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            {selectedComponent.manageProduct && "Manage Product"}
            {selectedComponent.addProduct && "Add Product"}
            {selectedComponent.editProduct && "Edit Product"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img style={{ width: "120px", margin:"0 auto" }} src={icon} alt="" />
        </DrawerHeader>
        <List>
          <ListItem button onClick={() => handleChangeComponent("manageProduct")}>
            <ListItemIcon>
              <AppRegistrationSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Products"} />
          </ListItem>

          <ListItem button onClick={() => handleChangeComponent("addProduct")}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faFolderPlus} />
            </ListItemIcon>
            <ListItemText primary={"Add Product"} />
          </ListItem>

          <ListItem button onClick={() => handleChangeComponent("editProduct")}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faEdit} />
            </ListItemIcon>
            <ListItemText primary={"Edit Product"} />
          </ListItem>

          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon className="text-success" icon={faHome} />
              </ListItemIcon>
              <ListItemText className="text-success" primary={"Back to Home"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}} className="sidebar-component-part">
        <MyContext.Provider value={{ editProductId, setEditProductId, selectedComponent, setSelectedComponent, successMessage, setSuccessMessage }}>
          <DrawerHeader />
          {selectedComponent.manageProduct && <ManageProduct />}
          {selectedComponent.addProduct && <AddProduct />}
          {selectedComponent.editProduct && <EditProduct />}
        </MyContext.Provider>
      </Box>
    </Box>
  );
}

