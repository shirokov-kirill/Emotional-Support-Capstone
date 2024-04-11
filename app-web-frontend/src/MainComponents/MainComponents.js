import Home from './Home/Home';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm';
import Calendar from './Calendar/Calendar';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';
import CriticalChanges from './CriticalChanges/CriticalChanges';


const MainComponents = [
    { "label": "Home", "path": "/home", "element": Home },
    { "label": "Assessment", "path": "/assessment", "element": EmotionAssessmentForm },
    { "label": "Calendar", "path": "/calendar", "element": Calendar },
    { "label": "Feedback", "path": "/feedback", "element": Feedback },
    { "label": "Feedback list", "path": "/feedbackList", "element": FeedbackList },
    { "label": "Changes", "path": "/criticalChanges", "element": CriticalChanges }
]


export default MainComponents;
