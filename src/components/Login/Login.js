import "./Login.css"
import Header from '../Header/Header';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { loginContext } from "../../App";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(from, "location")

    const [loggedInUser, setLoggedInUser] = useContext(loginContext);
    const [signUp, setSignUp] = useState(true);
    const [signUpMessage, setSignUpMessage] = useState({});
    const [signInMessage, setSignInMessage] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password");
    const onSubmit = data => {
        if (signUp) {
            handleSignUp(data)
        }
        else {
            handleSignIn(data)
        }
    };

    // sign in with google
    initializeApp(firebaseConfig);
    const auth = getAuth();

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const newUser = { ...loggedInUser }
                newUser.name = user.displayName;
                newUser.email = user.email;
                newUser.img = user.photoURL;
                setLoggedInUser(newUser)
                getIdToken();
                handleSetNewLoggedInUser(newUser);
                if (newUser) {
                    navigate.replace(from);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // sign in with facebook
    const handleFacebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const newUser = { ...loggedInUser }
                newUser.name = user.displayName;
                newUser.email = user.email;
                newUser.img = user.photoURL;
                setLoggedInUser(newUser)
                getIdToken();
                handleSetNewLoggedInUser(newUser);
                if (newUser) {
                    navigate.replace(from);
                }
            })
            .catch((error) => {
                console.log(error, "error")
            });

    }

    // sign up with email and password
    const handleSignUp = (data) => {
        if (data.firstName && data.lastName && data.email && data.password) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateUserDetails(data)
                    if (user) {
                        setSignUpMessage({ message: "Sign Up Successful", success: true })
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
                        setSignUpMessage({ message: "This email already in use", success: false })
                    }
                });
        }
    }

    // update user
    const updateUserDetails = (data) => {
        updateProfile(auth.currentUser, {
            displayName: data.firstName,
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    // sign in with email and password
    const handleSignIn = (data) => {
        if (data.email && data.password) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newUser = { ...loggedInUser }
                    newUser.name = user.displayName;
                    newUser.email = user.email;
                    setLoggedInUser(newUser)
                    getIdToken();
                    if (user) {
                        setSignInMessage({ message: "Sign In Successful", success: true })
                    }
                    handleSetNewLoggedInUser(newUser);
                    if (newUser) {
                        navigate.replace(from);
                    }
                })
                .catch((error) => {
                    if (error.message === "Firebase: Error (auth/wrong-password).") {
                        setSignInMessage({ message: "Invalid email or password", success: false })
                    }
                    if (error.message === "Firebase: Error (auth/network-request-failed).") {
                        setSignInMessage({ message: "Something went to wrong check your internet connection and try again", success: false })
                    }
                });
        }
    }

    // verify id token
    const getIdToken = () => {
        auth.currentUser.getIdToken(true)
            .then(function (idToken) {
                localStorage.setItem("loggedInUserToken", idToken)
            }).catch(function (error) {
                console.log(error)
            });

    }

    // storing state to local storage
    const handleSetNewLoggedInUser = (newLoggedInUser) => {
        localStorage.setItem("newLoggedInUser", JSON.stringify(newLoggedInUser))
    }

    return (
        <div>
            <Header />
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>{signUp ? "Please, Sign up and make your life easy with our gadgets" : "Submit your login details to continue"} </p>
                        <div>
                            <button onClick={handleGoogleSignIn}>
                                <FontAwesomeIcon icon={faGoogle} /> Continue with google
                            </button>
                            <button onClick={handleFacebookSignIn}>
                                <FontAwesomeIcon icon={faFacebookF} />
                                Continue with facebook
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="row">
                            <div className="toggle-btn-div d-flex justify-content-between">
                                <button onClick={() => setSignUp(!signUp)} className={signUp ? "signUp-active" : "signUp"}>Signup</button>
                                <button onClick={() => setSignUp(!signUp)} className={signUp === false ? "signIn-active" : "signIn"}>Login</button>
                            </div>
                        </div>
                        <h3 className="register-heading">Submit your details for {signUp ? "sign up" : "login"}</h3>
                        <div className="row register-form d-flex justify-content-center">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-md-10 ">
                                    {signUp && <div className="form-group">
                                        <input
                                            style={errors.firstName && { borderBottom: "1px solid red" }}
                                            {...register("firstName", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z]/,
                                                    message: "First letter should be uppercase",
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Name contains only 20 characters",
                                                },
                                            })}
                                            onKeyUp={() => trigger("firstName")}
                                            type="text" className="form-control" placeholder="First Name *" />
                                        {errors.firstName && <small className="err-message">{errors.firstName?.message}</small>}
                                    </div>}
                                    {signUp && <div className="form-group">
                                        <input
                                            style={errors.lastName && { borderBottom: "1px solid red" }}
                                            {...register("lastName", { required: true })}
                                            type="text" className="form-control" placeholder="Last Name *" />
                                        {errors.lastName && <small className="err-message">This field is required</small>}

                                    </div>}
                                    <div className="form-group">
                                        <input
                                            style={errors.email && { borderBottom: "1px solid red" }}
                                            {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Invalid Email Address",
                                                },
                                            })}
                                            onKeyUp={() => trigger("email")}
                                            type="email" className="form-control" placeholder="Your Email *" />
                                        {errors.email && (
                                            <small className="err-message">{errors.email?.message}</small>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex">
                                            <input
                                                style={errors.password && { borderBottom: "1px solid red" }}
                                                {...register("password", {
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /\d+/g,
                                                        message: "Password must have at least one numeric value",
                                                    },
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters",
                                                    },
                                                })}
                                                onKeyUp={() => trigger("password")}
                                                type={showPass ? "text" : "password"} className="form-control" placeholder="Password *" />
                                            <span className="d-flex align-items-center">
                                                <button onClick={() => setShowPass(!showPass)} className="eye-btn">{showPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                                            </span>
                                        </div>
                                        {errors.password && (
                                            <small className="err-message">{errors.password?.message}</small>
                                        )}
                                    </div>
                                    <div className="form-group ">
                                        <div className="d-flex">
                                            <input
                                                style={errors.confirmPassword && { borderBottom: "1px solid red" }}
                                                {...register("confirmPassword", {
                                                    required: "This field is required",
                                                    validate: (value) =>
                                                        value === password.current || "This password don't match",
                                                })}
                                                onKeyUp={() => trigger("confirmPassword")}
                                                type={showConfirmPass ? "text" : "password"} className="form-control" placeholder="Confirm Password *" />
                                            <span className="d-flex align-items-center">
                                                <button onClick={() => setShowConfirmPass(!showConfirmPass)} className="eye-btn">{showConfirmPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                                            </span>
                                        </div>
                                        {errors.confirmPassword && (
                                            <small className="err-message">
                                                {errors.confirmPassword?.message}
                                            </small>
                                        )}
                                    </div>
                                    {signUp && <small style={signUpMessage.success ? { color: "green" } : { color: "red" }}>{signUpMessage.message}</small>}
                                    {signUp === false && <small style={signInMessage.success ? { color: "green" } : { color: "red" }}>{signInMessage.message}</small>}
                                    <div>
                                        {signUp ?
                                            <input type="submit" className="btnRegister" value="Sign Up" />
                                            :
                                            <input type="submit" className="btnRegister" value="Sign In" />
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;