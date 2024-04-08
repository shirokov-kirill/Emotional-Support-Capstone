import "./ChatBlock.css"

function ChatBlock(props) {
  console.log(props.index, props.message, props.position, props.handleClick)
  return (
    <a onClick={() => props.handleClick(props.index)}>
      <div className={"chatBlock " + (props.index == props.position ? "active" : "")}>
        <img src={props.message.url}/> <b>{props.message.author}</b> <b>{props.message.time}</b>
        <br/>
      </div>
    </a>
  );
}

export default ChatBlock;