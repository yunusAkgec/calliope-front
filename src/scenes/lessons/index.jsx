import { Box, Modal, useTheme, Chip, Button, Snackbar, Alert } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { fetchData, createConference } from "../../services/lesson";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizComponent from "./QuizComponent.jsx";
import React from "react";
import YouTube from "react-youtube";
import { fetchQuiz } from "../../services/quiz";
import CommentComponent from "./CommentComponent";
const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 500,
   height: 500,
   bgcolor: "background.paper",
   boxShadow: 24,
   p: 4,
};

const Lessons = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   //derslerin tutulduğu state tanımlanır
   const [lessonsData, setLessonsData] = useState({});
   // derslerin bulunduğu sayfadan konferansların bulunduğu sayfaya geçiş için kullanılır
   // useNavigate ilgili sayfaya yönlendirme yapan bir react-router hookudur.
   const navigate = useNavigate();

   // konferans oluşturulduğunda kullanıcıya gösterilen snackbar için kullanılır.
   const [isAlertOpen, setAlertOpen] = useState(false);
   // ilgili dersin quiz verisini tutan statedir.
   const [questions, setQuestions] = useState([]);
   const [quizPoint, setQuizPoint] = useState(0);
   const [isQuizBtnVisible, setIsQuizBtnVisible] = useState(false);
   const handleClose = () => setAlertOpen(false);
   // tüm ders verilerini çeken fonksiyondur.
   // fetchData servisler altında tanımlanmıştır ve ilgili endpointten verileri çeker.
   const setData = () => {
      fetchData().then((res) => {
         setLessonsData(res);
      });
   };
   // ilgili derste kullanıcının yaptığı tıklama türüne göre ilgili işlemleri opare eder.
   const handleClickLesson = (lessonId, lessonName, type) => {
      // dersi öğretmek isteyen kullanıcı için konferans oluşturulması işlemini servise bildiren kod parçasıdır.
      if (type === "teach")
         createConference({
            related_lesson: lessonId,
            conference_topic: lessonName,
         }).then((res) => {
            // konferans oluşturulduktan sonra kullanıcıya bildirim gösterilmesi için kullanılır.
            if (res.status == "success") setAlertOpen(true);
         });
      if (type == "listen") {
         // ilgili ders id si ile konferanslar componentine yönlendirme yapar. ve lessonId parametresi ekler
         navigate("/calendar/" + lessonId);
      }
   };
   // ilgili dersin quiz verisini çeken fonksiyondur.
   const handleFetchQuiz = (lessonId) => {
      fetchQuiz(5).then((res) => {
         setQuestions(res);
         setIsQuizBtnVisible(false);
      });
   };
   const handlerQuizPoint = (point) => {
      setQuizPoint(point);
   };
   const handleVideoEnd = () => {
      setIsQuizBtnVisible(true);
   };
   // sayfa ilk render olduğunda ders verilerini çeker.
   useEffect(() => {
      setData();
   }, []);
   return (
      <Box m="20px">
         <Header title="Dersler" subtitle="Ders listesi aşağıda listelenmiştir." />
         {/*ders kategorisine göre kategoriye ait dersler gerekli if kontrolleri ile kullanıcıya düzgün şekilde listelenir. */}
         {lessonsData.categories &&
            lessonsData.categories.map((category) => (
               <Accordion defaultExpanded key={category.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography color={colors.greenAccent[500]} variant="h2">
                        {category.category_name}
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Box>
                        {lessonsData.lessons &&
                           lessonsData.lessons.map(
                              (lesson, index) =>
                                 lesson.category === category.id &&
                                 lesson.is_active && (
                                    <Accordion key={"lsx" + lesson.id}>
                                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                          <Typography variant="h3">
                                             {index + 1}- {lesson.lesson_title}
                                          </Typography>
                                          {/* dersin zorluk derecesini göstermek için kullanılan kod parçasıdır difficulty verisi derslerden alınmaktadır. */}
                                          {lesson && lesson.difficulty && (
                                             <React.Fragment>
                                                {(() => {
                                                   switch (lesson.difficulty) {
                                                      case 1:
                                                         return (
                                                            <Chip style={{ marginLeft: "20px" }} size="small" label="Başlangıç" color="success" />
                                                         );
                                                      case 2:
                                                         return <Chip style={{ marginLeft: "20px" }} size="small" label="Orta" color="warning" />;
                                                      case 3:
                                                         return <Chip style={{ marginLeft: "20px" }} size="small" label="İleri" color="error" />;
                                                      default:
                                                         return null;
                                                   }
                                                })()}
                                             </React.Fragment>
                                          )}
                                       </AccordionSummary>
                                       <AccordionDetails>
                                          <Accordion>
                                             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography variant="h4">Ders İçeriği</Typography>
                                             </AccordionSummary>
                                             <AccordionDetails>
                                                <Box>
                                                   {/* dersin içeriğini ekranda render eden kod parçasıdır. 
                                             content içerisinde bulunan related_lesson ile ilgili dersin lesson id si eşleşiyorsa ilgili içerikler ekranda gösterilir.
                                             */}
                                                   {lessonsData.contents &&
                                                      lessonsData.contents.map(
                                                         (content, index) =>
                                                            content.related_lesson === lesson.id && (
                                                               <Box key={"ctx" + content.id}>
                                                                  <Typography variant="h4">{content.content_header}</Typography>

                                                                  <Typography>{content.content_text}</Typography>
                                                                  <br />
                                                                  <Box>
                                                                     <Box style={{ display: "flex" }}>
                                                                        <Box>
                                                                           <Typography variant="h4">Lesson Video</Typography>
                                                                           <YouTube
                                                                              videoId={content.video_url.split("v=")[1]} // defaults -> ''
                                                                              title={"Lession Video"} // defaults -> ''
                                                                              onEnd={handleVideoEnd} // defaults -> noop
                                                                           />
                                                                        </Box>
                                                                        <Box marginLeft={16}>
                                                                           {/* quiz verisi varsa quiz componenti render edilir. ve soru verileri quizcomponent isimli componente aktarılır. */}
                                                                           {questions.length > 0 && (
                                                                              <QuizComponent
                                                                                 questions={questions}
                                                                                 quizPoint={quizPoint}
                                                                                 setQuizPoint={handlerQuizPoint}
                                                                              />
                                                                           )}
                                                                        </Box>
                                                                     </Box>
                                                                  </Box>

                                                                  {isQuizBtnVisible && (
                                                                     <Button
                                                                        style={{ marginTop: "12px" }}
                                                                        size="medium"
                                                                        color="success"
                                                                        variant="contained"
                                                                        onClick={handleFetchQuiz}>
                                                                        Go to quiz
                                                                     </Button>
                                                                  )}
                                                                  {/* öğreten mi öğretici mi olacağı burada tıkladığı buton ile karar verilir ve konferans işlemleri gerçekleşir */}
                                                                  {quizPoint >= 80 ? (
                                                                     <Button
                                                                        onClick={() => {
                                                                           handleClickLesson(content.related_lesson, lesson.lesson_title, "teach");
                                                                        }}
                                                                        style={{ marginLeft: "12px", marginTop: "12px" }}
                                                                        type="button"
                                                                        color="info"
                                                                        variant="contained"
                                                                        size="medium">
                                                                        Teach this lesson
                                                                     </Button>
                                                                  ) : (
                                                                     quizPoint > 0 &&
                                                                     quizPoint <= 79 && (
                                                                        <Button
                                                                           onClick={() => {
                                                                              handleClickLesson(
                                                                                 content.related_lesson,
                                                                                 lesson.lesson_title,
                                                                                 "listen"
                                                                              );
                                                                           }}
                                                                           style={{ marginLeft: "12px", marginTop: "12px" }}
                                                                           type="button"
                                                                           color="error"
                                                                           variant="contained"
                                                                           size="medium">
                                                                           Listen from another student
                                                                        </Button>
                                                                     )
                                                                  )}
                                                               </Box>
                                                            )
                                                      )}
                                                </Box>
                                             </AccordionDetails>
                                          </Accordion>
                                          <Accordion>
                                             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography variant="h4">Forum</Typography>
                                             </AccordionSummary>
                                             <AccordionDetails>
                                                <Box>
                                                   <CommentComponent />
                                                </Box>
                                             </AccordionDetails>
                                          </Accordion>
                                       </AccordionDetails>
                                    </Accordion>
                                 )
                           )}
                     </Box>
                  </AccordionDetails>
               </Accordion>
            ))}
         {/* konferans oluşturulduktan sonra kullanıcıya bildirim gösterilmesi için kullanılır. */}
         <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
               Ders anlatım video konferans linki oluşturuldu.
            </Alert>
         </Snackbar>
      </Box>
   );
};

export default Lessons;
