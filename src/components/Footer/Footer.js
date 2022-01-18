import "./Footer.css"
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faSnapchatGhost, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className="border-top my-5">
            <div className="footer-clean">
                <footer>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-4 col-md-3 item">
                                <h3>Brands</h3>
                                <ul>
                                    <li><a href="/">Microsoft</a></li>
                                    <li><a href="/">OnePlus</a></li>
                                    <li><a href="/">Apple</a></li>
                                    <li><a href="/">Remix</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-4 col-md-3 item">
                                <h3>Company</h3>
                                <ul>
                                    <li><a href="/">About us</a></li>
                                    <li><a href="/">Career</a></li>
                                    <li><a href="/">Find a store</a></li>
                                    <li><a href="/">Rules and terms</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-4 col-md-3 item">
                                <h3>Help</h3>
                                <ul>
                                    <li><a href="/">Contact Us</a></li>
                                    <li><a href="/">Money Refund</a></li>
                                    <li><a href="/orders">Order Status</a></li>
                                    <li><a href="/">Shipping Info</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 item social">
                                <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a href="https://web.facebook.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagramSquare} /></a>
                                <a href="https://www.snapchat.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSnapchatGhost} /></a>
                                <p className="copyright">Mate Gadgets © {(new Date().getFullYear())}</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;