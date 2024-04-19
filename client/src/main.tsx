import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split } from '@apollo/client';

// Imports for subscription
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ChatOverview from './pages/ChatOverview.tsx';
import useConversationStore from './store/conversation-store.ts';
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import NewChat from './pages/NewChat.tsx';

// URL for subscriptions calls
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

// URL for query and mutation calls
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/main",
    element: 
      <ProtectedRoute>
        <App />
      </ProtectedRoute>,
    errorElement: <ErrorPage />
  },  
  {
    path: "/newChat",
    element: 
      <ProtectedRoute>
        <NewChat />
      </ProtectedRoute>,
    errorElement: <ErrorPage />
  }  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
)
