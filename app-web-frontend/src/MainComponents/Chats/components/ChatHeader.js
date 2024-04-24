import "./ChatHeader.css"

function ChatHeader(props) {
  
  return (
    <div className="chatHeader">
      <b>{props.author}</b>
    </div>
  );
}

export default ChatHeader;