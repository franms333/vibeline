import LoginPic from '../assets/login_pic.jpg';
import LoginSmallPic from '../assets/login_mobile_tablet_pic.jpg';
import useWindowSize from '../hooks/useWindowsSize';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../services/ServiceCalls';
import Modal from '../components/Modal';

const LoginPage = () => {
    const [loginPic, setLoginPic] = useState<any>();
    const {width} = useWindowSize();
    const inputRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState<string>('');

    // Modal props
    const [title, setTitle] = useState<string>();
    const [message, setMessage] = useState<string>();

    async function handleOnSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        let inputValue = inputRef.current!.value;

        if(inputValue.trim() === ''){
            const modal = document.getElementById('custom_modal') as any;
            modal!.showModal();
            setTitle('Error');
            setMessage('Please enter an username');
            return;
        }

        setUsername(inputValue.trim());

        inputRef.current!.value = '';

        onLogin();        
    }

    const FETCH_USER = LOGIN();
    const [onLogin, { data, error }] = useLazyQuery(
        FETCH_USER,
        
        {variables: {username: username}, fetchPolicy: 'no-cache'}
    );

    useEffect(()=>{
        if(width > 768){
            setLoginPic(LoginPic);
        } else {
            setLoginPic(LoginSmallPic);
        }
    },[width]);

    useEffect(() => {
        if(data){
            console.log(data);
        }
        if(error){
            const modal = document.getElementById('custom_modal') as any;
            modal!.showModal();
            setTitle('Error');
            setMessage(error.message);
        }
    }, [onLogin, data, error])

    return ( 
        <>
            <main className="overflow-hidden max-h-screen relative brightness-95">
                <img 
                src={loginPic} 
                alt="Two cartoonish girls having a coffee in a wild area"
                className='object-cover 
                lg:object-top
                xs:h-screen xs:w-screen'
                />
                <form 
                onSubmit={handleOnSubmit}
                className='absolute backdrop-blur-lg border-2 rounded-lg p-8 pb-5 text-gray-700
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                lg:border-[#EEA56F]/30 lg:w-1/4 
                md:w-1/2
                xs:w-5/6 xs:border-[#838993]/30 xs:bg-slate-300/30'>
                    <div className=' flex flex-col gap-2 text-center mb-5'>
                        <h2 className='text-3xl font-medium'>Welcome back!</h2>
                        <h3 className='text-lg'>We're so excited to see you again!</h3>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="username" className='font-medium'>Username</label>

                        <input 
                        id='username' 
                        name='username' 
                        type="text" 
                        ref={inputRef}
                        className='p-2 pl-3 rounded-md focus:outline-none focus:ring
                        lg:bg-[#e4d5cc] lg:focus:ring-[#cabeb6]
                        xs:bg-slate-300 xs:focus:ring-slate-400'/>

                        <button className='mt-5 px-3 py-2 bg-[#8bd3a9] w-full self-center text-gray-500 rounded-lg transition-colors duration-100
                        hover:bg-[#64c58d] hover:text-gray-700'>
                            Login
                        </button>

                        <p className='text-sm text-center lg:text-gray-500 xs:text-gray-700'>If you don't have an account just write an username and we'll check if it's available!
                            {/* <span className='text-blue-400 transition-colors duration-100 cursor-pointer hover:text-blue-500'>
                            Register
                            </span> */}
                        </p>
                    </div>
                </form>
            </main>
            <Modal 
            key={title}
            title={title}
            message={message}
            />
        </>
    );
}
 
export default LoginPage;