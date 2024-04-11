import React from 'react';
import "./RatingBar.css"
import emptyStar from '../Icons/emptyStar.svg';
import filledStar from '../Icons/filledStar.svg';

const RatingBar = ({rating, fun}) => {
    return (
        <div className="rating-container">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className="star"
                    onClick={() => fun(index + 1)}
                >
                    <img 
                        src={index < rating ? filledStar : emptyStar} 
                        alt={index < rating ? 'Filled Star' : 'Empty Star'} 
                    />
                </span>
            ))}
        </div>
    );
};

export default RatingBar;