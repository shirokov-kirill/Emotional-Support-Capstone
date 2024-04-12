import Home from './Home/Home';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm';
import Calendar from './Calendar/Calendar';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';
import DataSharing from "./DataSharing/DataSharing";


const MainComponents = [
    { "label": "Home", "path": "/home", "element": Home },
    { "label": "Assessment", "path": "/assessment", "element": EmotionAssessmentForm },
    { "label": "Calendar", "path": "/calendar", "element": Calendar },
    { "label": "Feedback", "path": "/feedback", "element": Feedback },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList },
    { "label": "Sharing Data", "path": "/sharing", "element": DataSharing}
]


export default MainComponents;
