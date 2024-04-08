import "./MessageView.css"

function MessageView(props) {
    console.log(props)
    return(
        <div className={props.from === "me" ? "right-align" : "left-align"}>
            {props.from === "me"
            ? <div className="messageViewBox">
                <MessageBlock text={props.text}/>
                <MessageIcon url={props.url}/>
            </div>
            : <div className="messageViewBox">
                <MessageIcon url={props.url}/>
                <MessageBlock text={props.text}/>
            </div>
            }
        </div>
    )
}

function MessageBlock(props) {
    return(
        <div className="messageBlock">
            <p>
                {props.text}
            </p>
        </div>
    )
}

function MessageIcon(props) {
    console.log(props.url)
    return(
        <div>
            <img src={props.url}></img>
        </div>
    )
}

export default MessageView