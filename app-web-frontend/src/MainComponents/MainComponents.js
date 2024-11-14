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
import Appointment from "./Appointment/Appointment";
import MainProfile from "./Profile/MainProfile";
import PatientDashboard from "./Dashboard/PatientDashboard";
import HProviderDashboard from "./Dashboard/HProviderDashboard";
import Share from "./Share/Share"
import DataSharing from "./DataSharing/DataSharing";
import DataViewing from "./DataViewing/DataViewing";
import Settings from "./Settings/Settings";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from "@mui/icons-material/Settings";
import { Sidebar } from 'react-pro-sidebar';
import ComponentType from './ComponentType';
import AiRecs from "./AIRecs/AiRecs";
import {AiFillRobot} from "react-icons/ai";
import HPMainProfile from "./Profile/HPMainProfile";
import AiRecs from "./AIRecs/AiRecs";
import {AiFillRobot} from "react-icons/ai";


export const PatientMainComponents = [
    { "label": "Dashboard", "path": "/dashboard", "element": PatientDashboard, "icon": <HomeIcon />, "type": ComponentType.Sidebar},
    { "label": "Calendar", "path": "/calendar", "element": Calendar, icon: <CalendarIcon />, "type": ComponentType.Sidebar},
    { "label": "Mood Assessment", "path": "/emotion_assessment", "element": EmotionAssessmentForm, icon: <CalendarIcon />, "type": ComponentType.Sidebar},
    { "label": "Chats", "path": "/chats", "element": ChatsPage, icon: <SmsIcon />, "type": ComponentType.Sidebar},
    { "label": "Appointments", "path": "/appointment", "element": Appointment, icon: <AppointmentIcon />, "type": ComponentType.Sidebar },
    { "label": "Feedback", "path": "/feedback", "element": Feedback, icon: <FeedbackIcon />, "type": ComponentType.Sidebar },
    { "label": "Share", "path": "/share", "element": Share, icon: <ShareIcon />, "type": ComponentType.Sidebar },
    { "label": "Notifications list", "path": "/notifications", "element": NotificationList, icon: <NotificationsIcon/>, "type": ComponentType.Sidebar },
    { "label": "Data Sharing", "path": "/datasharing", "element": DataSharing, icon: <IosShareIcon />, "type": ComponentType.Sidebar },
    { "label": "AI", "path": "/recs", "element": AiRecs, "icon": <AiFillRobot/>, "type": ComponentType.Sidebar},
    { "label": "Settings", "path": "/settings", "element": Settings, icon: <SettingsIcon />, "type": ComponentType.Topbar},
    { "label": "Profile", "path": "/profile", "element": MainProfile, "icon": <ProfileIcon />, "type": ComponentType.Sidebar }
]

export const HealthProviderMainComponents = [
    { "label": "Dashboard", "path": "/hprovider/dashboard", "element": HProviderDashboard, "icon": <HomeIcon />, "type": ComponentType.Sidebar},
    { "label": "Chats", "path": "/chats", "element": ChatsPage, icon: <SmsIcon />, "type": ComponentType.Sidebar},
    { "label": "Appointments", "path": "/appointment", "element": Appointment, icon: <AppointmentIcon />, "type": ComponentType.Sidebar },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList, icon: <FeedbackIcon />, "type": ComponentType.Sidebar },
    { "label": "Notifications list", "path": "/notifications", "element": NotificationList, icon: <NotificationsIcon/>, "type": ComponentType.Sidebar },
    { "label": "Data Viewing", "path": "/dataviewing", "element": DataViewing, icon: <CoPresentIcon />, "type": ComponentType.Sidebar },
    { "label": "Settings", "path": "/settings", "element": Settings, icon: <SettingsIcon />, "type": ComponentType.Topbar},
    { "label": "Profile", "path": "/hpProfile", "element": HPMainProfile, "icon": <ProfileIcon />, "type": ComponentType.Sidebar }
]
