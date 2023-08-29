import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import './Chatapp.css';

const ChatUI = () => {
    
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeChatIndex, setActiveChatIndex] = useState(null); 
  const chatContainerRef = useRef(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


  // const handleSendMessage = () => {
  //   if (inputText.trim() !== '') {
  //     // Add user message
  //     const userMessage = { text: inputText, isUser: true };
  //     setMessages([...messages, userMessage]);
  
  //     // Set a constant bot response
  //     const botResponse = { text: "Hello, world!", isUser: false };
  //     setMessages((prevMessages) => [...prevMessages, botResponse]);
  
  //     // Update chat history
  //     if (activeChatIndex !== null) {
  //       const updatedHistory = [...chatHistory];
  //       const updatedChat = updatedHistory[activeChatIndex];
  //       updatedChat.messages = [...updatedChat.messages, userMessage, botResponse];
  //       setChatHistory(updatedHistory);
  //     }
  
  //     setInputText('');
  //     scrollToBottom();
  //   }
  // };
  
  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      let userMessage = { text: inputText, isUser: true, isTable: false };
  
      if (inputText.startsWith('/')) {
        userMessage.isTable = true;
      }
  
      // Add user message
      setMessages([...messages, userMessage]);
  
      // Set bot response
      let botResponse = {
        text: "Hello, I'm a bot!",
        isUser: false,
        isTable: userMessage.isTable,
      };
  
      setMessages((prevMessages) => [...prevMessages, botResponse]);
  
      // Update chat history
      if (activeChatIndex !== null) {
        const updatedHistory = [...chatHistory];
        const updatedChat = updatedHistory[activeChatIndex];
        updatedChat.messages = [...updatedChat.messages, userMessage, botResponse];
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

 

  // const handleNewChat = () => {
  //   if (messages.length > 0) {
  //     const isChatInHistory = chatHistory.some(
  //       (entry) => JSON.stringify(entry.messages) === JSON.stringify(messages)
  //     );
  
  //     if (!isChatInHistory) {
  //     const firstUserMessage = messages.find((message) => message.isUser);
  //     const chatName = firstUserMessage.text.split(' ').slice(0, 5).join(' ');
  //     const newChat = { name: chatName, messages: messages };
  //       setChatHistory([...chatHistory, newChat]);
  //     }
  //   }
  
  //   setMessages([]); // Clear messages
  //   setActiveChatIndex(null); // Reset active chat index
  // };

  const handleNewChat = () => {
    if (messages.length > 0) {
      if (activeChatIndex !== null) {
        // Update existing chat from history
        const updatedHistory = [...chatHistory];
        updatedHistory[activeChatIndex].messages = messages;
        setChatHistory(updatedHistory);
      } else {
        // Create a new chat entry
        const firstUserMessage = messages.find((message) => message.isUser);
        const chatName = firstUserMessage.text.split(' ').slice(0, 5).join(' ');
        const newChat = { name: chatName, messages: messages };
        setChatHistory([...chatHistory, newChat]);
      }
    }
  
    setMessages([]); // Clear messages
    setActiveChatIndex(null); // Reset active chat index
  };
  
  

  
  // const handleSaveChat = () => {
  //   if (messages.length > 0) {
  //     const randomChatName = `Chat ${chatHistory.length + 1}`;
  //     const newChat = { name: randomChatName, messages: messages };
  //     setChatHistory([...chatHistory, newChat]);
  //     setMessages([]);
  //     setActiveChatIndex(null);
  //   }
  // };

  const handleChatHistoryClick = (index) => {
    setActiveChatIndex(index);
    setMessages(chatHistory[index].messages);
  };

  const handleDeleteChat = (index, event) => {
    event.stopPropagation(); 
  
    const updatedHistory = [...chatHistory];
    updatedHistory.splice(index, 1);
    setChatHistory(updatedHistory);
  
    if (activeChatIndex === index) {
      setMessages([]);
      setActiveChatIndex(null);
    }
  };
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  const handleLogout = () => {
    // Assuming you're using local storage for session management
    localStorage.removeItem('userToken'); 
    window.location.href = '/login';// Clear user token or session data
  };

  const toggleLogout = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  

  return (
    <div className={`chat-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
       <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="sidebar-header">
          <img src="dataease-logo.png" alt="Logo" className="logo" />
          <h1 className="title">RBI Credit Card compliance assistant</h1>
          <p className="subtitle">Ask your query about Credit Card compliance, we will get the best relevant compliance guideline from RBI</p>
        </div>
        <button className="new-chat-button" onClick={handleNewChat}>
          New Chat
        </button>
        {/* <button className="save-button" onClick={handleSaveChat}>
          Save
        </button> */}
        <button className="clear-chat-button" onClick={() => setMessages([])}>
          Clear Chat
        </button>
        <div className="chat-history">
        {chatHistory.slice().reverse().map((entry, index) => (
            <button
            key={index}
            className={`chat-history-entry ${
              index === activeChatIndex ? 'active' : ''
            }`
          }
            onClick={() => handleChatHistoryClick(index)}
          >
            {entry.name}
            {index === activeChatIndex && (
            <button
        className="delete-button"
        onClick={(event) => handleDeleteChat(index, event)} 
      >
        <FontAwesomeIcon icon={faTrash} />
        {/* Delete */}
      </button>
            )}
          </button>
           ))}
</div>

<hr className="divider" />
<div className="user-profile-container">
  <div className="user-profile">
          <button
            className="user-profile-button"
            type="button"
            onClick={toggleLogout}
          >
            <div className="user-profile-content">
              
              <div className="user-profile-name">User Profile</div>
              
            </div>
          
          </button>
          {isLogoutVisible && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
          </div>
          {/* <div className="user-profile-button"> */}
            {/* <button
              className={`mode-button ${isDarkMode ? 'dark' : 'light'}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}

<label className="mode-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider">
              <span className="mode-label light-label">Light </span>
              <span className="mode-label dark-label">Dark </span>
            </span>
          </label>
          
    
          {/* </div> */}
          
        </div>
      </div>
      <div className={`chat-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="chat-messages" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              {/* {message.isUser ? (
        message.text // Render user's message as is
      ) : (
        message.isTable ? ( // Render bot's response as a table for tabular messages
          <div className="bot-table-response">
            <table>
              <thead>
                <tr>
                  <th>Bot Response in Table</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hello, I'm a bot!</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="regular-response">
          <ReactMarkdown>{message.text}</ReactMarkdown> 
          </div>
        )
      )} */}
   

              {message.text}
            </div>
          ))}
           <div ref={scrollToBottom}></div>
        </div>
        <div className={`input-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
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