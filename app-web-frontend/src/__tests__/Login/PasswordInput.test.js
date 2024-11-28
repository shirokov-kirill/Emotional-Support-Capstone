import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '../../Login/Components/PasswordInput'; 

describe('PasswordInput', () => {
    let value;
    const onChange = jest.fn();
    const togglePasswordVisibility = jest.fn();

    beforeEach(() => {
        value = 'password';
    });

    test('renders input with password type by default', () => {
        render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={true}
                showPassword={false}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveAttribute('type', 'password');
    });

    test('renders input with text type when showPassword is true', () => {
        render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={true}
                showPassword={true}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveAttribute('type', 'text');
    });

    test('calls onChange function when input value changes', () => {
        render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={true}
                showPassword={false}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const input = screen.getByPlaceholderText('Password');
        fireEvent.change(input, { target: { value: 'newPassword' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('toggles password visibility when button is clicked', () => {
        render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={true}
                showPassword={false}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const button = screen.getByRole('button'); // Get the button by role
        fireEvent.click(button);
        expect(togglePasswordVisibility).toHaveBeenCalledTimes(1);
    });

    test('applies invalid styling when isValid is false', () => {
        const { container } = render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={false}
                showPassword={false}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveStyle('border: 1px solid lightcoral');
    });

    test('does not apply invalid styling when isValid is true', () => {
        const { container } = render(
            <PasswordInput
                value={value}
                onChange={onChange}
                placeholder={"Password"}
                isValid={true}
                showPassword={false}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );

        const input = screen.getByPlaceholderText('Password');
        expect(input).not.toHaveStyle('border: 1px solid lightcoral');
    });
});
