import "./ChatView.css"
import MessageView from "./MessageView";
import MessageInputPanel from "./MessageInputPanel"

function ChatView(props) {
  return (
    <div className="chatsView">
      <div className="chatMessagesView">
          {props.messages.map(it => <MessageView from={props.userMap.get(it.senderId)[0]} text={it.content} url={props.userMap.get(it.senderId)[1]}/>)}
      </div>
      <MessageInputPanel onSendMessage={props.onSendMessage}/>
    </div>
  );
}

export default ChatView;