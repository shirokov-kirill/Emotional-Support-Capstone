import React, {useState} from 'react';
import './Feedback.css';
import mailIcon from './Icons/mail.svg';
import nameIcon from './Icons/name.svg';
import companyIcon from './Icons/company.svg';
import phoneIcon from './Icons/phone.svg';
import InputWithIcon from './Components/InputIcon';
import RatingBar from './Components/RatingBar';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../setupInfo";

export function Feedback() {
    const [rating, setRating] = useState(0);
    const [comment, setAdditionalFeedback] = useState('');
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState('');
    const [companyName, setCompany] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
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
                alert('Submitted successfully');
                console.log('Feedback sent successfully')
                console.log(response.data);
                setRating(0);
                setAdditionalFeedback('');
                setUsername('');
                setEmail('');
                setPhone('');
                setCompany('');
                // todo not working
            }

        } catch (error) {
            console.error('Error during feedback sending', error);
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
                            value={comment}
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