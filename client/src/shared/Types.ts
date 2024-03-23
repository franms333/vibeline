export type User = {
    id:string;
    username:string;
    profilePic:string;
  }
  
export type Conversation = {
    id:string;
    users: User[];
    createdAt:string;
    updatedAt:string;
    lastMessage: Message;
    unreadMessages?: number
}

export type Message = {
    id: string,
    conversationId: string,
    userId: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

export type LastMessage = {
    id:string,
    text:string,
    createdAt:string
}

export type SubscribedConversation = {
    id:string,
    lastMessage: LastMessage
}