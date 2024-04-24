import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from "../../setupInfo";
import './FeedbackList.css';

const mockFeedbackList = [{
    id: 123,
    name: 'Current feedback',
    email: 'example@gmail.com',
    phone: '+7 123 456 78 90',
    companyName: 'Company name',
    rating: '5',
    comment: 'Impressive. Very nice'
}]

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState(mockFeedbackList);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(SERVER_ADDRESS + '/feedback');
                setFeedbacks(response.data);
            } catch(error) {
                console.error(error);
            }
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