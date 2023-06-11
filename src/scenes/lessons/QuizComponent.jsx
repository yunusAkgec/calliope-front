import React, { useState } from "react";
import { Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Chip, Box } from "@mui/material";
// questions isimli bir array alır. Bu array içerisinde sorular ve cevapları bulunur.
// bu veri bir üstteki lessons componentinden alır.
const QuizComponent = ({ questions, quizPoint, setQuizPoint }) => {
   // quizin mevcut soru indexini tutar ve ilgili indexteki soruyu gösterir.
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   // quizin mevcut skorunu tutar kullanıcı doğru cevap verdiğinde skor 1 artar.
   const [score, setScore] = useState(0);
   // kullanıcının seçtiği cevabı tutar
   const [selectedOption, setSelectedOption] = useState(-1);

   // kullanıcının tıkladığı cevabı seçer ve ilgili cevabın id sini selectedOption state ine atar
   const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
   };
   // kullanıcının ileri butonuna tıkladığında çalışır ve bir sonraki soruya geçer
   const handleNextQuestion = () => {
      //mevcut soru indexi yardımıyla mevcut soruyu bulur
      const currentQuestion = questions[currentQuestionIndex];
      // kullanıcının seçtiği cevabı bulur
      const selectedOptionData = currentQuestion.answer.find((ans) => ans.id === parseInt(selectedOption));
      // eğer kullanıcının seçtiği cevap doğru ise skoru 1 arttırır
      if (selectedOptionData.is_right) {
         setScore(score + 1);
      }
      // kullanıcının seçtiği cevabı sıfırlar ve bir sonraki soruya geçmek için currentQuestionIndex i 1 arttırır
      setSelectedOption(-1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
   };

   // quizin bitip bitmediğini kontrol eder ve eğer bittiyse skoru gösterir
   if (currentQuestionIndex >= questions.length) {
      const successRate = (score / questions.length) * 100;
      setQuizPoint(successRate == 0 ? 0.01 : successRate);
      if (successRate >= 80) {
         return (
            <div>
               <Typography variant="h4">Quiz Completed!</Typography>
               <Typography variant="h6">
                  Your Score: {score} / {questions.length}
               </Typography>
               <Typography variant="h6">Success Rate: {successRate}%</Typography>
               <Typography variant="h6">Congratulations! You passed the quiz with a success rate of at least 80%.</Typography>
            </div>
         );
      } else {
         return (
            <div>
               <Typography variant="h4">Quiz Completed!</Typography>
               <Typography variant="h6">
                  Your Score: {score} / {questions.length}
               </Typography>
               <Typography variant="h6">Success Rate: {successRate}%</Typography>
               <Typography variant="h6">Unfortunately, your success rate is below 80%. Please try again.</Typography>
            </div>
         );
      }
   }
   // mevcut soruyu bulur ve eğer mevcut ise soruyu gösterir
   const currentQuestion = questions[currentQuestionIndex];

   return (
      <div>
         <Box style={{ display: "flex", marginBottom: "12px" }}>
            <Typography variant="h5">Question {currentQuestionIndex + 1}</Typography>
            {/* mevcut sorunun zorluğunu kullanıcıya göstermek için yazdığımız kod parçacığıdır. */}
            {currentQuestion && currentQuestion.difficulty && (
               <React.Fragment>
                  {(() => {
                     switch (currentQuestion.difficulty) {
                        case 1:
                           return <Chip style={{ marginLeft: "20px" }} size="small" label="Başlangıç" color="success" />;
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
         </Box>
         {/* mevcut soru içinde bulunan question_text sorunun kendisidr ve bunu ekrana yazar. */}
         <Typography variant="body1">{currentQuestion.question_text}</Typography>
         <FormControl component="fieldset" style={{ display: "flex" }}>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
               {/* mevcut soru içinde bulunan answer_text sorunun cevap textini içerir ve ekrana yazar. */}
               {currentQuestion.answer.map((ans, index) => (
                  <FormControlLabel
                     key={index}
                     value={ans.id}
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
                     label={ans.answer_text}
                  />
               ))}
            </RadioGroup>
         </FormControl>
         {/* diğer soruya geçmek için kullanıcının tıklaması gereken butondur click olduğunda handleNextQuestion fonksiyonu çağrılır*/}
         <Button variant="contained" color="primary" onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
         </Button>
      </div>
   );
};

export default QuizComponent;
