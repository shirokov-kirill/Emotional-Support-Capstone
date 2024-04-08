import { useState } from "react";
import "./ChatsList.css"
import ChatBlock from "./ChatBlock";
import ChatManagementPanel from "./ChatManagemantPanel";

function ChatsList(props) {
  let [searchSubstring, setSearchSubstring] = useState("")
  
  return (
    <div className="chatsList">
      <input className="chatsSearch" placeholder="Persons, Groups, Chats" onInput={it => {
        console.log(it.target)
        setSearchSubstring(it.target.value)
        }}></input>
      <div className="chatsListView">
        {
        props.messages.map((message, i) => [i, message])
        .filter(it => it[1].author.includes(searchSubstring))
        .map(it => <ChatBlock message={it[1]} index={it[0]} position={props.position} handleClick={props.onPositionChange}/>)
        }

      </div>
      <ChatManagementPanel className="managementPanel"/>
    </div>
  );
}

export default ChatsList;