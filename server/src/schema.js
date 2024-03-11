import {gql} from 'graphql-tag';

export const typeDefs = gql`
    scalar DateTime
    type Query {
        # Query for loging a user
        login(username:String!): AuthData!,

        # Query for getting all messages in a conversation
        Messages(conversationId: ID!):[Message!]!

        # Query for getting all conversations where an user is involved
        Conversations(userId: ID!): [Conversation!]!
    }
    type Mutation {
        # Mutation for creating a user
        createUser(userInput:UserInput!):User,
        # Mutation for creating a conversation
        createConversation(conversationInput:ConversationInput!):Conversation,
        # Mutation for adding a message
        addMessage(messageInput:MessageInput!):Message
    }

    type Subscription {
        # Subscription when new message is added into conversation
        messageAdded: SubsMessage
    }

    type SubsMessage {
        text:String!,
        userId:String!,
        conversationId:String!
    }

    # Type for a Message
    type Message {
        id:ID!
        text:String!,
        userId:String!,
        conversationId:String!,
        createdAt: DateTime
        updatedAt: DateTime
    }

    # Type for a Conversation
    type Conversation {
        id:ID!
        users:[String]!,
        createdAt: DateTime
        updatedAt: DateTime
    }

    # Type for a User 
    type User {
        id:ID!
        username:String!
        profilePic:String
    }

    # Type for a logged in user
    type AuthData {
        userId: ID!
        username: String!
        token: String!
        tokenExpiration: Int!
    }

    # Input for CreateUser Mutation
    input UserInput {
        username:String!
        profilePic:String
    }

    # Input for CreateConversation Mutation
    input ConversationInput {
        users:[String]!
    }

    # Input for AddMessage Mutation
    input MessageInput {
        text:String!,
        userId:String!,
        conversationId:String!
    }
`;