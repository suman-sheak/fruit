import React from 'react';
import '../styles/About.css';

function About() {
    return (
        <div className="about-container">
            <h1>About Fruit.ai</h1>
            <p>
                Welcome to <strong>Fruit.ai</strong>, your personal health manager powered by AI. At Fruit.ai,
                we believe that managing your health should be as simple as managing your day-to-day activities.
                We use cutting-edge artificial intelligence to help you monitor your diet, track your fitness goals,
                and improve your overall health and well-being.
            </p>

            <p>
                Our platform offers a suite of tools including a translator for health-related terms,
                a chatbot to assist you with queries, and a FAQ page to answer common questions.
                We are committed to making health management accessible and personalized for everyone.
            </p>

            <h2>Our Mission</h2>
            <p>
                At Fruit.ai, our mission is to empower individuals to take control of their health
                through the use of innovative AI technologies. We strive to provide tools that are not
                only effective but also easy to use, so you can focus on what really matters - living a healthier life.
            </p>

            <h2>Our Vision</h2>
            <p>
                We envision a world where everyone has the ability to manage their health seamlessly
                with the help of intelligent tools. Our goal is to continue evolving our platform
                to meet the needs of our users, ensuring that staying healthy is no longer a chore,
                but a simple and enjoyable part of life.
            </p>

            <h2>Get in Touch</h2>
            <p>
                If you have any questions or want to learn more about how Fruit.ai can help you, feel free to
                <a href="/contact"> contact us</a>. We are always here to help!
            </p>
        </div>
    );
}

export default About;
