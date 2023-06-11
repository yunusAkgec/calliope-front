import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
   const answerTypes = [
      { id: 1, name: "Very few" },
      { id: 2, name: "Fewer" },
      { id: 3, name: "Normal" },
      { id: 4, name: "Pretty" },
      { id: 5, name: "Excessive" },
   ];

   // Count answers
   const counts = {};
   data.forEach((item) => {
      const answerType = item.survey_answer;
      if (!counts[answerType]) {
         counts[answerType] = 0;
      }
      counts[answerType]++;
   });

   // Prepare data for pie chart
   const pieData = answerTypes.map((type) => {
      return {
         id: type.name,
         label: type.name,
         value: counts[type.id] || 0,
      };
   });
   return (
      <div style={{ height: "400px" }}>
         <ResponsivePie
            data={pieData}
            colors={{ scheme: "nivo" }}
            enableRadialLabels={false}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            legends={[
               {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "white",
               },
            ]}
         />
      </div>
   );
};

export default PieChart;
