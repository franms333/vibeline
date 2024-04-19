import { Navigate } from "react-router-dom";
import useConversationStore from "../store/conversation-store";
import { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({children}:ProtectedRouteProps) => {
    const loggedUser = useConversationStore((state) => state.loggedUser);
    if(!loggedUser){
        return <Navigate to='/login' replace/>
    }
    return children
}
 
export default ProtectedRoute;