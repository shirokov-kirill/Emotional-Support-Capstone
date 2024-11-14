import { useState } from "react";
import "./ChatsPage.css"
import ChatsList from "./components/ChatsList";
import ChatView from "./components/ChatView";
import ChatHeader from "./components/ChatHeader";

function ChatsPage() {
  const chatsInitial = [
    {
      user: {
        id: 1,
        url: "https://via.placeholder.com/30",
        author: "Alexandra Vasnetsova"
      },
      messages: [
        {
          from: 1, // userID of sender
          time: "11:04",
          text: "Hello!"
        },
        {
          from: 1, 
          time: "11:05",
          text: "How are you?"
        },
        {
          from: 0, // my userID
          time: "11:07",
          text: "Good morning! Fine, thank you, Leonard!"
        }
      ]
    },
    {
      user: {
        id: 2,
        url: "https://via.placeholder.com/30",
        author: "Sheldon"
      },
      messages: [
        {
          from: 2, // userID of sender
          time: "11:04",
          text: "Hello!"
        },
        {
          from: 2, 
          time: "11:05",
          text: "How are you?"
        },
        {
          from: 0, // my userID
          time: "11:07",
          text: "Good morning! Fine, thank you, Sheldon!"
        }
      ]
    },
    {
      user: {
        id: 3,
        url: "https://via.placeholder.com/30",
        author: "Radjesh"
      },
      messages: [
        {
          from: 3, // userID of sender
          time: "11:04",
          text: "Hello!"
        },
        {
          from: 3, 
          time: "11:05",
          text: "How are you?"
        },
        {
          from: 0, // my userID
          time: "11:10",
          text: "Good morning! Fine, thank you, Radjesh!"
        }
      ]
    }
  ]
  let [position, setPosition] = useState(0);
  let [chats, setChats] = useState(chatsInitial)
  const myId = 0;
  const myIcon = "https://via.placeholder.com/30";

  const onSendMessage = (message) => {
    // TODO server connection
    let chatsCopy = [...chats]
    chatsCopy[position].messages.push({from: myId, time: "now", text: message})
    console.log(chatsCopy)
    setChats(chatsCopy)
  }

  return (
    <div className="chatsPage">
      <ChatHeader author={position !== -1 ? chats[position].user.author : "Select chat"}/>
      <div className="chatsLayout">
        <ChatsList className="row-item" messages={chats.map(it => new Map(
          [
            ["url", it.user.url],
            ["author", it.user.author],
            ["time", it.messages.length > 0 ? it.messages[it.messages.length - 1].time : "now"]
          ]))
        } position={position} onPositionChange={(i) => {
          setPosition(i)
          }}/>
        <ChatView className="row-item" userMap={new Map([["me", [myId, myIcon]], ["other", [chats[position].user.id, chats[position].user.url]]])} messages={chats[position].messages} onSendMessage={onSendMessage}/>
      </div>
    </div>
  );
}

export default ChatsPage;