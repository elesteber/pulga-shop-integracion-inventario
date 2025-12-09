import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "./footer";

import Logo from "../../components/logo";
import { Outlet } from "react-router-dom";
import { Avatar, Container } from "@mui/material";
import profilePicture from "../../assets/images/profile_picture.jpg";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ name: "Tiendas", path: "/app" }];

export default function AppLayout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="flex justify-center pt-10">
        <Logo size="md" />
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} color="#fff" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#22c55e",
          color: "#fff",
          borderBottom: "1px solid #ccc",
        }}
        elevation={0}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 0.5, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Logo size="sm" />
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ color: "#fff" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Avatar alt="User picture" src={profilePicture} />
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }} className="w-full">
        <Toolbar />
        <Container maxWidth="lg" component="main">
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
