import React, { useState } from 'react';
import './Feedback.css';
import mailIcon from './Icons/mail.svg';
import nameIcon from './Icons/name.svg';
import companyIcon from './Icons/company.svg';
import phoneIcon from './Icons/phone.svg';
import InputWithIcon from './Components/InputIcon';
import RatingBar from './Components/RatingBar';

export function Feedback() {
    const [rating, setRating] = useState(0); 
    const [additionalFeedback, setAdditionalFeedback] = useState('');
    const [name, setUsername] = useState('');
    const [mail, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');

    return (
        <div className="App">
            <div className="feedback-container">
                <form>
                        <div className="horizontal-form">
                        <div className="form-column first-column">
                            <label>Name</label>
                            <InputWithIcon
                                placeholder="Your name"
                                iconSrc={nameIcon}
                                fun={setUsername}
                                type="text"
                            />
                        </div>
                        <div className="form-column">
                            <label htmlFor="email">Email</label>
                            <InputWithIcon
                                placeholder="Email address"
                                iconSrc={mailIcon}
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
                                fun={setPhone}
                                type="tel"
                            />
                        </div>
                        <div className="form-column">
                            <label htmlFor="company">Company</label>
                            <InputWithIcon
                                placeholder="Company name"
                                iconSrc={companyIcon}
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
                            value={additionalFeedback} 
                            onChange={e => setAdditionalFeedback(e.target.value)}
                            placeholder="Enter your additional feedback here" 
                        />
                    </div>
                        <div className="checkbox-container">
                            <input type="checkbox" id="privacy"/>
                            <label htmlFor="privacy">I agree to the privacy policy</label>
                        </div>
                        <button type="submit">Submit feedback</button>
                </form>
            </div>
        </div>

      );
}


export default Feedback;