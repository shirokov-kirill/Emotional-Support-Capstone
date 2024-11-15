import React, { useState, useEffect, useRef } from 'react';
import './BreathingRecs.css';
import axios from "axios";
import {SERVER_ADDRESS} from "../../setupInfo";

const BreathingRecs = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Choose an option");
    const [buttonNames, setButtonNames] = useState([]);
    const [textValue, setTextValue] = useState("");

    const textareaRef = useRef(null);

    const answer = {
        "Diaphragmatic Breathing": "            1. Sit or lie down in a comfortable position.\n" +
            "            2. Place one hand on your chest and the other on your abdomen.\n" +
            "            3. Inhale deeply through your nose, ensuring your abdomen rises more than your chest.\n" +
            "            4. Exhale slowly through your mouth.\n" +
            "            5. Repeat for several minutes.",
        "Box Breathing": "            1. Sit upright in a comfortable chair.\n" +
            "            2. Inhale through your nose for a count of 4.\n" +
            "            3. Hold your breath for a count of 4.\n" +
            "            4. Exhale slowly through your mouth for a count of 4.\n" +
            "            5. Hold your breath again for a count of 4.\n" +
            "            6. Repeat the cycle several times.",
        "4-7-8 Breathing": "            1. Sit or lie down in a comfortable position.\n" +
            "            2. Inhale quietly through your nose for 4 seconds.\n" +
            "            3. Hold your breath for 7 seconds.\n" +
            "            4. Exhale completely through your mouth for 8 seconds.\n" +
            "            5. Repeat for a few cycles.",
        "Alternate Nostril Breathing": "            1. Sit comfortably with your spine straight.\n" +
            "            2. Close your right nostril with your right thumb.\n" +
            "            3. Inhale slowly through your left nostril.\n" +
            "            4. Close your left nostril with your right ring finger.\n" +
            "            5. Open and exhale slowly through your right nostril.\n" +
            "            6. Inhale through your right nostril.\n" +
            "            7. Close your right nostril and exhale through your left nostril.\n" +
            "            8. Repeat the cycle several times."
    }

    // Auto-resize the textarea based on its content
    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to auto
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to scrollHeight
        }
    };



    useEffect(() => {
        resizeTextarea(); // Resize the textarea when the content changes
    }, [textValue]); // Trigger resize when the text value changes

    const handleButtonClick = (buttonName) => {
        setTextValue(answer[buttonName]); // Set the selected button name as multi-line text
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update the selected option
        setIsPopupOpen(false); // Close the popup
    };

    const fetchButtonNames = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (token) {
                const bodyParameters = {
                    mood: selectedOption
                };
                const response = await axios.get(`${SERVER_ADDRESS}/user/ai/breath`, bodyParameters, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    const data = response.data
                    setButtonNames(Object.keys(data))
                }
            }
            setButtonNames(Object.keys(answer));
        } catch (error) {
            setButtonNames(Object.keys(answer)); // Assuming the response contains a 'buttonNames' array
            console.error("Error fetching button names:", error);
        }
    };

    const handleSubmit = () => {
        fetchButtonNames(); // Fetch the button names when Submit is clicked
    };

    return (
        <div className="horizontal-popup-window">
            <div className="horizontal-container">
                <p className="horizontal-text">Choose an emotion you want to deal with:</p>
                <div className="popup-container">
                    <div className="popup-display" onClick={togglePopup}>
                        {selectedOption}
                    </div>
                    {isPopupOpen && (
                        <div className="popup-menu">
                            <ul>
                                <li onClick={() => handleOptionClick('Anxiety')}>Anxiety</li>
                                <li onClick={() => handleOptionClick('Anger')}>Anger</li>
                                <li onClick={() => handleOptionClick('Fear')}>Fear</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit button */}
            <button className="submit-button" onClick={handleSubmit}>Get AI advice</button>

            <div className="horizontal-containerr">
                {/* Left Object: Scrollable list of buttons */}
                <div className="scrollable-list">
                    {buttonNames.length === 0 ? (
                        <p>No advices available. Click get AI advice to load.</p>
                    ) : (
                        buttonNames.map((buttonName, index) => (
                            <button
                                key={index}
                                className="list-button"
                                onClick={() => handleButtonClick(buttonName)}
                            >
                                {buttonName}
                            </button>
                        ))
                    )}
                </div>

                {/* Right Object: Text area */}
                <div className="text-field-container">
                    <textarea
                        ref={textareaRef}
                        className="text-field"
                        value={textValue} // The value is controlled by the selected button state
                        onChange={(e) => setTextValue(e.target.value)} // Optional if you want to allow text editing
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default BreathingRecs;
