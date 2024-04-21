import Home from './Home/Home';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm';
import Calendar from './Calendar/Calendar';
import ChatsPage from './Chats/ChatsPage';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';


const MainComponents = [
    { "label": "Home", "path": "/home", "element": Home },
    { "label": "Assessment", "path": "/assessment", "element": EmotionAssessmentForm },
    { "label": "Calendar", "path": "/calendar", "element": Calendar },
    { "label": "Chats", "path": "/chats", "element": ChatsPage },
    { "label": "Feedback", "path": "/feedback", "element": Feedback },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList }
]


export default MainComponents;
