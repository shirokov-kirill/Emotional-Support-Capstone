import ChatsPage from "./Chats/ChatsPage";
import SmsIcon from "@mui/icons-material/Sms";
import Appointment from "../scenes/Appointment/Appointment";
import AppointmentIcon from "@mui/icons-material/Schedule";
import Feedback from "./Feedback/Feedback";
import FeedbackIcon from "@mui/icons-material/Feedback";
import FeedbackList from "./Feedback/FeedbackList";
import Share from "./Share/Share";
import ShareIcon from "@mui/icons-material/Share";
import NotificationList from "../Components/NotificationComponent/NotificationList";
import DataViewing from "./DataViewing/DataViewing";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MainProfile from "../scenes/Profile/MainProfile";
import ProfileIcon from "@mui/icons-material/Person2";

const DoctorComponents = [
    // { "label": "Dashboard", "path": "/dashboard", "element": Dashboard, "icon": <HomeIcon /> },
    // { "label": "Calendar", "path": "/calendar", "element": Calendar, icon: <CalendarIcon /> },
    // { "label": "Mood Assessment", "path": "/emotion_assessment", "element": EmotionAssessmentForm, icon: <CalendarIcon />},
    { "label": "Chats", "path": "/chats", "element": ChatsPage, icon: <SmsIcon /> },
    { "label": "Appointments", "path": "/appointment", "element": Appointment, icon: <AppointmentIcon /> },
    { "label": "Feedback", "path": "/feedback", "element": Feedback, icon: <FeedbackIcon /> },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList, icon: <FeedbackIcon /> },
    { "label": "Share", "path": "/share", "element": Share, icon: <ShareIcon /> },
    { "label": "Notifications list", "path": "/notifications", "element": NotificationList },
    // {"label": "Data Sharing", "path": "/datasharing", "element": DataSharing, icon: <IosShareIcon /> },
    {"label": "Data Viewing", "path": "/dataviewing", "element": DataViewing, icon: <CoPresentIcon /> },
    { "label": "Profile", "path": "/profile", "element": MainProfile, "icon": <ProfileIcon /> }
]


export default DoctorComponents;