import { gql } from "@apollo/client";

// QUERIES
export const GET_CONVERSATIONS = (userId:string) => {
    return gql`query {
            Conversations(userId: "${userId}") {
                id
                createdAt
                updatedAt
                users {
                    id
                    profilePic
                    username
                }
            }
        }
    `;
}
export const GET_MESSAGES = () => {
    return gql`
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
}
export const MESSAGE_SUBSCRIPTION = () => {
    return gql`
        subscription Subscription {
            messageAdded {
                text
                userId
                conversationId
            }
        }
    `;
}

// MUTATIONS
export const ADD_MESSAGE = () => {
    return gql`
        mutation Mutation($messageInput: MessageInput!) {
            addMessage(messageInput: $messageInput) {
                id
                conversationId
                userId
                text
                createdAt
                updatedAt
            }
        }
    `;
}