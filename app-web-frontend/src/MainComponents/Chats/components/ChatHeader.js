import "./ChatHeader.css";
import { FiPhone } from "react-icons/fi";
import { GoDeviceCameraVideo } from "react-icons/go";
import { HiOutlineCog } from "react-icons/hi";

function ChatHeader(props) {
  
  return (
    <div className="chatHeader">
      <div className="header-left">
        <span className="status-dot" />
        <span className="header-name">{props.author}</span>
        <HiOutlineCog className="header-name-icon" />
      </div>

      <div className="header-icons">
        <FiPhone className="header-icon" />
        <GoDeviceCameraVideo className="header-icon" />
      </div>
  </div>
  );
}

export default ChatHeader;