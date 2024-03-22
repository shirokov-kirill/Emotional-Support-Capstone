import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './EmojiSelectionButton.css';

function EmojiSelectionButton(props) {
    let [isOpen, setIsOpen] = useState(false);

    const toggleEmojiPicker = () => {
        setIsOpen(!isOpen)
      };

    return(
        <div className='emojiSelectionButton'>
            <button  onClick={toggleEmojiPicker}>
                <div style={{ backgroundColor: props.selectedEmoji, width: '20px', height: '20px' }}>
                    <em-emoji id={props.selectedEmoji}></em-emoji>
                </div>
            </button>
            {isOpen && <div className='picker'><Picker data={data} onEmojiSelect={(e) => {
                props.handleEmojiChange(e)
                toggleEmojiPicker()
            }} theme='light'/></div>}
        </div>
    )
}

export default EmojiSelectionButton