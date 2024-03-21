
import { useState } from 'react';
import './EmotionAssessmentForm.css';
import ColorSelectionButton from '../reusables/Buttons/ColorSelectionButton/ColorSelectionButton';
import EmojiSelectionButton from '../reusables/Buttons/EmojiSelectionButton/EmojiSelectionButton';

function EmotionAssessmentForm() {
  const selectedColorDefault = '#ffffff'
  const selectedEmojiDefault = '+1'

  let [selectedColor, setSelectedColor] = useState(selectedColorDefault);
  let [selectedEmoji, setSelectedEmoji] = useState(selectedEmojiDefault);

  const handleColorChange = (color) => {
    setSelectedColor(color['hex']);
  };

  const handleEmojiChange = (emoji) => {
    console.log(emoji)
    setSelectedEmoji(emoji['id']);
  };

  const onSubmit = () => {
    // TODO check data
    // TODO send data to server
    setSelectedColor(selectedColorDefault)
    setSelectedEmoji(selectedEmojiDefault)
  }

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
      <button className='submitFormButton' onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export default EmotionAssessmentForm;