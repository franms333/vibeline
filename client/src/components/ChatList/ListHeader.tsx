import { IoSearch } from "react-icons/io5";
import UserPic from '../../assets/profile_pic.jpg';
import { IoEllipsisVertical, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const ListHeader = () => {
    return ( 
        <section className="px-5 pt-7
                            sm:px-3">
            <h1 className="text-2xl font-bold lg:block sm:hidden">Messages</h1>
            <div className="items-center justify-between
                            lg:hidden sm:flex">
                <img src={UserPic} alt="User Pic" className="rounded-full w-10 h-10 object-cover shrink-0" />
                <div className="dropdown">
                    <IoEllipsisVertical 
                    tabIndex={0}
                    role="button"
                    className='text-xl cursor-pointer'
                    />
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <div className="flex items-center justify-between">
                                <p>Settings</p>
                                <IoSettingsOutline
                                className="text-base"/>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-between">
                                <p>Log Out</p>
                                <IoLogOutOutline
                                className="text-base"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center rounded-2xl bg-gray-100 p-3 mt-5 mr-2 focus-within:bg-gray-300
                            sm:mr-0">
                <IoSearch className="text-sm text-gray-700 mr-4 shrink-0"/>
                <input type="text" className="outline-none bg-transparent text-base grow " placeholder="Search" />
            </div>                
        </section>
    );
}
 
export default ListHeader;