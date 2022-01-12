import "./Login.css"
import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faMedal } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const [signUp, setSignUp] = useState(false)
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm();
    console.log(errors)
    const password = useRef({});
    password.current = watch("password");
    const onSubmit = data => {
        console.log(data)
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
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user, "google sign in")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    // sign up with email and password
    const handleSignUp = (data) => {
        if (data.firstName && data.lastName && data.email && data.password) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user, "sign up success")
                    data.firstName = ""
                    data.lastName = ""
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        }
    }

    // sign in with email and password
    const handleSignIn = (data) => {
        if (data.email && data.password) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user, "sign in success")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorMessage, "sign in")

                });
        }
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
                            <button><FontAwesomeIcon icon={faFacebookF} /> Continue with facebook</button>
                            <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Continue with google</button>
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
                                            {...register("firstName", { required: true })}
                                            type="text" className="form-control" placeholder="First Name *" />
                                        {errors.firstName && <small className="err-message">This field is required</small>}
                                    </div>}
                                    {signUp && <div className="form-group">
                                        <input
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
                                            required
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
                                                required
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
                                                required
                                                type={showPass ? "text" : "password"} className="form-control" placeholder="Confirm Password *" />
                                            <span className="d-flex align-items-center">
                                                <button onClick={() => setShowPass(!showPass)} className="eye-btn">{showPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                                            </span>
                                        </div>
                                        {errors.confirmPassword && (
                                            <small className="err-message">
                                                {errors.confirmPassword?.message}
                                            </small>
                                        )}
                                    </div>
                                    {signUp ? <input type="submit" className="btnRegister" value="Sign Up" />
                                        :
                                        <input type="submit" className="btnRegister" value="Sign In" />}
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