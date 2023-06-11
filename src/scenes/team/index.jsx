import { Box, Button, useTheme, Modal, Typography, InputLabel, MenuItem, FormControl, Select, TextField, FormGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getUsers, updateUser, createUser } from "../../services/user";
import { GridAddIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   height: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

const Team = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [users, setUsers] = useState([]);
   const [open, setOpen] = useState(false);
   const [edit, setEdit] = useState(false);
   const handleOpen = () => {
      setEdit(false);
      setOpen(true);
      setUserName("");
      setRole(0);
   };
   const handleClose = () => setOpen(false);

   const [role, setRole] = useState(0);
   const [userName, setUserName] = useState("");
   const [userScore, setUserScore] = useState("");
   const [userPayload, setUserPayload] = useState({});

   const handleChange = (event) => {
      setRole(event.target.value);
   };
   const handleUserNameChange = (event) => {
      setUserName(event.target.value);
   };
   const handleUserScoreChange = (event) => {
      setUserScore(event.target.value);
   };
   const setUsersData = () => {
      getUsers().then((res) => setUsers(res));
   };
   const postUserData = () => {
      if (edit) {
         console.log(userPayload);
         updateUser({ id: userPayload.id, score: userScore, role: role, user_name: userName }).then((res) => {
            console.log(res);
            setOpen(false);
            clearAll();
            setUsersData();
         });
      } else {
         createUser({ role: role, user_name: userName }).then((res) => {
            console.log(res);
            setOpen(false);
            clearAll();
            setUsersData();
         });
      }
   };
   const clearAll = () => {
      setUserName("");
      setRole(0);
      setUserPayload({});
   };
   const handleRowClick = (params) => {
      setUserPayload(params.row);
      setUserName(params.row.user_name);
      setRole(params.row.role);
      setUserScore(params.row.score);
      setOpen(true);
      setEdit(true);
   };

   // must avoid using async operations in useEffect
   // so we use a function that calls the async operation
   useEffect(() => {
      setUsersData();
   }, []);

   const columns = [
      {
         field: "id",
         headerName: "ID",
         renderCell: ({ row: { id } }) => {
            return (
               <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center">
                  <EditIcon />
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                     {id}
                  </Typography>
               </Box>
            );
         },
      },
      {
         field: "user_name",
         headerName: "İsim",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "role",
         headerName: "Kullanıcı Rolü",
         renderCell: ({ row: { role } }) => {
            return (
               <Box width="60%" justifyContent="center">
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                     {role == 0 ? "Tanımsız" : role == 1 ? "Öğrenci" : "Eğitmen"}
                  </Typography>
               </Box>
            );
         },
      },
      {
         field: "score",
         headerName: "Skor",
         flex: 1,
      },
   ];

   return (
      <Box m="20px">
         <Header title="Kullanıcılar" subtitle="Kullanıcı listesi aşağıda listelenmiştir" />
         <Box>
            <Button variant="contained" startIcon={<GridAddIcon />} onClick={handleOpen}>
               Kullanıcı oluştur
            </Button>
         </Box>
         <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
               "& .MuiDataGrid-root": {
                  border: "none",
               },
               "& .MuiDataGrid-cell": {
                  borderBottom: "none",
               },
               "& .name-column--cell": {
                  color: colors.greenAccent[300],
               },
               "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
               },
               "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
               },
               "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
               },
               "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
               },
            }}>
            <DataGrid rows={users} columns={columns} onRowClick={handleRowClick} />
         </Box>
         <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h3" component="h2">
                  Kullanıcı oluşturma formu
               </Typography>
               <Box marginTop={8}>
                  <FormControl fullWidth>
                     <FormGroup>
                        <InputLabel id="username-label">Kullanıcı rolü</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} label="Rol" onChange={handleChange}>
                           <MenuItem value={0}>Tanımsız</MenuItem>
                           <MenuItem value={1}>Öğrenci</MenuItem>
                           <MenuItem value={2}>Eğitmen</MenuItem>
                        </Select>
                     </FormGroup>
                     <TextField
                        style={{ marginTop: "16px" }}
                        value={userName}
                        onChange={handleUserNameChange}
                        id="standard-inp"
                        label="KULLANICI ISMI"
                        variant="standard"
                     />
                     <TextField
                        style={{ marginTop: "16px" }}
                        value={userScore}
                        onChange={handleUserScoreChange}
                        id="standard-inp"
                        label="SKOR"
                        variant="standard"
                     />
                  </FormControl>
                  <Button onClick={postUserData} style={{ backgroundColor: "#70d8bd", marginTop: "16px" }}>
                     {edit ? "Düzenle" : "Oluştur"}
                  </Button>
               </Box>
            </Box>
         </Modal>
      </Box>
   );
};

export default Team;
