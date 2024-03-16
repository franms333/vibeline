import { Conversation } from "../../App";
import { Message } from "../ChatLog";

type ChatBubbleProps = {
    activeChat:Conversation,
    loggedUser:String,
    message:Message
}

const ChatBubble = ({activeChat ,loggedUser, message}:ChatBubbleProps) => {
    return ( 
        <div className={`chat ${message.userId !== loggedUser ? 'chat-start' : 'chat-end'}`}>
            {message.userId !== loggedUser &&
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={activeChat.users[0].profilePic} />
                </div>
            </div>
            }
            <div className="chat-header">
                <time className="text-xs opacity-50 mx-1">12:46</time>
            </div>
            <div className="chat-bubble bg-gray-300 text-black">{message.text}</div>
        </div>
    );
}
 
export default ChatBubble;