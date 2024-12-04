import React, { useState, useEffect } from 'react';
import '../assets/Nav.css';
import UserAccount from './UserAccount';
import ThemeToggle from './Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const Nav = () => {
    const [showUserAccount, setShowUserAccount] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    const toggleUserAccount = () => {
        setShowUserAccount(!showUserAccount);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getFormattedDate = () => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <header className="navbar">
            {/* <div className="navbar-left">
                <button className="hamburger-btn" onClick={toggleMenu}>☰</button>
            </div>
            <div className="navbar-center">
                <h1 className="brand-title">NEWSMELA</h1>
            </div> */}
            {/* <div className={`navbar-content ${menuOpen ? 'show-menu' : ''}`}> */}
            <div className="navbar-left">
                <div className="nav-buttons">
                    <button className="icon-btn">☰ Explore</button>
                    <button className="icon-btn"> <FontAwesomeIcon icon={faHouse} style={{ color: "#fafafa", fontSize: "24px" }} /></button>
                </div>
                <span className="date">{getFormattedDate()} | {formatTime(time)}</span>
            </div>
            <div className="navbar-center">
                <h1 className="brand-title">NEWSMELA</h1>
            </div>
            <div className="navbar-right">
                <div className="nav-link">
                    <a href="https://poki.com/" className="icon-link">🎮 Games</a>
                    <a href="https://www.indiatoday.in/india" className="icon-link">📰 E-Paper</a>
                    <button className="signin-btn" onClick={toggleUserAccount}>Sign In</button>
                </div>
                <div className="subscribe-section">
                    <button className="subscribe-btn">Subscribe</button>
                    <ThemeToggle />
                </div>
            </div>
            {/* </div> */}


            {/* User Account Modal */}
            {showUserAccount && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={toggleUserAccount}>✖</button>
                        <UserAccount />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Nav;
