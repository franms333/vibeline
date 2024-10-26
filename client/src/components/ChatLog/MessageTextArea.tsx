import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoPaperPlane } from "react-icons/io5";
import { ADD_MESSAGE, CREATE_CONVERSATION, GET_CONVERSATIONS } from "../../services/ServiceCalls";
import useConversationStore from "../../store/conversation-store";
import { Conversation } from "../../shared/Types";

const POST_MESSAGE = ADD_MESSAGE();

const MessageTextArea = () => {
    // Zustand States and Global Functions
    const loggedUser = useConversationStore((state) => state.loggedUser);
    const activeChat = useConversationStore((state) => state.activeChat);
    const setActiveChat = useConversationStore((state) => state.setActiveChat);
    const setConversations = useConversationStore((state) => state.setConversations);

    // UseRef for textarea value
    const messageRef = useRef<HTMLTextAreaElement>(null);
    
    // GraphQL Client Hooks
    const [addMessage, {data}] = useMutation(POST_MESSAGE);
    // Function for creating a new conversation
    const CREATE_NEW_CONVERSATION = CREATE_CONVERSATION();
    const [createConversation, { data:dataConversation, error:errorConversation}] = useMutation(CREATE_NEW_CONVERSATION);
    // Query for fetching all conversations filtered by user
    const FETCH_CONVERSATIONS = GET_CONVERSATIONS(loggedUser?.id!);
    const [onFetchConversations, { data:ConversationsData, error:ConversationsError }] = useLazyQuery(
        FETCH_CONVERSATIONS, 
        {fetchPolicy:'no-cache'}
    );

    // Function for handling new messages in conversation
    async function handleNewMessage() {        
        // Case for when the active chat is a new temporary chat waiting for the first message
        if(!activeChat?.lastMessage){
            const usersId = activeChat?.users.map(user=>user.id);
            await createConversation({ variables: {
                    conversationInput: {
                        users: usersId
                    }
                } 
            });
            return;
        }

        // Case for chat with messages in log
        if( messageRef.current!.value !== ''){
            addMessage({ variables: { messageInput: {
                        text: messageRef.current?.value,
                        userId: loggedUser?.id,
                        conversationId: activeChat?.id
                    } 
                } 
            });
    
            messageRef.current!.value = '';
        }
    }

    // Function for handling the first message of a new chat
    async function handleNewFirstMessage(createdConversation:Conversation) {
        await addMessage({ variables: { messageInput: {
                    text: messageRef.current?.value,
                    userId: loggedUser?.id,
                    conversationId: createdConversation.id
                } 
            } 
        });
        await onFetchConversations();
    }

    // UseEffect for when the chat is created and the first message is passed
    useEffect(()=>{
        if(dataConversation){
            setActiveChat(dataConversation.createConversation);
            handleNewFirstMessage(dataConversation.createConversation);
        }
    }, [dataConversation]);

    // UseEffect for fetching all conversations to get the visible state of the previously temporary new chat
    useEffect(()=>{
        if(ConversationsData){
            setConversations(ConversationsData.Conversations);
            messageRef.current!.value = '';          
        }
    }, [ConversationsData]);

    return ( 
        <section className="flex items-center w-full border-t border-[--borders-secondary] py-4 px-4 mt-auto">
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
            className="grow outline-none bg-[--text-input-primary] p-2 pl-4 rounded-2xl resize-none
            focus:bg-[--text-input-secondary]
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full" 
            placeholder="Type your message here..."/>
            <p
            onClick={handleNewMessage} 
            className="text-xl text-[#27ae60] mx-4 cursor-pointer transition-colors duration-100 hover:text-[#52be80]
            md:block xs:hidden">Send</p>
            <IoPaperPlane 
            onClick={handleNewMessage} 
            className="text-3xl text-[#27ae60] ml-2 md:hidden xs:block"
            />
        </section>
    );
}
 
export default MessageTextArea;