import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { FiPaperclip } from "react-icons/fi";
import { ADD_MESSAGE } from "../../services/ServiceCalls";
import useConversationStore from "../../store/conversation-store";

const POST_MESSAGE = ADD_MESSAGE();

const MessageTextArea = () => {
    // Global State of Logged in User
    const loggedUser = useConversationStore((state) => state.loggedUser);
    // Global State of Active Chat
    const activeChat = useConversationStore((state) => state.activeChat);

    const messageRef = useRef<HTMLTextAreaElement>(null);
    
    const [addMessage, {data}] = useMutation(POST_MESSAGE);

    function handleNewMessage() {
        addMessage({ variables: { messageInput: {
                    text: messageRef.current?.value,
                    userId: loggedUser,
                    conversationId: activeChat?.id
                } 
            } 
        });

        messageRef.current!.value = '';
    }

    return ( 
        <section className="flex items-center w-full border-t border-gray-300 py-4 px-4 mt-auto">
            <FiPaperclip className="text-3xl text-gray-500 mr-4 cursor-pointer transition-colors duration-100 hover:text-gray-600"/>
            <textarea
            ref={messageRef} 
            onKeyDown={(event)=>{
                if(event.key === 'Enter' && !event.shiftKey){
                    event.preventDefault();
                    handleNewMessage()
                }
            }}
            rows={3} 
            className="grow outline-none bg-gray-100 p-2 pl-4 rounded-2xl resize-none
            focus:bg-gray-300
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full" 
            placeholder="Type your message here..."/>
            <p
            onClick={handleNewMessage} 
            className="text-xl text-[#27ae60] mx-4 cursor-pointer transition-colors duration-100 hover:text-[#52be80]">Send</p>
        </section>
    );
}
 
export default MessageTextArea;