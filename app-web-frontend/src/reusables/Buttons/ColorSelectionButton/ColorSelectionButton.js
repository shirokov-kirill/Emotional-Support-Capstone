import { useState } from 'react';
import { ChromePicker } from 'react-color';
import './ColorSelectionButton.css';

function ColorSelectionButton(props) {
    let [isOpen, setIsOpen] = useState(false);
    let [currentColor, setCurrentColor] = useState(props.selectedColor);

    const toggleColorPicker = () => {
        setIsOpen(!isOpen);
    };

    const handleColorChange = (color) => {
        setCurrentColor(color.hex); // Update the current color smoothly
        props.handleColorChange(color); // Notify parent component about the change
    };

    const handleSelect = () => {
        setIsOpen(false); // Close the color picker
    };

    return (
        <div className='colorSelectionButton'>
            <button onClick={toggleColorPicker}>
                <div
                    style={{
                        backgroundColor: props.selectedColor,
                        width: '20px',
                        height: '20px',
                    }}
                ></div>
            </button>
            {isOpen && (
                <div
                    className="colorPickerWrapper"
                    style={{ backgroundColor: currentColor }} // Dynamic background color
                >
                    {/* ChromePicker for color selection */}
                    <ChromePicker
                        color={currentColor}
                        onChange={handleColorChange}
                        disableAlpha={true}
                    />
                    {/* Select button at the bottom */}
                    <button onClick={handleSelect} className="selectButton">
                        Select
                    </button>
                </div>
            )}
        </div>
    );
}

export default ColorSelectionButton;
