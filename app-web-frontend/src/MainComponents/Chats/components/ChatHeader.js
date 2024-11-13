import "./ChatHeader.css"

function ChatHeader(props) {
  
  return (
    <div className="chatHeader">
      <b className="header-name">{props.author}</b>
    </div>
  );
}

export default ChatHeader;