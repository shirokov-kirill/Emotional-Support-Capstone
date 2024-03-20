
import { useState } from 'react';
import './EmotionAssessmentScreen.css';
import ColorSelectionButton from '../reusables/ColorSelectionButton';

function EmotionAssessmentScreen() {
  let [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleColorChange = (color) => {
    console.log(color)
    setSelectedColor(color['hex']);
  };

  return (
    <ColorSelectionButton selectedColor={selectedColor} handleColorChange={handleColorChange}/>
  );
}

export default EmotionAssessmentScreen;