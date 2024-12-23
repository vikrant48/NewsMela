import React, { useState } from "react";
import "../assets/Subscribe.css";

const Subscribe = () => {

    const [showSubscribe, setSubscribe] = useState(false);

    const toggleSubscribe = () => {
        setSubscribe(!showSubscribe);
    };

    const plans = [
        {
            title: "Basic Plan",
            price: "$5/month",
            features: ["Real-Time News", "Weather Updates", "Mobile Optimization"],
            buttonLabel: "Choose Basic",
        },
        {
            title: "Medium Plan",
            price: "$10/month",
            features: [
                "Real-Time News",
                "Weather Updates",
                "Mobile Optimization",
                "Category Filters",
                "Dark Mode",
            ],
            buttonLabel: "Choose Medium",
        },
        {
            title: "Advanced Plan",
            price: "$20/month",
            features: [
                "Real-Time News",
                "Weather Updates",
                "Mobile Optimization",
                "Category Filters",
                "Dark Mode",
                "Currency Converter",
                "E-Paper Links",
            ],
            buttonLabel: "Choose Advanced",
        },
    ];

    return (
        <div className="subscribe-cnt">
            <button className="subscribe-btn" onClick={toggleSubscribe} >Subscribe</button>
            {showSubscribe && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={toggleSubscribe}>✖</button>
                        <h2 className="modal-heading" >Choose Your Plan</h2>
                        <div className="subscription-cards">
                            <div className="cards-container">
                                {plans.map((plan, index) => (
                                    <div className="subcard" key={index}>
                                        <h3>{plan.title}</h3>
                                        <p className="price">{plan.price}</p>
                                        <ul>
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                        <button>{plan.buttonLabel}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Subscribe;
