import React from 'react'
import '../assets/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className='footerStyles'>
            <div className='footerContainer'>
                <div className='footerLeft'>
                    <h3>NEWSMELA</h3>
                    <p>Stay updated with the latest news from around the world.</p>
                </div>
                <div className='footerCenter'>
                    <ul className='footerLinks'>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Subscription</a></li>
                    </ul>
                    <ul className='footerLinks'>
                        <li><a href="#">Archives</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">map</a></li>
                    </ul>
                    <ul className='footerLinks'>
                        <li><a href="#">Advertise with us </a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">T&C </a></li>
                        <li><a href="#">Cookies</a></li>
                    </ul>
                </div>
                <div className='footerRight'>
                    <div className='socialLinks'>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>
                    <div className='footerCredits'>
                        <p>&copy; 2024 NewsMela. All rights reserved.</p>
                        <p>Designed & Developed by <strong>Vikrant Chauhan</strong>.</p>
                        <p><a href="https://github.com/vikrant48" target="_blank" rel="noopener noreferrer">Check My GitHub</a></p>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer