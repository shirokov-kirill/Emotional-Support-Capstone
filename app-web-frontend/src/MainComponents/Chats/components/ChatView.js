import { useState } from "react";
import "./ChatView.css";
import MessageBubble from "./MessageBubble";

function ChatView(props) {
  let [message, setMessage] = useState("");
  
  return (
    <div className="chatsView">
      <div className="chatMessagesView">
        {props.messages.map(it => <MessageBubble from={it.from} text={it.text} time={it.time} isSender={props.userMap.get("me")[0] === it.from} imageUrl={props.userMap.get("other")[1]}/>)}
      </div>
      <div className="chat-view-section">
        <form onSubmit={props.onFormSubmit}>
            <input style={{width: 50 + 'vw', marginLeft: 30 + 'px'}} onInput={e => setMessage(e.target.value)} value={message}/>
            <input type="submit" hidden />
        </form>
        <div style={{marginRight: 20 + 'px'}}>
            <button>Microphone</button>
            <button>Attach</button>
            <button>More</button>
        </div>
      </div>
    </div>
  );
}

export default ChatView;