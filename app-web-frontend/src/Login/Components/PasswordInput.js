import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ value, placeholder,  onChange, isValid, showPassword, togglePasswordVisibility }) => {
    return (
        <div style={{ position: 'relative' }}>
            <input
                type={showPassword ? 'text' : 'password'} // Toggle visibility
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={isValid ? {} : { border: '1px solid lightcoral' }}
                className="custom-input" // Optional: use your custom styles
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#007bff',
                }}
            >
                {showPassword ? (
                    <VisibilityOff style={{ color: "gray" }} />
                ) : (
                    <Visibility style={{ color: "gray" }} />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;
