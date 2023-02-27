import logo from './logo.svg';
import './normal.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button">
          <svg class="h-4 w-4" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" >
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" fill="none" stroke-width="2" />
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" fill="none" stroke-width="2" />
          </svg>

          New Chat
        </div>
      </aside >
      <section class="chat-section">

      </section>
    </div >
  );
}

export default App;
