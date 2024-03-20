
import { useState } from 'react';
import './EmotionAssessmentForm.css';
import ColorSelectionButton from '../reusables/Buttons/ColorSelectionButton/ColorSelectionButton';
import EmojiSelectionButton from '../reusables/Buttons/EmojiSelectionButton/EmojiSelectionButton';

function EmotionAssessmentForm() {
  let [selectedColor, setSelectedColor] = useState('#ffffff');
  let [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color['hex']);
  };

  const handleEmojiChange = (emoji) => {
    console.log(emoji)
    setSelectedEmoji(emoji['id']);
  };

  return (
    <div className='emotionAssessmentForm'>
      <div className='emotionAssessmentFormParameterBox'>
        <div className='formRow'>
          <p>Color:</p>
          <ColorSelectionButton selectedColor={selectedColor} handleColorChange={handleColorChange}/>
        </div>
        <div className='formRow'>
          <p>Emoji:</p>
          <EmojiSelectionButton selectedEmoji={selectedEmoji} handleEmojiChange={handleEmojiChange}/>
        </div>
      </div>
      <button className='submitFormButton'>
        Submit
      </button>
    </div>
  );
}

export default EmotionAssessmentForm;