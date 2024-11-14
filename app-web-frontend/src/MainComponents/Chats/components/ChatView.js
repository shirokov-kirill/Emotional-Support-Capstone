import { useState } from "react";
import "./ChatView.css";
import MessageBubble from "./MessageBubble";
import { FaRegSmile, FaEllipsisH } from 'react-icons/fa';
import { GoPaperclip } from "react-icons/go";
import { HiOutlineMicrophone, HiEllipsisHorizontal } from "react-icons/hi2";

function ChatView(props) {
  let [message, setMessage] = useState("");
  
  return (
    <div className="chatsView">
      <div className="chatMessagesView">
        {props.messages.map(it => <MessageBubble from={it.senderId} text={it.content} time={it.created} isSender={props.userMap.get("me")[0] === it.senderId} imageUrl={props.userMap.get("other")[1]}/>)}
      </div>
      <div className="input-control-panel">
        <div className="message-input-container">
          <FaRegSmile className="input-icon emoji-icon" />
          <input type="text" placeholder="Type a message" className="message-input" />
        </div>
        <div className="input-icons-group">
          <HiOutlineMicrophone className="input-icon"/>
          <GoPaperclip className="input-icon"/>
          <HiEllipsisHorizontal className="input-icon" />
        </div>
      </div>
    </div>
  );
}

export default ChatView;