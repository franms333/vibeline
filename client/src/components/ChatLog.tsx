import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import ChatBubble from "./ChatLog/ChatBubble";
import ChatLogHeader from "./ChatLog/ChatLogHeader";
import MessageTextArea from "./ChatLog/MessageTextArea";
import { useEffect, useState } from "react";

type ChatLogProps = {
    activeChatId: String,
    user: String
}

type Message = {
    id: String,
    conversationId: String,
    userId: String,
    text: String,
    createdAt: String,
    updatedAt: String
}

const ChatLog = ({activeChatId, user}:ChatLogProps) => {
    const client = useApolloClient();

    const [log, setLog] = useState<Message[]>([]);
    const GET_MESSAGES = gql`
        query Query($conversationId: ID!) {
            Messages(conversationId: $conversationId) {
                id
                conversationId
                userId
                text
                createdAt
                updatedAt
            }
        }
    `;
    // Subscription
    const MESSAGE_SUBSCRIPTION = gql`
        subscription Subscription {
            messageAdded {
                text
                userId
                conversationId
            }
        }
    `;

    const {data, subscribeToMore} = useQuery(
        GET_MESSAGES,
        { variables: { conversationId: activeChatId } }
    );
    

    useEffect(()=>{
        if(data){
            console.log(data);
            setLog(data.Messages);
        }

        // debugger
        const unsubscribe = subscribeToMore({
            document:MESSAGE_SUBSCRIPTION,
            updateQuery: (previousQueryResult, { subscriptionData }) => {
                if (!subscriptionData.data) return previousQueryResult;
                const newMessage = subscriptionData.data.messageAdded;

                return Object.assign({}, previousQueryResult, {
                    Messages: {
                        Messages: [newMessage, ...previousQueryResult.Messages]
                    }
                });
            }
        })
        console.log(data);

        return unsubscribe
    },[data]);

    // Subscription
    

    return ( 
        <section className='flex flex-col'>
            {log.length > 0 && <ChatLogHeader />}

            <div 
            className="grow flex flex-col h-1 overflow-y-auto px-20 pb-4
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                
                {log.length > 0 && log.map((message)=>(
                    <ChatBubble 
                    message={message.text}
                    userType="logged"/>
                ))}

                {/* <ChatBubble 
                userType="logged"/>
                <ChatBubble 
                userType="other"/> */}
                
            </div>
            {log.length > 0 && 
            <MessageTextArea 
            activeChatId={activeChatId}
            user={user}/>}
        </section>
    );
}
 
export default ChatLog;