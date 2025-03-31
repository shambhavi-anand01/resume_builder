// import { useState } from "react";

// const Chat = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");
//   const [showChat, setShowChat] = useState(false);

//   const sendMessage = async () => {
//     if (!input) return;
//     try {
//       const res = await fetch("http://localhost:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const data = await res.json();
//       setResponse(data.response || "No response from AI");
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Chat Icon */}
//       <button
//         onClick={() => setShowChat(!showChat)}
//         style={{
//           padding: "10px 15px",
//           fontSize: "1rem",
//           backgroundColor: "#28a745",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//         }}
//       >
//         Chat with AI
//       </button>

//       {showChat && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "70px",
//             right: "20px",
//             width: "300px",
//             backgroundColor: "white",
//             color: "black",
//             borderRadius: "10px",
//             padding: "10px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <h3>AI Chat</h3>
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask me anything..."
//             style={{ width: "100%", height: "50px" }}
//           />
//           <button onClick={sendMessage} style={{ width: "100%", marginTop: "5px" }}>
//             Send
//           </button>
//           <p><strong>Response:</strong> {response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;



import { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history
  const [showChat, setShowChat] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]); // Add user message

    try {
      const res = await fetch("https://resume-builder-qcel.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "ai", text: data.response || "No response from AI" };
      setMessages([...messages, userMessage, aiMessage]); // Add AI response
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput(""); // Clear input after sending
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          padding: "10px 15px",
          fontSize: "1rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        Chat with AI
      </button>

      {/* Chat Box */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            width: "350px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>AI Chat</h3>

          {/* Chat Messages */}
          <div
            ref={chatBoxRef}
            style={{
              height: "250px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#f8f8f8",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: msg.role === "user" ? "#008080" : "#ffffff",
                  color: msg.role === "user" ? "white" : "black",
                  padding: "8px",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  textAlign: msg.role === "user" ? "right" : "left",
                  maxWidth: "80%",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            style={{
              width: "100%",
              height: "50px",
              marginTop: "10px",
              borderRadius: "5px",
              padding: "5px",
              border: "1px solid #ddd",
              resize: "none",
              fontFamily: "Roboto, sans-serif", // Roboto font applied here
              fontSize: "1rem",
            }}
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            style={{
              width: "100%",
              marginTop: "5px",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;

