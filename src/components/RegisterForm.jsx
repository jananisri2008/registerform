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
        //name validation
        if (!formValues.name) {
            errors.name = "Name is required.";
        } else if(formValues.name.length<10){
            errors.name="Name must be at least 10 characters.";
        }
        //email validation
        if (!formValues.email) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            errors.email = "Invalid email format.";
        }
        //password validation
        if (!formValues.password) {
            errors.password = "Password is required.";
        } else if (formValues.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
        } else if(!/[A-Z]/.test(formValues.password)){
            errors.password="Password must contain at least one Uppercase letter.";
        }else if(!/[0-9]/.test(formValues.password)){
            errors.password="Password must contain at least one number.";
        }
        //confirm password validation
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
                        aria-describedby={formErrors.name?"name-error":null}
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


// import React, { useState } from "react";

// function RegisterForm() {
//     const [formValues, setFormValues] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [formErrors, setFormErrors] = useState({});
//     const [passwordStrength, setPasswordStrength] = useState(0);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

//         if (name === "password") {
//             setPasswordStrength(calculatePasswordStrength(value));
//         }

//         validateField(name, value);
//     };

//     const calculatePasswordStrength = (password) => {
//         let strength = 0;
//         if (password.length >= 6) strength += 25;
//         if (/[A-Z]/.test(password)) strength += 25;
//         if (/[0-9]/.test(password)) strength += 25;
//         if (/[\W_]/.test(password)) strength += 25;
//         return strength;
//     };

//     const validateField = (name, value) => {
//         const errors = { ...formErrors };

//         if (name === "name") {
//             if (!value) {
//                 errors.name = "Name is required.";
//             } else {
//                 delete errors.name;
//             }
//         }

//         if (name === "email") {
//             if (!value) {
//                 errors.email = "Email is required.";
//             } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//                 errors.email = "Invalid email format.";
//             } else {
//                 delete errors.email;
//             }
//         }

//         if (name === "password") {
//             if (!value) {
//                 errors.password = "Password is required.";
//             } else if (value.length < 6) {
//                 errors.password = "Password must be at least 6 characters.";
//             } else {
//                 delete errors.password;
//             }
//         }

//         if (name === "confirmPassword") {
//             if (!value) {
//                 errors.confirmPassword = "Please confirm your password.";
//             } else if (value !== formValues.password) {
//                 errors.confirmPassword = "Passwords do not match.";
//             } else {
//                 delete errors.confirmPassword;
//             }
//         }

//         setFormErrors(errors);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const errors = validate();
//         if (Object.keys(errors).length === 0) {
//             alert("Registration Successful!");
//             setFormValues({
//                 name: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//             });
//             setPasswordStrength(0);
//         } else {
//             setFormErrors(errors);
//         }
//     };

//     const validate = () => {
//         const errors = {};
//         if (!formValues.name) {
//             errors.name = "Name is required.";
//         }
//         if (!formValues.email) {
//             errors.email = "Email is required.";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
//             errors.email = "Invalid email format.";
//         }
//         if (!formValues.password) {
//             errors.password = "Password is required.";
//         } else if (formValues.password.length < 6) {
//             errors.password = "Password must be at least 6 characters.";
//         }
//         if (!formValues.confirmPassword) {
//             errors.confirmPassword = "Please confirm your password.";
//         } else if (formValues.password !== formValues.confirmPassword) {
//             errors.confirmPassword = "Passwords do not match.";
//         }
//         return errors;
//     };

//     return (
//         <div className="form-container">
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formValues.name}
//                         onChange={handleChange}
//                     />
//                     {formErrors.name && <small>{formErrors.name}</small>}
//                 </div>

//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formValues.email}
//                         onChange={handleChange}
//                     />
//                     {formErrors.email && <small>{formErrors.email}</small>}
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formValues.password}
//                         onChange={handleChange}
//                     />
//                     <div className="strength-meter">
//                         <div style={{ width: `${passwordStrength}%` }}></div>
//                     </div>
//                     {formErrors.password && <small>{formErrors.password}</small>}
//                 </div>

//                 <div className="form-group">
//                     <label>Confirm Password</label>
//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formValues.confirmPassword}
//                         onChange={handleChange}
//                     />
//                     {formErrors.confirmPassword && <small>{formErrors.confirmPassword}</small>}
//                 </div>

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }

// export default RegisterForm;
