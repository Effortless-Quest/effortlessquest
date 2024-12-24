import React, { useState } from "react";
import "./companion.css";

const AiCompanion: React.FC = () => {
  // State for conversation history and user input
  const [conversationHistory, setConversationHistory] = useState<
    { sender: "User" | "AI"; text: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");

  // Function to send message to API
  const sendMessage = async () => {
    if (!userInput.trim()) return; // Ignore empty input

    // Get the current time of day
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let timeOfDay = "day";
    if (hours >= 5 && hours < 12) {
      timeOfDay = "morning";
    } else if (hours >= 12 && hours < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    // Update conversation history with user's message
    setConversationHistory((prev) => [
      ...prev,
      { sender: "User", text: userInput },
    ]);

    // Check if the user asked for the time
    if (userInput.toLowerCase().includes("time")) {
      const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      const aiResponse = `The current time is ${formattedTime}`;

      // Update conversation history with AI's time response
      setConversationHistory((prev) => [
        ...prev,
        { sender: "AI", text: aiResponse },
      ]);
      setUserInput(""); // Clear input field
      return;
    }

    try {
      // Send API request with full conversation history
      const response = await fetch("http://127.0.0.1:8000/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input: userInput,
          conversation_history: conversationHistory.map(
            (message) => `${message.sender}: ${message.text}`
          ),
          time_of_day: timeOfDay, // Send the current time of day
        }),
      });

      const data = await response.json();

      // Parse and update conversation history with AI response
      setConversationHistory((prev) => [
        ...prev,
        ...data.conversation_history
          .slice(prev.length) // Only add new messages
          .map((line: string) => {
            const [sender, text] = line.split(": ", 2);
            return { sender: sender as "User" | "AI", text };
          }),
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
    } finally {
      setUserInput(""); // Clear input field
    }
  };

  return (
    <section className="companion-card-container">
      <div className="container mx-auto px-8">
        <div className="chat-box">
          {/* Chat messages */}
          <div className="chat-history">
            {conversationHistory.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  message.sender === "User" ? "user-bubble" : "ai-bubble"
                }`}
              >
                <strong>{message.sender}: </strong>
                {message.text}
              </div>
            ))}
          </div>

          {/* User input */}
          <div className="chat-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="chat-send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCompanion;
