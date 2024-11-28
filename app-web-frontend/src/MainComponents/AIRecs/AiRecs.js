import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AiRecs.css';

const AIRecs = () => {
    const navigate = useNavigate();

    const handleButtonClick = (category) => {
        console.log(`You selected: ${category}`);
        if (category === 'Breathing exercises') {
            navigate('/breathing-exercises');
        } else {
            navigate(`/${category.toLowerCase().replace(" ", "-")}`);
        }
    };

    return (
        <div className="App">
            <div className="content-container">
                <h1>Choose about what would you like to ask AI:</h1>
                <div className="button-container">
                    <button className="grid-button" onClick={() => handleButtonClick('Breathing exercises')}>
                        Breathing exercises
                    </button>
                    <button className="grid-button" onClick={() => handleButtonClick('Category 2')}>
                        Category 2
                    </button>
                    <button className="grid-button" onClick={() => handleButtonClick('Category 3')}>
                        Category 3
                    </button>
                    <button className="grid-button" onClick={() => handleButtonClick('Category 4')}>
                        Category 4
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIRecs;
