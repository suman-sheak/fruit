import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Fruit.ai</h1>
            <div className="services-grid">
                <Link to="/chatbot" className="service-card">
                    <h2>Chatbot</h2>
                    <p>Chat about fruits and their benefits</p>
                </Link>
                <Link to="/translator" className="service-card">
                    <h2>Translator</h2>
                    <p>Translate fruit names to regional languages</p>
                </Link>
                <Link to="/faq" className="service-card">
                    <h2>FAQ</h2>
                    <p>Frequently asked questions about fruits</p>
                </Link>
                <Link to="/about" className="service-card">
                    <h2>About</h2>
                    <p>Learn more about Fruit.ai</p>
                </Link>
            </div>
        </div>
    );
}

export default Home;