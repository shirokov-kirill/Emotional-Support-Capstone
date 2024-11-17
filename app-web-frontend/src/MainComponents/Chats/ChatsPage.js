import {useCallback, useLayoutEffect, useState} from "react";
import "./ChatsPage.css"
import ChatsList from "./components/ChatsList";
import ChatView from "./components/ChatView";
import ChatHeader from "./components/ChatHeader";
import axios, { AxiosHeaders } from "axios";
import { getUserAuthToken } from "../../reusables/utils/AuthToken";

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
          senderId: 1, // userID of sender
          created: "11:04",
          content: "Hello!"
        },
        {
          senderId: 1,
          created: "11:05",
          content: "How are you?"
        },
        {
          senderId: 0, // my userID
          created: "11:07",
          content: "Good morning! Fine, thank you, Leonard!"
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
          senderId: 2, // userID of sender
          created: "11:04",
          content: "Hello!"
        },
        {
          senderId: 2,
          created: "11:05",
          content: "How are you?"
        },
        {
          senderId: 0, // my userID
          created: "11:07",
          content: "Good morning! Fine, thank you, Sheldon!"
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
          senderId: 3, // userID of sender
          created: "11:04",
          content: "Hello!"
        },
        {
          senderId: 3,
          created: "11:05",
          content: "How are you?"
        },
        {
          senderId: 0, // my userID
          created: "11:10",
          content: "Good morning! Fine, thank you, Radjesh!"
        }
      ]
    }
  ]

  let [position, setPosition] = useState(0);
  let [chats, setChats] = useState(chatsInitial)
  const myId = 0;
  const chatId = 5;
  const myIcon = "https://via.placeholder.com/30";


  const fetchChat = useCallback( async () => {
    const authToken = getUserAuthToken()
    try {
      let response = await axios.get(`http://localhost:8080/messages/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const result = {
        messages: response.data.reverse(),
        user: chatsInitial[0].user
      }
      setChats([result])
    } catch(error) {
      console.error('Failed to retrieve messages', error);
    }
  }, [])

  useLayoutEffect(() => {
    fetchChat()
  }, [fetchChat]);



  const onSendMessage = async (message) => {
    // TODO server connection
    const messageObj = {
      chatId: 5,
      senderId: myId,
      content: message
    }
    const authToken = getUserAuthToken()

    try {
      const response = await axios.post('http://localhost:8080/messages', messageObj, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log(response)
      if (response.status === 200) {
        console.log('Message successfully sent')
        console.log(response.data);
        await fetchChat()
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }
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