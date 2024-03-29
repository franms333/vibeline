import { useRouteError } from "react-router-dom";

type RouteError = {
    data: string;
    error: {
      columnNumber: number;
      fileName: string;
      lineNumber: number;
      message: string;
      stack: string;
    };
    internal: boolean;
    status: number;
    statusText: string;
  }

const ErrorPage = () => {
    const error = useRouteError() as RouteError;

    
    return ( 
        <div id="error-page" className="h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.error.message}</i>
            </p>
        </div>
    );
}
 
export default ErrorPage;