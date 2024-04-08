import { useState } from "react";
import "./ChatsPage.css"
import ChatsList from "./components/ChatsList";
import ChatView from "./components/ChatView";
import ChatHeader from "./components/ChatHeader";

function ChatsPage() {
  let [position, setPosition] = useState(-1);
  const messages = [
    {
      url: "https://via.placeholder.com/30",
      author: "Dr. Ivanov",
      time: "11:04"
    },
    {
      url: "https://via.placeholder.com/30",
      author: "Cooper",
      time: "11:04"
    },
    {
      url: "https://via.placeholder.com/30",
      author: "Dr. Ivanov",
      time: "11:04"
    }
  ]

  return (
    <div className="chatsPage">
      <ChatHeader author={position != -1 ? messages[position].author : "Select chat"}/>
      <div className="chatsLayout">
        <ChatsList className="row-item" messages={messages} position={position} onPositionChange={(i) => {
          console.log(i)
          setPosition(i)
          }}/>
        <ChatView className="row-item"/>
      </div>
    </div>
  );
}

export default ChatsPage;