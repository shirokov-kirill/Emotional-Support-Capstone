import React from 'react';
import "./InputIcon.css"

const InputWithIcon = ({ placeholder, iconSrc, val, fun, type}) => {
    return (
        <div className="input-with-icon">
            <input
                type={type}
                placeholder={placeholder}
                value={val}
                onChange={e => fun(e.target.value)}
                className="feedback-input"
            />
            <span className="icon">
                <img
                    src={iconSrc}
                    alt={'icon'}
                />
            </span>
        </div>
    );
};

export default InputWithIcon;
