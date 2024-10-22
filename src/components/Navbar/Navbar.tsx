import React, {useState} from 'react';
import {IconButton, Typography, Toolbar, AppBar, Menu, MenuItem} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import {useRouter} from "next/navigation";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
      setAnchorEl(null);
  };

  const onSettingsClick = () => {
    router.push('/wiki/userSetting')
  }

  return (
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Nome do App
              </Typography>
              <div>
                  <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                  >
                      <AccountCircle />
                  </IconButton>
                  <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                  >
                      <MenuItem onClick={onSettingsClick}>Settings</MenuItem>
                  </Menu>
              </div>
          </Toolbar>
      </AppBar>
  );
};

export default Navbar;