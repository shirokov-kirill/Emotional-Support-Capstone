import Calendar from './Calendar/Calendar';
import ChatsPage from './Chats/ChatsPage';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';
import Notification from "../Components/NotificationComponent/Notification";
import HomeIcon from "@mui/icons-material/Cottage";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import SmsIcon from "@mui/icons-material/Sms";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ProfileIcon from "@mui/icons-material/Person2";
import AppointmentIcon from "@mui/icons-material/Schedule";
import Appointment from "../scenes/Appointment/Appointment";
import MainProfile from "../scenes/Profile/MainProfile";
import Dashboard from "../scenes/Dashboard";


const MainComponents = [
    { "label": "Dashboard", "path": "/dashboard", "element": Dashboard, "icon": <HomeIcon /> },
    { "label": "Calendar", "path": "/calendar", "element": Calendar, icon: <CalendarIcon /> },
    { "label": "Chats", "path": "/chats", "element": ChatsPage, icon: <SmsIcon /> },
    { "label": "Appointments", "path": "/appointment", "element": Appointment, icon: <AppointmentIcon /> },
    { "label": "Feedback", "path": "/feedback", "element": Feedback, icon: <FeedbackIcon /> },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList, icon: <FeedbackIcon /> },
    { "label": "Notifications list", "path": "/notifications", "element": Notification },
    { "label": "Profile", "path": "/profile", "element": MainProfile, "icon": <ProfileIcon /> }
]

export default MainComponents;
