import UserPic from '../../assets/profile_pic.jpg';

const ChatListItem = () => {
    return ( 
        <li className="flex items-center gap-4 max-h-14 py-8 pl-5 pr-6 cursor-pointer hover:bg-gray-200">
            <img src={UserPic} alt="User Picture" className='rounded-full w-10 h-10 object-cover' />


            <div className='flex flex-col grow'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-bold'>Kate Rose</h2>
                    <p className='text-sm text-gray-400'>16:45</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base text-gray-400'>Welcome!</h2>
                    {/* <p className='text-sm text-gray-400'>16:45</p> */}
                </div>
            </div>
        </li>
    );
}
 
export default ChatListItem;