import "./ChatView.css";
import MessageBubble from "./MessageBubble";

function ChatView(props) {
  return (
    <div className="chatsView">
      <div className="chatMessagesView">
        {props.messages.map(it => <MessageBubble from={it.from} text={it.text} time={it.time} isSender={props.userMap.get("me")[0] === it.from} imageUrl={props.userMap.get("other")[1]}/>)}
      </div>
    </div>
  );
}

export default ChatView;