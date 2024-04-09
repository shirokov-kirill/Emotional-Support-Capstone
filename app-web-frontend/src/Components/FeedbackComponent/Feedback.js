import React, { useState } from 'react';
import './Feedback.css';
import StarRatings from 'react-star-ratings';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        rating: 0,
        additionalFeedback: '',
        privacyPolicyAccepted: false  // Include privacy policy state
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const changeRating = (newRating) => {
        setFormData({ ...formData, rating: newRating });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.privacyPolicyAccepted) {
            alert('Please accept the privacy policy.');
            return;
        }
        console.log('Form data submitted', formData);
        // You can proceed with form submission logic here
    };

    return (
        <div className="feedback-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} />
                <input type="text" name="company" placeholder="Company" onChange={handleInputChange} />

                <StarRatings
                    rating={formData.rating}
                    starRatedColor="gold"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />

                <textarea 
                    name='additionalFeedback'
                    placeholder='If you have any additional feedback, please type it in here...'
                    onChange={handleInputChange}
                ></textarea>

                <div className="privacy-policy">
                    <input
                        type="checkbox"
                        id="privacy-policy"
                        name="privacyPolicyAccepted"
                        checked={formData.privacyPolicyAccepted}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="privacy-policy">I have read and accept the Privacy Policy.</label>
                </div>

                <button type="submit">Submit feedback</button>
            </form>
        </div>
    );
};

export default Feedback;