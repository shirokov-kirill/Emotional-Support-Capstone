import React from 'react';
import "./InputIcon.css"

const InputWithIcon = ({ placeholder, iconSrc, fun, type}) => {
    return (
        <div className="input-with-icon">
            <input
                type={type}
                placeholder={placeholder}
                onChange={e => fun(e.target.value)}
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
