import ChatBubble from "./ChatLog/ChatBubble";
import ChatLogHeader from "./ChatLog/ChatLogHeader";
import MessageTextArea from "./ChatLog/MessageTextArea";


const ChatLog = () => {
    return ( 
        <section className='flex flex-col'>
            <ChatLogHeader />

            <div className="grow flex flex-col h-1 overflow-y-auto px-20 pb-4
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">

                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/>
                
            </div>
            <MessageTextArea />
        </section>
    );
}
 
export default ChatLog;