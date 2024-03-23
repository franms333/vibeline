import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "../services/ServiceCalls";
import useConversationStore from "../store/conversation-store";
import ChatBubble from "./ChatLog/ChatBubble";
import ChatLogHeader from "./ChatLog/ChatLogHeader";
import MessageTextArea from "./ChatLog/MessageTextArea";
import { Conversation, Message } from "../shared/Types";



// Query for getting all messages on clicked conversation
const FETCH_MESSAGES = GET_MESSAGES();

// Subscription for when a new message is added
const SUBSCRIPTION = MESSAGE_SUBSCRIPTION();

const ChatLog = () => {
    // Apollo Client Hook for invoking writeQuery function
    const client = useApolloClient();

    const activeChat = useConversationStore((state) => state.activeChat);

    const loggedUser = useConversationStore((state) => state.loggedUser);
    const conversations = useConversationStore((state) => state.conversations);
    const setConversations = useConversationStore((state) => state.setConversations);

    // Local state for the chatlog of the currently active chat
    const [log, setLog] = useState<Message[]>([]);     
    // const [conversationID, setConversationID] = useState(activeChat?.id);     

    // Query for getting messages
    const {data, subscribeToMore} = useQuery(
        FETCH_MESSAGES,
        { variables: { conversationId: activeChat!.id } }
    );

    // UseEffect for handling WebSocket subscriptions
    useEffect(()=>{
        if(data){
            setLog(data.Messages);
        }

        // Unsubscribe to MessageAdded Subscription
        const unsubscribe = subscribeToMore({
            document:SUBSCRIPTION,
            updateQuery: (previousQueryResult, { subscriptionData }) => {
                const newMessage = subscriptionData.data.messageAdded;

                const chatListItem = conversations.find((conversation)=>conversation.id === newMessage.conversationId);
                const index = conversations.indexOf(chatListItem!);

                let unreadMessages:number = 0;

                if(newMessage.userId !== loggedUser && newMessage.conversationId !== activeChat?.id) {
                    if(chatListItem!.unreadMessages) {
                        unreadMessages = chatListItem!.unreadMessages + 1;
                    } else {
                        unreadMessages = 1;
                    }
                }

                const updatedChat:Conversation = {
                    ...chatListItem!,
                    lastMessage: {
                        ...chatListItem!.lastMessage,
                        text: newMessage.text,
                        createdAt: newMessage.createdAt
                    },
                    unreadMessages
                };

                let conversationsCopy = conversations;

                conversationsCopy[index] = updatedChat;

                setConversations(conversationsCopy);

                client.cache.writeQuery({
                    query: FETCH_MESSAGES,
                    data: {
                      Messages: [newMessage, ...previousQueryResult.Messages]
                    },
                    variables: {
                        conversationId: subscriptionData.data.messageAdded.conversationId
                    }
                });
            }
        });

        return () => {
            unsubscribe();
        }
    },[data]);
    

    return ( 
        <section className='flex flex-col'>
            <ChatLogHeader/>

            <div 
            className="grow flex flex-col h-1 overflow-y-auto px-20 pb-4
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                
                {log.length > 0 && log.map((message)=>(
                    <ChatBubble 
                    key={message.id}
                    message={message}/>
                ))}
                
            </div>
             
            <MessageTextArea/>
        </section>
    );
}
 
export default ChatLog;