import "./ChatBlock.css"

function ChatBlock(props) {
  return (
    <a onClick={() => props.handleClick(props.index)}>
      <div className={"chatBlock " + (props.index === props.position ? "active" : "")}>
        <img src={props.chat.get("url")}/> <b>{props.chat.get("author")}</b> <b>{props.chat.get("time")}</b>
        <br/>
      </div>
    </a>
  );
}

export default ChatBlock;