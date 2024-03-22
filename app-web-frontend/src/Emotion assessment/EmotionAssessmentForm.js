
import { useState } from 'react';
import './EmotionAssessmentForm.css';
import ColorSelectionButton from '../reusables/Buttons/ColorSelectionButton/ColorSelectionButton';
import EmojiSelectionButton from '../reusables/Buttons/EmojiSelectionButton/EmojiSelectionButton';
import {SERVER_ADDRESS, prepareRequest} from '../setupInfo';
import Header from '../header/Header';

function EmotionAssessmentForm() {
  const selectedColorDefault = '#ffffff'
  const selectedEmojiDefault = '+1'

  let [selectedColor, setSelectedColor] = useState(selectedColorDefault);
  let [selectedEmoji, setSelectedEmoji] = useState(selectedEmojiDefault);

  const handleColorChange = (color) => {
    setSelectedColor(color['hex']);
  };

  const handleEmojiChange = (emoji) => {
    setSelectedEmoji(emoji['id']);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify({
      color: selectedColor,
      emoji: selectedEmoji,
      description: null,
      userId: null
    }))

    fetch(SERVER_ADDRESS + '/user-mood/create', 
    prepareRequest('POST', JSON.stringify({
      color: selectedColor,
      emoji: selectedEmoji,
      description: null,
      userId: null
    })))
    .then(response => {
      console.log(response)
      if(response.ok) {
        setSelectedColor(selectedColorDefault)
        setSelectedEmoji(selectedEmojiDefault)
      }
    })
    .catch(error => console.error('Error during POSTing data: ', error));
  };

  return (
    <div>
      <Header/>
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
    </div>
  );
}

export default EmotionAssessmentForm;