import { Box, IconButton, useTheme, Input, Button, Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import React from "react";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
   container: {
      position: "relative",
      display: "inline-block",
   },
   inputContainer: {
      position: "absolute",
      top: "5%",
      right: "1%",
      marginTop: "12px",
      backgroundColor: "#ffffff",
      padding: "4px",
      borderRadius: "12px",
   },
   input: {
      //apply important
      color: "#000000 !important",
   },
   button: {
      color: "#000000",
   },
}));

const Topbar = () => {
   // tasarımın içine dahil yukarda bulunan notification, settings, profile gibi iconlar ve arama çubuğu bulunur.
   // işlevsel değildir.
   const theme = useTheme();
   const userContext = React.useContext(UserContext);
   const { user, modifyUsername } = userContext;
   const classes = useStyles();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
   const [editing, setEditing] = React.useState(false);
   const [username, setUsername] = React.useState("");
   const [isAlertOpen, setAlertOpen] = React.useState(false);
   const handleClose = () => setAlertOpen(false);

   const handleEditClick = () => {
      setEditing(!editing);
      setUsername(user.user_name);
   };

   const handleSaveClick = () => {
      modifyUsername(username);
      setEditing(false);
      setAlertOpen(true);
   };

   const handleCancelClick = () => {
      setEditing(false);
   };

   const handleUsernameChange = (e) => {
      setUsername(e.target.value);
   };

   return (
      <Box display="flex" justifyContent="space-between" p={2}>
         {/* SEARCH BAR */}
         <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px"></Box>

         {/* ICONS */}
         <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
               {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
            <IconButton>
               <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
               <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
               <PersonOutlinedIcon />
            </IconButton>
            {editing && (
               <div className={classes.inputContainer}>
                  <Input className={classes.input} value={username} onChange={handleUsernameChange} />
                  <Button className={classes.button} onClick={handleSaveClick}>
                     Save
                  </Button>
                  <Button className={classes.button} onClick={handleCancelClick}>
                     Cancel
                  </Button>
               </div>
            )}
         </Box>
         <Snackbar open={isAlertOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
               Kullanıcı adı değiştirildi.
            </Alert>
         </Snackbar>
      </Box>
   );
};

export default Topbar;
