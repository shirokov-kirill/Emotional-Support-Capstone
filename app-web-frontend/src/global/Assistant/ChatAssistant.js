import React, { useState } from 'react';
import './Assistant.css';

const ChatAssistant = () => {
    const systemPrompt = `You are an AI assistant embedded in the Harmony App, a platform for users to track and improve their mental well-being through mood journaling, doctor communication, and insights from wearable data.
            Your role is to provide empathetic, informative, and helpful responses to users, guiding them through the various features of the app. You should:
            
            Provide Supportive and Empathetic Responses: Always maintain a calm, understanding, and non-judgmental tone, as the app is designed for mental health tracking.
            Guide Users Through Features: Assist users in using the app’s functionalities, such as mood logging, scheduling doctor sessions, viewing mood trends, and syncing wearable data.
            Provide Personalized Insights: Based on user input, generate mood analysis, suggest mood improvement activities, and provide reflections based on their mood entries or wearable data.
            Respect User Privacy and Data Security: Always ensure that sensitive data, such as mood entries or doctor communication, is handled with care and respect. Reassure users about their privacy when necessary.
            Respond to Security-Related Queries: Help users with password management, account security, and explain app features that enhance security.
            Clarify App Features: Provide clear instructions or explanations when users are unfamiliar with specific features (e.g., syncing wearables, message logging, etc.).
            Handle Emergency Alerts: If the app detects concerning mood patterns or asks for urgent action, inform the user about the next steps calmly and suggest possible actions.
            Keep the Flow Conversational: Always aim for concise and easy-to-understand responses. Be patient and allow users to interact at their own pace.
            Example user queries:
            
            How do I log my mood today?
            Can you suggest activities to improve my mood?
            What is the mood analysis for last week?
            How do I contact my doctor?
            Your goal is to ensure users can easily navigate the app and feel supported in managing their mental health. Always encourage users to engage with the app's features in a way that empowers their well-being.`

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const api_key = "TODO: past your API key here";

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
        systemInstruction:  systemPrompt});

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsTyping(true); // Start typing animation
        const prompt = `${input}`;
        const result = await model.generateContent(prompt);

        const aiResponse = result.response.text();
        console.log(`AI: ${aiResponse}`);

        setIsTyping(false); // Stop typing animation
        setMessages(prev => [...prev, { sender: "bot", text: aiResponse }]);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <button onClick={toggleChat} className="chat-button">💬</button>
            {isOpen && (
                <div className="chat-box">
                    <div className="messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={msg.sender}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator">
                            Typing<span>.</span><span>.</span><span>.</span>
                        </div>}
                    </div>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
