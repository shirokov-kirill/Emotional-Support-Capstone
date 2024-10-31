import Calendar from './Calendar/Calendar';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm';
import ChatsPage from './Chats/ChatsPage';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';
import NotificationList from "../Components/NotificationComponent/NotificationList";
import HomeIcon from "@mui/icons-material/Cottage";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import SmsIcon from "@mui/icons-material/Sms";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ProfileIcon from "@mui/icons-material/Person2";
import AppointmentIcon from "@mui/icons-material/Schedule";
import ShareIcon from "@mui/icons-material/Share"
import CoPresentIcon from '@mui/icons-material/CoPresent';
import IosShareIcon from '@mui/icons-material/IosShare';
import Appointment from "../scenes/Appointment/Appointment";
import MainProfile from "../scenes/Profile/MainProfile";
import Dashboard from "../scenes/Dashboard";
import Share from "./Share/Share"
import DataSharing from "./DataSharing/DataSharing";
import DataViewing from "./DataViewing/DataViewing";
import NotificationsIcon from '@mui/icons-material/Notifications';

const MainComponents = [
    { "label": "Dashboard", "path": "/dashboard", "element": Dashboard, "icon": <HomeIcon /> },
    { "label": "Calendar", "path": "/calendar", "element": Calendar, icon: <CalendarIcon /> },
    { "label": "Mood Assessment", "path": "/emotion_assessment", "element": EmotionAssessmentForm, icon: <CalendarIcon />},
    { "label": "Chats", "path": "/chats", "element": ChatsPage, icon: <SmsIcon /> },
    { "label": "Appointments", "path": "/appointment", "element": Appointment, icon: <AppointmentIcon /> },
    { "label": "Feedback", "path": "/feedback", "element": Feedback, icon: <FeedbackIcon /> },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList, icon: <FeedbackIcon /> },
    { "label": "Share", "path": "/share", "element": Share, icon: <ShareIcon /> },
    { "label": "Notifications list", "path": "/notifications", "element": NotificationList, icon: <NotificationsIcon/> },
    {"label": "Data Sharing", "path": "/datasharing", "element": DataSharing, icon: <IosShareIcon /> },
    {"label": "Data Viewing", "path": "/dataviewing", "element": DataViewing, icon: <CoPresentIcon /> },
    { "label": "Profile", "path": "/profile", "element": MainProfile, "icon": <ProfileIcon /> }
]

export default MainComponents;
