import React, { useState, useRef } from 'react';
import './Chatapp.css';

const ChatUI = () => {
    
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeChatIndex, setActiveChatIndex] = useState(null); // To keep track of active chat
  const chatContainerRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      // Add user message
      const userMessage = { text: inputText, isUser: true };
      setMessages([...messages, userMessage]);
  
      // Set a constant bot response
      const botResponse = { text: "Hello, world!", isUser: false };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      // Update chat history
      if (activeChatIndex !== null) {
        const updatedHistory = [...chatHistory];
        updatedHistory[activeChatIndex].messages.push({
          user: inputText,
          bot: botResponse,
        });
        setChatHistory(updatedHistory);
      }

      setInputText('');
      scrollToBottom();
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  // const handleNewChat = () => {
  //   const randomChatName = `Chat ${chatHistory.length + 1}`;
  //   const newChat = { name: randomChatName, messages: messages };
  //   setChatHistory([...chatHistory, newChat]);
  //   setMessages([]);
  //   setActiveChatIndex(chatHistory.length); // Set active chat to the newly created chat
  // };

  const handleNewChat = () => {
    setMessages([]); // Clear current messages
    setActiveChatIndex(null); // Reset active chat index
  };

  const handleSaveChat = () => {
    if (messages.length > 0) {
      const randomChatName = `Chat ${chatHistory.length + 1}`;
      const newChat = { name: randomChatName, messages: messages };
      setChatHistory([...chatHistory, newChat]);
      setMessages([]);
      setActiveChatIndex(null);
    }
  };

  const handleChatHistoryClick = (index) => {
    setActiveChatIndex(index);
    setMessages(chatHistory[index].messages);
  };

  const handleDeleteChat = (index) => {
    const updatedHistory = [...chatHistory];
    updatedHistory.splice(index, 1); // Remove the selected chat entry
    setChatHistory(updatedHistory);
  
    if (activeChatIndex === index) {
      setMessages([]); // Clear messages if the currently displayed chat is deleted
      setActiveChatIndex(null);
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="dataease-logo.png" alt="Logo" className="logo" />
          <h1 className="title">RBI Credit Card compliance assistant</h1>
          <p className="subtitle">Ask your query about Credit Card compliance, we will get the best relevant compliance guideline from RBI</p>
        </div>
        <button className="new-chat-button" onClick={handleNewChat}>
          New Chat
        </button>
        <button className="save-button" onClick={handleSaveChat}>
          Save
        </button>
        <button className="clear-chat-button" onClick={() => setMessages([])}>
          Clear Chat
        </button>
        <div className="chat-history">
          {chatHistory.map((entry, index) => (
            <button
            key={index}
            className={`chat-history-entry ${
              index === activeChatIndex ? 'active' : ''
            }`
          }
            onClick={() => handleChatHistoryClick(index)}
          >
            {entry.name}
            <button className="delete-button" onClick={() => handleDeleteChat(index)}>
        Delete
      </button>
          </button>
           ))}
</div>
      </div>
      <div className="chat-content">
        <div className="chat-messages" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask a question..."
            className="input-box"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;