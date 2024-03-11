type ChatBubbleProps = {
    userType:String,
    message:String
}

const ChatBubble = ({userType, message}:ChatBubbleProps) => {
    return ( 
        <div className={`chat ${userType === 'logged' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
                <time className="text-xs opacity-50 mx-1">12:46</time>
            </div>
            <div className="chat-bubble bg-gray-100 text-black">{message}</div>
            {/* <div className="chat-footer opacity-50">
                Seen at 12:46
            </div> */}
        </div>
    );
}
 
export default ChatBubble;