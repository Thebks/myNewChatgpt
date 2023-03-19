import logo from './logo.svg';
import './normal.css';
import './App.css';

import { ChatMessage, Loader } from './components';

import { useState, useEffect } from 'react';


const App = () => {

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);    // To load the loading Dots '...'  TEST CODE


  useEffect(() => {               // This useEffect clears chat.
    clearChat();
  }, [])


  useEffect(() => {                                  // This useEffect fetches models from the OpenAI and adds it to the select models tag.
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:3080/models");
        const data = await response.json();
        setModels(data.models);
      } catch (error) {
        console.log(error);
      }
    }
    fetchModels();
  }, []);

  // TEST CODE
  useEffect(() => {
    loadMessages();
  }, []);


  const loadMessages = () => {          // this function will prock the  loading Dots to load messages 
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // TEST CODE

  const clearChat = () => {                         // Clears Chat 
    setChatLog([]);
  }


  const handleSubmit = async (e) => {

    e.preventDefault();

    // setIsLoading(true);                 // TEST LINE

    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]

    setInput("");

    setChatLog(chatLogNew);

    const messages = chatLogNew.map(message => message.message).join("\n");

    try {
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messages, currentModel                       //chatLog.map(message => message.message).join("")
        })
      });
      const data = await response.json();
      setChatLog([...chatLogNew, { user: 'gpt', message: `${data.message}` }])
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
    // setIsLoading(false);               // TEST LINE

  };





  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button" onClick={clearChat}>
          <svg className="h-4 w-4" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" fill="none" strokeWidth="2" />
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" fill="none" strokeWidth="2" />
          </svg>

          New Chat
        </div>
        <div className="models">

          <select className="model-select" onChange={(e) => { setCurrentModel(e.target.value) }} required>
            <option value="" disabled selected>Please select your engine</option>
            {models.map(model => {
              return <option key={model.id} value={model.id}>{model.id}</option>
            })}
          </select>

        </div>

      </aside>
      <section className="chat-section">
        <div className="chat-log">
          {/* TEST CODE  */}
          {isLoading ? (
            <Loader />
          ) : (
            chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {/* TEST CODE  */}
          {/* {chatLog.map((message, index) => {
            return <ChatMessage key={index} message={message} />
          })} */}

        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-holder">
            <input rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-textarea"
              placeholder="Say Hello...">

            </input>
          </div>
        </form>
      </section>
    </div>
  );
}



export default App;
