import Home from "./Home/Home";
import EmotionAssessmentForm from "./Emotion assessment/EmotionAssessmentForm";
import Calendar from "./Calendar/Calendar";

const MainComponents = [
  { label: "Home", path: "/home", element: Home },
  { label: "Assessment", path: "/assessment", element: EmotionAssessmentForm },
  { label: "Calendar", path: "/calendar", element: Calendar },
];

export default MainComponents;
