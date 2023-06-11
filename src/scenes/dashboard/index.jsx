import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";

const Dashboard = () => {
   // tamamen demo bir ekran veriler statik gömülüdür.
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
      <Box m="20px">
         {/* GRID & CHARTS */}
         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
            {/* ROW 1 */}
            <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
               <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
                  Ders Sayıları
               </Typography>
               {/* <Box height="250px" mt="-20px">
                  <BarChart isDashboard={true} />
               </Box> */}
            </Box>
            <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
               <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
                  Kullanıcı Yoğunlukları
               </Typography>
               <Box height="200px">
                  <GeographyChart isDashboard={true} />
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default Dashboard;
