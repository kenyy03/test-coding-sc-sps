import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const listItemStyles = {
    color: 'white',
    '&:hover': {
      backgroundColor: '#3F4A67',
    },
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#2E3B55",
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)'
        },
      }}
      // css={sidebarStyles}
    >
      <div style={{
        padding: '1rem',
        backgroundColor: '#1C253A',
        textAlign: 'center'
      }}>
        <Typography variant="h6" noWrap marginTop={2} marginLeft={2}>
          Poliza DashBoard
        </Typography>
      </div>
      <Divider sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.12)'
      }} />
      <List>
        <ListItem sx={listItemStyles} button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Mantenimiento Tipo Persona" />
        </ListItem>
        <ListItem sx={listItemStyles} button component={Link} to="/cliente">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Mantenimiento Cliente" />
        </ListItem>
        <ListItem sx={listItemStyles} button component={Link} to="/poliza">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Mantenimiento Poliza" />
        </ListItem>

        <ListItem sx={listItemStyles} button component={Link} to="/poliza-reporte">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Reporte Poliza" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;