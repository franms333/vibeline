import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../services/ServiceCalls";
import { useEffect, useRef, useState } from "react";
import { User } from "../shared/Types";
import { Combobox, Transition } from "@headlessui/react";
import { AiOutlineWechat } from "react-icons/ai";

const NewChat = () => {
    const inputRef = useRef<any>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<User[]>([]);

    const FETCH_USER = GET_USER();
    const [onFetchUser, { loading, data, error }] = useLazyQuery(
        FETCH_USER, 
        {variables: {username: inputValue !== '' && inputValue}, fetchPolicy:'no-cache'}
    );

    function handleChange(){
        setInputValue(inputRef.current?.value);
    }

    function handleBlur(){
        console.log('entró')
    }

    useEffect(()=>{     
        if(inputValue.trim() !== ''){
            onFetchUser();
        }
    },[inputValue]);

    useEffect(()=>{
        if(data){
            setSuggestions(data.SearchUser);
        }
        if(inputValue.trim() === ''){
            setSuggestions([]);
        }
    },[data])

    return ( 
        <section className="flex flex-col gap-5 px-2 items-center justify-center w-full h-screen">
            <h2 className="text-7xl mb-2 -mt-10 transition-all duration-500 animate-fade-up animate-once animate-ease-linear">Start a new chat!</h2>
            <p className="text-2xl mb-10">Enter an username and click on it to start a conversation</p>
            <Combobox nullable>
                <div className="relative grid w-full lg:max-w-md md:max-w-sm xs:max-w-xs">
                    <Combobox.Input
                    ref={inputRef}
                    placeholder="Enter a username..." 
                    className="input input-bordered input-success w-full justify-self-center lg:max-w-md md:max-w-sm xs:max-w-xs"
                    onChange={handleChange} />
                    
                    <Transition
                    enter="transition duration-700 ease-in-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    >
                        {suggestions.length !== 0 && 
                        <Combobox.Options 
                        className="absolute mt-2 w-full justify-self-center overflow-auto rounded-md bg-gray-800 py-1 text-white shadow-lg ring-1 ring-gray-500/5 focus:outline-none sm:text-sm
                        lg:max-w-md md:max-w-sm xs:max-w-xs"
                        >
                            {suggestions.length !== 0 && 
                                suggestions.map((user) => (
                                <Combobox.Option
                                key={user.id}
                                className={`relative flex items-center gap-3 cursor-pointer py-2 px-4 text-gray-200 group hover:bg-[#7dcea0] hover:text-gray-700`}
                                onBlur={handleBlur}
                                value={user.username}
                                >
                                    <img src={user.profilePic} alt="user's profile pic" className="rounded-full w-10 h-10 object-cover" />
                                    <span
                                    className={`block truncate font-bold`}>
                                        {user.username}
                                    </span>

                                    <div className="ml-auto mr-2 relative items-center justify-center hidden group-hover:flex">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <AiOutlineWechat 
                                        className="text-gray-300 text-xl"
                                        />
                                    </div>
                                </Combobox.Option>
                                ))
                            }
                        </Combobox.Options>
                    }
                    </Transition>
                </div>
            </Combobox>
        </section>
    );
}
 
export default NewChat;