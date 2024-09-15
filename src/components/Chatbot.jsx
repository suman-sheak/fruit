import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { text: inputMessage, sender: 'user' }]);
            setInputMessage('');

            // API call to get response
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBRK2M6VhooQ_4bp7rCliY6mqCDWHpAvcM',
                { contents: [{ parts: [{ text: inputMessage }] }] }
            );

            // Split and format the response to handle Markdown-like syntax
            const formattedResponse = formatResponse(
                response.data.candidates[0].content.parts[0].text
            );

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: formattedResponse,
                    sender: 'bot',
                },
            ]);
        }
    };

    // Function to format the response with HTML tags for headings, lists, and emphasis
    const formatResponse = (responseText) => {
        return responseText
            .replace(/##\s(.*?):/g, '<strong>$1:</strong>') // Bold headings like ## Best Horror Movie Recommendations:
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold for movie titles and emphasis
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics for description
            .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>') // Convert bullet points to list items
            .replace(/\n/g, '<br/>'); // Line breaks for new lines
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'
                            }`}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;