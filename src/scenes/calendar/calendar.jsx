import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { fetchConferences, fetchLessons } from "../../services/lesson";
import { useParams } from "react-router-dom";

const Calendar = () => {
   const theme = useTheme();
   let { lessonId } = useParams();
   const colors = tokens(theme.palette.mode);
   // mevcut konferansların tutulduğu state tanımlanır
   const [currentEvents, setCurrentEvents] = useState([]);
   const navigate = useNavigate();

   // konferansların çekildiği fonksiyon eğer ders idsi verilirse sadece o dersin konferanslarını filtrelenecektir
   // ders id si verilmezse tüm konferanslar çekilecektir ve ekranda gösterilecektir
   // Ders id si  react-router ile alınır kullanıcı eğer dersler bölümünden ilgili derse tıklayarak bu sayfaya gelmiş ise
   // url sonunda lessonId isimli bir parametre olacaktır ?lessonId=1 gibi
   const setEvents = async () => {
      let lessons = [];
      // tüm dersler bilgisi çekilir ve lessons isimli geçici değişkene atanır
      // bunun sebebi konferansların ilgili ders bilgisini de göstermesi gerekmektedir bu durumda konferans verisinde bulunan related_lesson verisi ile sağlanmaktadır
      fetchLessons().then((res) => (lessons = res.lessons));
      fetchConferences().then((res) => {
         if (lessonId) {
            // lessonId varlığı burada kontrol edilip ilgili filtreleme fonksiyonu yapılmaktadır
            setCurrentEvents(
               res
                  .filter((event) => event.related_lesson == lessonId)
                  .map((conference) => {
                     const currentDate = new Date();
                     const nextDay = new Date();
                     nextDay.setDate(currentDate.getDate() + 1);
                     const formattedNextDay = nextDay.toISOString().split("T")[0];
                     return {
                        id: conference.id,
                        title:
                           "Konferans : " +
                           conference.conference_topic +
                           "\n" +
                           "|| Ders : " +
                           lessons.find((lesson) => lesson.id === conference.related_lesson).lesson_title,
                        date: formattedNextDay,
                        // konferans meet linki ve ilgili ders objeye tanımlanır
                        conference_url: conference.conference_url,
                        related_lesson: conference.related_lesson,
                     };
                  })
            );
         } else {
            // yukarda verilen bilgiler doğrultusunda bu kod parçacığı ise tüm konferansları gösteren kısımdır.
            setCurrentEvents(
               res.map((conference) => {
                  const currentDate = new Date();
                  const nextDay = new Date();
                  nextDay.setDate(currentDate.getDate());
                  const formattedNextDay = nextDay.toISOString().split("T")[0];
                  return {
                     id: conference.id,
                     title:
                        "Konferans : " +
                        conference.conference_topic +
                        "\n" +
                        "|| Ders : " +
                        lessons.find((lesson) => lesson.id === conference.related_lesson).lesson_title,
                     date: formattedNextDay,
                     conference_url: conference.conference_url,
                     related_lesson: conference.related_lesson,
                  };
               })
            );
         }
      });
   };
   // konferanslara tıklandığında ilgili konferansın meet linkine yönlendirme yapılır
   const handleEventClick = (clickedEvent) => {
      if (clickedEvent.event) {
         window.open(clickedEvent.event._def.extendedProps.conference_url, "_blank");
      } else {
         window.open(clickedEvent, "_blank");
      }
      navigate("/conferance");
   };
   // sayfa ilk render olduğunda konferans verilerini çekmek için useEffect kullandık
   useEffect(() => {
      setEvents();
   }, []);

   return (
      <Box m="20px">
         <Header title="Ders Anlatım Tarihleri" subtitle="Ders konferansları listelenmiştir" />

         <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
               <Typography variant="h5">Konferanslar</Typography>
               <List>
                  {currentEvents.slice(0, 5).map((event) => (
                     <ListItem
                        key={event.id}
                        onClick={() => handleEventClick(event.conference_url)}
                        sx={{
                           backgroundColor: colors.greenAccent[500],
                           margin: "10px 0",
                           borderRadius: "2px",
                        }}>
                        <ListItemText
                           primary={event.title}
                           secondary={
                              <Typography>
                                 {formatDate(event.start, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                 })}
                              </Typography>
                           }
                        />
                     </ListItem>
                  ))}
               </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
               <FullCalendar
                  height="75vh"
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                  headerToolbar={{
                     left: "prev,next today",
                     center: "title",
                     right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                  }}
                  initialView="dayGridMonth"
                  selectMirror={true}
                  dayMaxEvents={true}
                  eventClick={handleEventClick}
                  events={currentEvents}
               />
            </Box>
         </Box>
      </Box>
   );
};

export default Calendar;
