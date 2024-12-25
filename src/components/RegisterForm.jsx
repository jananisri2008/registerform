import React, { useState } from "react";
// import "./RegisterForm.css";

function RegisterForm() {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "password") {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[\W_]/.test(password)) strength += 25;
        return strength;
    };

    const validate = () => {
        const errors = {};
        if (!formValues.name) {
            errors.name = "Name is required.";
        }
        if (!formValues.email) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            errors.email = "Invalid email format.";
        }
        if (!formValues.password) {
            errors.password = "Password is required.";
        } else if (formValues.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (!formValues.confirmPassword) {
            errors.confirmPassword = "Please confirm your password.";
        } else if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            alert("Registration Successful!");
            setFormValues({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setPasswordStrength(0);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <small>{formErrors.name}</small>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <small>{formErrors.email}</small>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <div className="strength-meter">
                        <div style={{ width: `${passwordStrength}%` }}></div>
                    </div>
                    {formErrors.password && <small>{formErrors.password}</small>}
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    {formErrors.confirmPassword && <small>{formErrors.confirmPassword}</small>}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
