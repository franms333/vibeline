import { FiPaperclip } from "react-icons/fi";

const MessageTextArea = () => {
    return ( 
        <section className="flex items-center w-full border-t border-gray-200 py-4 px-4 mt-auto">
            <FiPaperclip className="text-3xl text-gray-500 mr-4 cursor-pointer transition-colors duration-100 hover:text-gray-600"/>
            <textarea 
            rows={3} 
            className="grow outline-none bg-gray-100 p-2 pl-4 rounded-2xl resize-none
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full" 
            placeholder="Type your message here..."/>
            <p className="text-xl text-[#27ae60] mx-4 cursor-pointer transition-colors duration-100 hover:text-[#52be80]">Send</p>
        </section>
    );
}
 
export default MessageTextArea;