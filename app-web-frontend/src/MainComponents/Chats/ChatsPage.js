import {useCallback, useLayoutEffect, useState} from "react";
import "./ChatsPage.css"
import ChatsList from "./components/ChatsList";
import ChatView from "./components/ChatView";
import ChatHeader from "./components/ChatHeader";
import axios, { AxiosHeaders } from "axios";
import { getUserAuthToken } from "../../reusables/utils/AuthToken";

function ChatsPage() {
  const chatsInitial = []

  let [position, setPosition] = useState(0);
  let [chats, setChats] = useState(chatsInitial)
  let [myId, setMyId] = useState(-1);
  const myIcon = "https://via.placeholder.com/30";


  const fetchChat = useCallback( async () => {
    const authToken = getUserAuthToken()
    try {
      axios.get(`http://localhost:8080/users`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(response => {
        let uid = response.data.id;
        setMyId(uid)
        axios.get(`http://localhost:8080/chats/user/${uid}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          } 
        }).then(response1 => {
          let chatList = response1.data
          chatList.forEach(element => {
            axios.get(`http://localhost:8080/messages/${element.id}`, {
              headers: {
                'Authorization': `Bearer ${authToken}`
              }}).then(response2 => {
                const result = {
                  chatId: element.id,
                  user: {
                    id: response2.data.doctor.id,
                    url: `https://via.placeholder.com/30`,
                    author: response2.data.doctor.author
                  },
                  messages: response2.data.reverse()
                }
                setChats([chats + result])
              })
          });
        })
      })
    } catch(error) {
      console.error('Failed to retrieve messages', error);
    }
  }, [])

  useLayoutEffect(() => {
    fetchChat()
  }, [fetchChat]);



  const onSendMessage = async (sentToId, message) => {
    // TODO server connection
    let cid = chats.filter(it => it.user.id === sentToId)[0].chatId
    const messageObj = {
      chatId: cid,
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