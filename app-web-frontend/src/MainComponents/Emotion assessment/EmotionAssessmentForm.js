
import { useState } from 'react';
import './EmotionAssessmentForm.css';
import ColorSelectionButton from '../../reusables/Buttons/ColorSelectionButton/ColorSelectionButton';
import EmojiSelectionButton from '../../reusables/Buttons/EmojiSelectionButton/EmojiSelectionButton';
import {SERVER_ADDRESS, prepareRequest} from '../../setupInfo';
import {getUserAuthToken} from "../../reusables/utils/AuthToken";

function EmotionAssessmentForm() {
  const selectedColorDefault = '#ffffff'
  const selectedEmojiDefault = '+1'

  let [selectedColor, setSelectedColor] = useState(selectedColorDefault);
  let [selectedEmoji, setSelectedEmoji] = useState(selectedEmojiDefault);

  const handleColorChange = (color) => {
    setSelectedColor(color['hex']);
  };

  const handleEmojiChange = (emoji) => {
    setSelectedEmoji(emoji['native']);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify({
      color: selectedColor,
      emoji: selectedEmoji,
      description: null,
      userId: null
    }))
    const authToken = getUserAuthToken();
    fetch(SERVER_ADDRESS + '/user-mood/create', 
    prepareRequest('POST', JSON.stringify({
      color: selectedColor,
      emoji: selectedEmoji,
      description: null,
      userId: null
    }), authToken))
    .then(response => {
      console.log(response)
      if(response.ok) {
        setSelectedColor(selectedColorDefault)
        setSelectedEmoji(selectedEmojiDefault)
      }
    })
    .catch(error => console.error('Error during POSTing data: ', error));

    localStorage.setItem('lastAssessmentDate', new Date().toDateString());
    console.log('Assessment submitted');
  };

  return (
    <div>
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