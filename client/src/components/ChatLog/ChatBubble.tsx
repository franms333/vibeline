import useConversationStore from "../../store/conversation-store";
import { Message } from "../../shared/Types";

type ChatBubbleProps = {
    message:Message
}

const ChatBubble = ({message}:ChatBubbleProps) => {

    // Global State of Logged in User
    const loggedUser = useConversationStore((state) => state.loggedUser);
    // Global State of Active Chat
    const activeChat = useConversationStore((state) => state.activeChat);

    return ( 
        <div className={`chat ${message.userId !== loggedUser ? 'chat-start' : 'chat-end'}`}>
            {message.userId !== loggedUser &&
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="User Pic" src={activeChat!.users[0].profilePic} />
                </div>
            </div>
            }
            <div className="chat-header">
                <time className="text-xs opacity-50 mx-1">12:46</time>
            </div>
            <div className="chat-bubble bg-[--text-input-secondary] text-[--text-primary]">{message.text}</div>
        </div>
    );
}
 
export default ChatBubble;