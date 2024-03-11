
// General Imports
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';

// Import for test with startStandAloneServer
// import { startStandaloneServer } from '@apollo/server/standalone';

// Imports for typedefs, resolvers and dataSources
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import MessageAPI from './datasources/message-api.js';

// Imports for test with ExpressMiddleware
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';

// Imports for enabling WebSockets
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Imports for Subscription
// import { PubSub } from 'graphql-subscriptions';

// Instance of PubSub class for working with subscriptions
// const pubsub = new PubSub();

// Initialize Express Server
export const app = express();
const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    // path: '/subscriptions',
    path: '/graphql'
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

// Disable CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method === 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })

// Create ApolloServer Instance

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
    
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
    ],
});

// Connection to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:masterkey1234@cluster0.dgzs0zh.mongodb.net/vibeline?retryWrites=true&w=majority`);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}

// Test with startStandaloneServer graphql function
// async function startApolloServer(){
//     const server = new ApolloServer({typeDefs, resolvers});

//     const { url } = await startStandaloneServer(server, {
//         context: async () => {
//           const { cache } = server;
    
//           return {
//             dataSources: {
//               messageAPI: new MessageAPI({ cache }),
//             },
//           };
//         }
//     });

//     console.log(`
//         🚀  Server is running
//         📭  Query at ${url}
//     `);
// }

async function startApolloServer(){
    await server.start();

    app.use('/graphql', cors(), express.json(), expressMiddleware(server, {
        context: async () => {
            const { cache } = server;
            return {
                dataSources: {
                    messageAPI: new MessageAPI({ cache })
                }
            }
        }
    }))

    const PORT = 4000;

    // app.listen(4000);
    httpServer.listen(PORT);
    console.log(`
        🚀  Server is running
        📭  Query at 4000
    `);
}

connectDB();
startApolloServer();