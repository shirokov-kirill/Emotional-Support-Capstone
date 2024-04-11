import React, {useState} from 'react';
import './Feedback.css';
import mailIcon from './Icons/mail.svg';
import nameIcon from './Icons/name.svg';
import companyIcon from './Icons/company.svg';
import phoneIcon from './Icons/phone.svg';
import InputWithIcon from './Components/InputIcon';
import RatingBar from './Components/RatingBar';
import Popup from "./Components/Popup";
import axios from 'axios';
import {SERVER_ADDRESS} from "../../setupInfo";


export function Feedback() {
    const [rating, setRating] = useState(0);
    const [comment, setAdditionalFeedback] = useState('');
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState('');
    const [companyName, setCompany] = useState('');
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
        const feedbackData = {
            name,
            email,
            phone,
            companyName,
            rating,
            comment,
        };
        console.log(feedbackData);

        try {
            const response = await axios.post(SERVER_ADDRESS + '/feedback', feedbackData);
            if (response.status === 200) {
                console.log('Feedback sent successfully')
                console.log(response.data);
                setRating(0);
                setAdditionalFeedback('');
                setUsername('');
                setEmail('');
                setPhone('');
                setCompany('');
                setShowSuccessPopup(true);
            }

        } catch (error) {
            console.error('Error during feedback sending', error);
            setShowErrorPopup(true);
        }
    }

    return (
        <div className="App">
            <div className="feedback-container">
                <form onSubmit={handleSubmit}>
                    <div className="horizontal-form">
                        <div className="form-column first-column">
                            <label>Name</label>
                            <InputWithIcon
                                placeholder="Your name"
                                iconSrc={nameIcon}
                                val={name}
                                fun={setUsername}
                                type="text"
                            />
                        </div>
                        <div className="form-column">
                            <label htmlFor="email">Email</label>
                            <InputWithIcon
                                placeholder="Email address"
                                iconSrc={mailIcon}
                                val={email}
                                fun={setEmail}
                                type="email"
                            />
                        </div>
                    </div>
                    <div className="horizontal-form">
                        <div className="form-column first-column">
                            <label htmlFor="phone">Phone Number</label>
                            <InputWithIcon
                                placeholder="Phone Number"
                                iconSrc={phoneIcon}
                                val={phone}
                                fun={setPhone}
                                type="tel"
                            />
                        </div>
                        <div className="form-column">
                            <label htmlFor="company">Company</label>
                            <InputWithIcon
                                placeholder="Company name"
                                iconSrc={companyIcon}
                                val={companyName}
                                fun={setCompany}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="form-column">
                        <label> Rating</label>
                        <RatingBar rating={rating} fun={setRating}/>
                    </div>
                    <div className="form-column">
                        <label htmlFor="additionalFeedback">Additional Feedback:</label>
                        <textarea
                            id="additionalFeedback"
                            rows="4"
                            value={comment}
                            onChange={e => setAdditionalFeedback(e.target.value)}
                            placeholder="Enter your additional feedback here"
                        />
                    </div>
                    <div className={`checkbox-container ${hasError ? 'has-error' : ''}`}>
                        <input
                            type="checkbox"
                            className={hasError ? 'checkbox-error' : ''}
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        />
                        <label>I agree to the privacy policy</label>
                    </div>
                    <button type="submit">Submit feedback</button>
                </form>
            </div>
            <Popup show={showSuccessPopup} handleClose={() => setShowSuccessPopup(false)}>
                <h2>Thank you for your Feedback!</h2>
                <p>We appreciate you taking the time to help us improve our service. Each piece
                    of feedback we receive is valuable to us.</p>

                    <p>Thanks again for your support!</p>
            </Popup>

            <Popup show={showErrorPopup} handleClose={() => setShowErrorPopup(false)}>
                <h2>Oops, Something Went Wrong!</h2>
                <p>We're sorry, but there was an error processing your feedback.
                    Please try again later.</p>
            </Popup>
        </div>

    );
}


export default Feedback;