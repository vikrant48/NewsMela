import React from 'react'
import '../assets/Footer.css'

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
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Subscription</a></li>
                    </ul>
                </div>
                <div className='footerRight'>
                    <div className='socialLinks'>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">Linkedin</a>
                    </div>
                    <p>&copy; 2024 NewsMela All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer