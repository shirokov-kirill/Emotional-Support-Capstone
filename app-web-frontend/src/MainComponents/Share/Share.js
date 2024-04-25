import React, {useState} from 'react';
import './Share.css';
import mailIcon from './Icons/mail.svg';
import InputWithIcon from './Components/InputIcon';
import Popup from "./Components/Popup";
import axios from 'axios';
import {SERVER_ADDRESS} from "../../setupInfo";


export function Share() {
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState(null);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!privacyAccepted) {
            setHasError(true);
            return
        } else {
            setHasError(false);
        }
        const shareData = {
            email,
            comment,
        };
        console.log(shareData);

        try {
            const response = await axios.post(SERVER_ADDRESS + '/share', shareData);
            if (response.status === 200) {
                console.log('Data shared successfully')
                console.log(response.data);
                setComment('');
                setEmail('');
                setShowSuccessPopup(true);
            }

        } catch (error) {
            console.error('Error during data share', error);
            setShowErrorPopup(true);
        }
    }

    return (
        <div className="App">
            <div className="share-container">
                <form onSubmit={handleSubmit}>
                    <div className="horizontal-form">
                        <div className="form-column first-column">
                            <label htmlFor="email">Recipient's Email</label>
                            <InputWithIcon
                                placeholder="Email address"
                                iconSrc={mailIcon}
                                val={email}
                                fun={setEmail}
                                type="email"
                            />
                        </div>
                    </div>
                    <div className="form-column">
                        <label htmlFor="additionalInfo">Additional Message:</label>
                        <textarea
                            id="additionalMessage"
                            rows="4"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="The recipient will recieve you message"
                        />
                    </div>
                    <div className={`checkbox-container ${hasError ? 'has-error' : ''}`}>
                        <input
                            type="checkbox"
                            className={hasError ? 'checkbox-error' : ''}
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        />
                        <label>I agree that the specified address will get access to my account information</label>
                    </div>
                    <button type="submit">Share</button>
                </form>
            </div>
            <Popup show={showSuccessPopup} handleClose={() => setShowSuccessPopup(false)}>
                <h2>Your data was shared successfully!</h2>
                <p>We appreciate you using our application.</p>

                <p>if you encounter difficulties or have any suggestions, do not forget to leave us a feedback. Feedback is very important to us!</p>
            </Popup>

            <Popup show={showErrorPopup} handleClose={() => setShowErrorPopup(false)}>
                <h2>Oops, Something Went Wrong!</h2>
                <p>We're sorry, but there was an error processing your request.
                    Please try again later.</p>
            </Popup>
        </div>

    );
}


export default Share;