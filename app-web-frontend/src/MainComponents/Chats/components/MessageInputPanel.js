import { useState } from "react"
import "./MessageInputPanel.css"

function MessageInputPanel(props) {
    let [message, setMessage] = useState("")

    const onFormSubmit = e => {
        console.log(e)
        e.preventDefault()
        props.onSendMessage(message)
        setMessage("")
        console.log(message)
    }


    return(
        <div className="messageInputPanel">
            <form onSubmit={onFormSubmit}>
                <input style={{width: 50 + 'vw', marginLeft: 30 + 'px'}} onInput={e => setMessage(e.target.value)} value={message}/>
                <input type="submit" hidden />
            </form>
            <div style={{marginRight: 20 + 'px'}}>
                <button>Microphone</button>
                <button>Attach</button>
                <button>More</button>
            </div>
        </div>
    )
}

export default MessageInputPanel