import { useState } from "react";
import "./ChatsList.css";
import ChatsListItem from "./ChatsListItem";

function ChatsList(props) {
  let [searchSubstring, setSearchSubstring] = useState("")
  
  return (
    <div className="chatsList">
      <div className="chats-frame">
        <input className="chatsSearch" placeholder="Persons, Groups, Chats" onInput={it => {
          setSearchSubstring(it.target.value)
          }}></input>
        <div className="chatsListView">
          {
          props.messages.map((chat, i) => [i, chat])
          .filter(it => it[1].get("author").includes(searchSubstring))
          .map(it => <ChatsListItem imageUrl={it[1].get("url")} name={it[1].get("author")} time={it[1].get("time")} selected={it[0] === props["position"]} onClick={() => {
            props.onPositionChange(it[0]);
          }}/>)
         }
        </div>
      </div>
      <div className="chats-list-control-panel">
        <button>Notifications</button>
        <button>Calls</button>
        <button>Contacts</button>
      </div>
    </div>
  );
}

export default ChatsList;