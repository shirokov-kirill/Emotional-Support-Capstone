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
                    <p><b>Name</b>: {feedback.name}</p>
                    <p><b>Email</b>: {feedback.email}</p>
                    <p><b>Phone</b>: {feedback.phone}</p>
                    <p><b>Company Name</b>: {feedback.companyName}</p>
                    <p><b>Rating</b>: {feedback.rating}</p>
                    <p><b>Comment</b>: {feedback.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default FeedbackList;