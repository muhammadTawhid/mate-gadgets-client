import "./Login.css"
import React, { useContext, useRef, useState } from 'react';
import Header from '../Header/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { loginContext } from "../../App";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(loginContext);
    const [signUp, setSignUp] = useState(true)
    const [signUpMessage, setSignUpMessage] = useState({})
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
                const user = result.user;
                const newUser = {...loggedInUser}
                newUser.name = user.displayName;
                newUser.email = user.email;
                newUser.img = user.photoURL;
                setLoggedInUser(newUser)
            }).catch((error) => {
                console.log(error);
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
                    console.log(user, "sign up success")
                    if(user){
                        setSignUpMessage({message: "Sign Up Successful" , success:true})
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                   if(errorMessage === "Firebase: Error (auth/email-already-in-use)."){
                    console.log("same email")
                    setSignUpMessage({message: "This email already in use", success:false})
                   }
                });
        }
    }

    // update user
    const updateUserDetails = (data) =>{
        updateProfile(auth.currentUser, {
        displayName: data.firstName,
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
        // An error occurred
        // ...
        });
    }

    // sign in with email and password
    const handleSignIn = (data) => {
        if (data.email && data.password) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user, "sign in success")
                    const newUser = {...loggedInUser}
                    newUser.name = user.displayName;
                    newUser.email = user.email;
                    setLoggedInUser(newUser)
                })
                .catch((error) => {
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
                                            required
                                            type="text" className="form-control" placeholder="First Name *" />
                                        {errors.firstName && <small className="err-message">{errors.firstName?.message}</small>}
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
                                    {signUp && <small style={signUpMessage.success? {color:"green"} : {color:"red"}}>{signUpMessage.message}</small>}
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