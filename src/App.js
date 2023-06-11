import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Conferance from "./scenes/calendar/conferance";
import Team from "./scenes/team";
import Lessons from "./scenes/lessons";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { UserProvider } from "./context/userContext";

function App() {
   const [theme, colorMode] = useMode();
   const [isSidebar, setIsSidebar] = useState(true);

   return (
      <UserProvider>
         <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                     <Topbar setIsSidebar={setIsSidebar} />
                     <Routes>
                        <Route path="/" element={<Dashboard />} />
                        {/* <Route path="/users" element={<Team />} /> */}
                        {/* <Route path="/form" element={<Form />} /> */}
                        <Route path="/lessons" element={<Lessons />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/conferance" element={<Conferance />} />
                        <Route path="/calendar/:lessonId" element={<Calendar />} />
                     </Routes>
                  </main>
               </div>
            </ThemeProvider>
         </ColorModeContext.Provider>
      </UserProvider>
   );
}

export default App;
