import React, { useState, useEffect } from 'react';
import '../styles/FAQ.css';

function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Flag to indicate if we are editing
    const [currentFaq, setCurrentFaq] = useState(null); // To store FAQ being edited

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setIsLoading(true);
        try {
            // Simulated API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const dummyFaqs = [
                { id: 1, question: 'What are the benefits of eating fruits?', answer: 'Fruits are packed with vitamins, minerals, and fiber. They can help boost your immune system, improve digestion, and reduce the risk of chronic diseases.' },
                { id: 2, question: 'How many fruits should I eat daily?', answer: "It's recommended to eat at least 2 cups of fruits per day as part of a balanced diet." },
            ];
            setFaqs(dummyFaqs);
        } catch (err) {
            setError('Failed to fetch FAQs. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddFaq = () => {
        if (newQuestion && newAnswer) {
            const newFaq = {
                id: Date.now(),
                question: newQuestion,
                answer: newAnswer,
            };
            setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const handleDeleteFaq = (id) => {
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
    };

    const handleEditFaq = (faq) => {
        setIsEditing(true);
        setCurrentFaq(faq);
        setNewQuestion(faq.question);
        setNewAnswer(faq.answer);
    };

    const handleUpdateFaq = () => {
        if (currentFaq && newQuestion && newAnswer) {
            setFaqs((prevFaqs) =>
                prevFaqs.map((faq) =>
                    faq.id === currentFaq.id
                        ? { ...faq, question: newQuestion, answer: newAnswer }
                        : faq
                )
            );
            setIsEditing(false);
            setNewQuestion('');
            setNewAnswer('');
            setCurrentFaq(null);
        }
    };

    if (isLoading) {
        return <div className="faq-container">Loading FAQs...</div>;
    }

    if (error) {
        return <div className="faq-container">Error: {error}</div>;
    }

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqs.map((faq) => (
                    <div key={faq.id} className="faq-item">
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                        <button onClick={() => handleEditFaq(faq)}>Edit</button>
                        <button onClick={() => handleDeleteFaq(faq.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="add-faq">
                <h2>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</h2>
                <input
                    type="text"
                    placeholder="Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                />
                <textarea
                    placeholder="Answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                />
                {isEditing ? (
                    <button onClick={handleUpdateFaq}>Update FAQ</button>
                ) : (
                    <button onClick={handleAddFaq}>Add FAQ</button>
                )}
            </div>
        </div>
    );
}

export default FAQ;
