import "./ChatView.css"
import MessageView from "./MessageView";

function ChatView(props) {
  return (
    <div className="chatsView">
        {props.messages.map(it => <MessageView from={props.userMap.get(it.from)[0]} text={it.text} url={props.userMap.get(it.from)[1]}/>)}
    </div>
  );
}

export default ChatView;