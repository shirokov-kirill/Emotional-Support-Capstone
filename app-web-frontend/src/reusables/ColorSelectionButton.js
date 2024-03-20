import { useState } from 'react';
import { ChromePicker } from 'react-color'

function ColorSelectionButton(props) {
    let [isOpen, setIsOpen] = useState(false);

    const toggleColorPicker = () => {
        setIsOpen(!isOpen)
      };

    return(
        <div>
            <button onClick={toggleColorPicker}>
                <div style={{ backgroundColor: props.selectedColor, width: '20px', height: '20px' }}></div>
            </button>
            {isOpen && <ChromePicker color={props.selectedColor} onChangeComplete={props.handleColorChange} disableAlpha={true}/>}
        </div>
    )
}

export default ColorSelectionButton