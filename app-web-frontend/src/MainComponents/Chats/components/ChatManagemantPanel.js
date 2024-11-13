import { useState } from "react";
import "./ChatManagementPanel.css";

function ChatManagementPanel({ onFormSubmit,  }) {
  let [message, setMessage] = useState("")
  return (
    <div className="chatManagementPanel">
        <button>Notifications</button>
        <button>Calls</button>
        <button>Contacts</button>

        <form onSubmit={onFormSubmit}>
              <input style={{width: 50 + 'vw', marginLeft: 30 + 'px'}} onInput={e => setMessage(e.target.value)} value={message}/>
              <input type="submit" hidden />
        </form>
        <div style={{marginRight: 20 + 'px'}}>
              <button>Microphone</button>
              <button>Attach</button>
              <button>More</button>
        </div>
    </div>
  );
}

export default ChatManagementPanel;