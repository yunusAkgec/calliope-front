import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UserContext } from "../../context/userContext";

// Ekranın solunda bulunan sidebar componenti ilgili sayfalara yönlendirme yapan bir menü içerir.
// React router'da bulunan Link componenti ile başlık ve gidilmesi istenen sayfa belirtilir.
// Item componenti bir yardımcı component olarak kullanılmıştır. Gereksiz kod tekrarnından kaçınmak için.
// title , to , icon , selected , setSelected parametreleri alır.
const Item = ({ title, to, icon, selected, setSelected }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <MenuItem
         active={selected === title}
         style={{
            color: colors.grey[100],
         }}
         onClick={() => setSelected(title)}
         icon={icon}>
         <Typography>{title}</Typography>
         <Link to={to} />
      </MenuItem>
   );
};

const Sidebar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [selected, setSelected] = useState("Dashboard");
   const { user } = useContext(UserContext);

   return (
      <Box
         sx={{
            "& .pro-sidebar-inner": {
               background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
               backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
               padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
               color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
               color: "#6870fa !important",
            },
         }}>
         <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
               {/* LOGO AND MENU ICON */}
               <MenuItem
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                  style={{
                     margin: "10px 0 20px 0",
                     color: colors.grey[100],
                  }}>
                  {!isCollapsed && (
                     <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                        <Typography variant="h5" color={colors.grey[100]}>
                           Calliope
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                           <MenuOutlinedIcon />
                        </IconButton>
                     </Box>
                  )}
               </MenuItem>

               {!isCollapsed && (
                  <Box mb="25px">
                     <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                           alt="profile-user"
                           width="100px"
                           height="100px"
                           src={`../../assets/user.png`}
                           style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                     </Box>
                     <Box textAlign="center">
                        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                           {user.user_name}
                        </Typography>
                        <Typography variant="h5" color={colors.greenAccent[500]}>
                           Master admin
                        </Typography>
                     </Box>
                  </Box>
               )}

               <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                  {/* Yazdığımız yardımcı componentin kullanım örnekleri aşağıdadır. */}
                  <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                  {/* 
                  <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                     Kullanıcı
                  </Typography> */}
                  {/* <Item title="Kullanıcı listesi" to="/users" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}

                  <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                     Ders
                  </Typography>
                  {/* <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
                  <Item
                     title="Live Courses"
                     to="/calendar"
                     icon={<CalendarTodayOutlinedIcon />}
                     selected={selected}
                     setSelected={setSelected}
                  />
                  <Item title="Courses" to="/lessons" icon={<PlayLessonIcon />} selected={selected} setSelected={setSelected} />
               </Box>
            </Menu>
         </ProSidebar>
      </Box>
   );
};

export default Sidebar;
