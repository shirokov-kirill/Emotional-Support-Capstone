import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from "../../setupInfo";
import './FeedbackList.css';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await axios.get(SERVER_ADDRESS + '/feedback');
            setFeedbacks(response.data);
        };
        fetchFeedbacks();
    }, []);

    return (
        <div className="feedback-list">
            {feedbacks.map(feedback => (
                <div key={feedback.id} className="feedback-item">
                    <p>Name: {feedback.name}</p>
                    <p>Email: {feedback.email}</p>
                    <p>Phone: {feedback.phone}</p>
                    <p>Company Name: {feedback.companyName}</p>
                    <p>Rating: {feedback.rating}</p>
                    <p>Comment: {feedback.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default FeedbackList;