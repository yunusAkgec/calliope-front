import React from "react";
import { Grid, Box, useTheme, Tooltip, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl,FormGroup,Checkbox,Accordion,AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { tokens } from "../../theme";
import { fetchConferenceById, fetchSurveysById, createSurveyAnswerById, getSurveyAnswers } from "../../services/conference";
import PieChart from "../../components/PieChart";
import {useLocation} from "react-router-dom"

const Conferance = () => {
   const theme = useTheme();
   const { state } = useLocation();
   console.log(state)
   const isLearner = state ? state.isLearner :false
   console.log(isLearner)
   const colors = tokens(theme.palette.mode);
   const [isOver, setIsOver] = React.useState(false);
   const surveyAnswerOpts = [
      { value: 1, label: "Very weak" },
      { value: 2, label: "Weak" },
      { value: 3, label: "Normal" },
      { value: 4, label: "Good" },
      { value: 5, label: "Very Good" },
   ];
   const [surveyTitle, setSurveyTitle] = React.useState("");
   const [selectedOption, setSelectedOption] = React.useState(-1);
   const [surveyAnswers, setSurveyAnswers] = React.useState(null);
   const [isSurveryAnswered, setIsSurveryAnswered] = React.useState(false);
   const [tutorSurveyIds,setTutorSurveyIds] = React.useState([3,4,5,6,7])
   const [learnerSurveyIds,setLearnerSurveyIds] = React.useState([8,9,10,11,12])

   const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
   };

   const handleClickConferance = async () => {
      setIsOver(true);
      fetchSurveysById(isLearner ? learnerSurveyIds[0] : tutorSurveyIds[0]).then((res) => {
         setSurveyTitle(res[0].survey_question);
      });
   };
   const handleSubmitSurvey = async () => {
      let payload = {
         related_survey: isLearner ? learnerSurveyIds[0] : tutorSurveyIds[0],
         survey_answer: parseInt(selectedOption),
      };
      setIsOver(false);
      setIsSurveryAnswered(true);
      createSurveyAnswerById(payload).then((res) => {
         if (res.status == "success") {
            alert("Survey Submitted Successfully");
            getSurveyAnswers(isLearner ? learnerSurveyIds[0] : tutorSurveyIds[0]).then((res) => {
                  setSurveyAnswers(res);
            });
         } else {
            alert("Survey Submission Failed");
         }
      });
   };
   const CustomTooltipWrapper = styled(({ title, ...props }) => <Tooltip {...props} title={<span style={{ fontSize: "20px" }}>{title}</span>} />)(
      ({ theme }) => ({
         ".MuiTooltip-tooltip span": {
            fontSize: "50px", // Set the desired font size
         },
      })
   );
   const handleNextSurvey = () => {
      if(isLearner){
         learnerSurveyIds.shift()
      }else{
         tutorSurveyIds.shift()
      }
      console.log(learnerSurveyIds)
      console.log(tutorSurveyIds)
     if(isLearner){
      if(learnerSurveyIds.length){
         handleClickConferance();
         setIsSurveryAnswered(false);
      }
     }else{
      if(tutorSurveyIds.length){
         handleClickConferance();
         setIsSurveryAnswered(false);
      }
     }
   };
   const [conference, setConference] = React.useState({});
   const fetchConference = async () => {
      fetchConferenceById(isLearner ? 2:3).then((res) => {
         setConference(res[0]);
      });
   };
   React.useEffect(() => {
      fetchConference();
   }, []);
   if (!conference) return <div>Loading..</div>;

   return (
      <Box backgroundColor={colors.primary[400]}>
         <Grid container spacing={0}>
            <Grid item xs={6}>
               <iframe src={conference.code_editor_url} width="100%" height="720" allowFullScreen></iframe>
            </Grid>
            <Grid item xs={6}>
            <Accordion>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4">Directives</Typography>
               </AccordionSummary>
               <AccordionDetails>
               <Typography variant="h5">{conference.directive_text}</Typography>
               </AccordionDetails>
            </Accordion>
            <br/>
            
               <Button variant="contained" color="secondary" onClick={handleClickConferance}>
                  Conferance Over
               </Button>
               {isOver && (
                  <Box padding={10}>
                     <Typography variant="h5" fontWeight="600">
                        {surveyTitle}
                     </Typography>
                     <FormControl component="fieldset" style={{ display: "flex" }}>
                        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                           {surveyAnswerOpts.map((ans, index) => (
                              <FormControlLabel
                                 key={index}
                                 value={ans.value}
                                 control={
                                    <Radio
                                       sx={{
                                          color: "pink",
                                          "&.Mui-checked": {
                                             color: "pink",
                                          },
                                       }}
                                    />
                                 }
                                 label={ans.label}
                              />
                           ))}
                        </RadioGroup>
                     </FormControl>
                     <Button variant="contained" color="primary" onClick={handleSubmitSurvey} disabled={!selectedOption}>
                        Submit
                     </Button>
                  </Box>
               )}
               {isSurveryAnswered && surveyAnswers && 
               <Box>
               <PieChart data={surveyAnswers}/>
               <Button variant="contained" color="primary" onClick={handleNextSurvey}>
                        Next
                     </Button>
               </Box>
               }
            </Grid>
         </Grid>
      </Box>
   );
};

export default Conferance;
