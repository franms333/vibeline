import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Conversation } from "../App";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "../services/ServiceCalls";
import ChatBubble from "./ChatLog/ChatBubble";
import ChatLogHeader from "./ChatLog/ChatLogHeader";
import MessageTextArea from "./ChatLog/MessageTextArea";

type ChatLogProps = {
    activeChat: Conversation,
    user: string
}

export type Message = {
    id: string,
    conversationId: string,
    userId: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

// Query for getting all messages on clicked conversation
const FETCH_MESSAGES = GET_MESSAGES();

// Subscription for when a new message is added
const SUBSCRIPTION = MESSAGE_SUBSCRIPTION();

const ChatLog = ({activeChat, user}:ChatLogProps) => {
    const client = useApolloClient();

    const [log, setLog] = useState<Message[]>([]);     

    // Query for getting messages
    const {data, subscribeToMore} = useQuery(
        FETCH_MESSAGES,
        { variables: { conversationId: activeChat.id } }
    );
    

    useEffect(()=>{
        if(data){
            setLog(data.Messages);
        }

        const unsubscribe = subscribeToMore({
            document:SUBSCRIPTION,
            updateQuery: (previousQueryResult, { subscriptionData }) => {
                const newMessage = subscriptionData.data.messageAdded;

                client.cache.writeQuery({
                    query: FETCH_MESSAGES,
                    data: {
                      ...previousQueryResult,
                      Messages: [newMessage, ...previousQueryResult.Messages]
                    },
                    variables: {
                        conversationId: subscriptionData.data.messageAdded.conversationId
                    }
                });
            }
        })

        return unsubscribe
    },[data]);
    

    return ( 
        <section className='flex flex-col'>
            <ChatLogHeader activeChat={activeChat}/>

            <div 
            className="grow flex flex-col h-1 overflow-y-auto px-20 pb-4
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                
                {log.length > 0 && log.map((message)=>(
                    <ChatBubble 
                    key={message.id}
                    activeChat={activeChat}
                    message={message}
                    loggedUser={user}/>
                ))}
                
            </div>
             
            <MessageTextArea 
            activeChatId={activeChat.id}
            user={user}/>
        </section>
    );
}
 
export default ChatLog;