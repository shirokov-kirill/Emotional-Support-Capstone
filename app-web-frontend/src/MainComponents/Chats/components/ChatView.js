import { useState } from "react";
import "./ChatView.css";
import MessageBubble from "./MessageBubble";
import { FaRegSmile } from 'react-icons/fa';
import { GoPaperAirplane, GoPaperclip} from "react-icons/go";
import { HiOutlineMicrophone } from "react-icons/hi2";

function ChatView(props) {
  let [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log(message)
    props.onSendMessage(props.userMap.get("other")[0], message)
    setMessage("")
  }
  
  return (
    <div className="chatsView">
      <div className="chatMessagesView">
        {props.messages.map(it => <MessageBubble from={it.senderId} text={it.content} time={it.created} isSender={props.userMap.get("me")[0] === it.senderId} imageUrl={props.userMap.get("other")[1]}/>)}
      </div>
      <div className="input-control-panel">
        <div className="message-input-container">
          <FaRegSmile className="input-icon emoji-icon" />
          <input type="text" placeholder="Type a message" value={message} className="message-input" onChange={e => setMessage(e.target.value)} />
        </div>
        <div className="input-icons-group">
          <GoPaperAirplane className="input-icon" onClick={sendMessage}/>
          <HiOutlineMicrophone className="input-icon"/>
          <GoPaperclip className="input-icon"/>
        </div>
      </div>
    </div>
  );
}

export default ChatView;