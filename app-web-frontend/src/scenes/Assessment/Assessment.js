import Header from "../../Components/Header";
import { Box } from "@mui/material";
import EmotionAssessmentForm from "../../MainComponents/Emotion assessment/EmotionAssessmentForm";

const Assessment = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header
          title="EmotionAssessment"
          subtitle="Welcome to your emotion aseessment form"
        ></Header>
      </Box>
      <Box>
        <EmotionAssessmentForm />
      </Box>
    </Box>
  );
};

export default Assessment;
