import React from 'react';
import './Popup.css';

const Popup = ({ show, handleClose, children }) => {
    if(!show) {
        return null;
    }
    return (
        <div className="popup">
            <div className='popup-content'>
                {children}
                <button className="close-button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;