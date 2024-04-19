import { IoEllipsisVertical, IoInvertMode, IoLogOutOutline, IoSearch, IoSettingsOutline } from "react-icons/io5";
import useConversationStore from "../../store/conversation-store";

const ListHeader = () => {
    // ZUSTAND STATES AND FUNCTIONS
    const theme = useConversationStore((state) => state.theme);
    const setTheme = useConversationStore((state) => state.setTheme);
    const loggedUser = useConversationStore((state) => state.loggedUser);

    const toggleTheme = () => {
        document.querySelector('html')!.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
        setTheme(theme === 'dark' ? 'light' : 'dark');
        handleClick();
    };

    const handleClick = () => {
        const elem = document.activeElement as HTMLElement;
        if (elem) {
          elem?.blur();
        }
    };

    return ( 
        <section className="px-5 pt-7
                            sm:px-5">
            <h1 className="text-2xl font-bold md:block xs:hidden">Vibeline</h1>

            {/* CHATLIST HEADER FOR MOBILE/TABLET */}
            <div className="items-center justify-between
                            md:hidden xs:flex">
                <div className="flex items-center gap-3">
                    <img src={loggedUser?.profilePic} alt="User Pic" className="rounded-full w-10 h-10 object-cover shrink-0" />
                    <h2 className="text-2xl font-bold">Vibeline</h2>
                </div>

                {/* DROPDOWN MENU FOR MOBILE/TABLET */}
                <div className="dropdown dropdown-end">
                    <IoEllipsisVertical 
                    tabIndex={0}
                    role="button"
                    className='text-xl cursor-pointer'
                    />
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                        <li>
                            <div className="flex items-center justify-between" onClick={handleClick}>
                                <p>Settings</p>
                                <IoSettingsOutline
                                className="text-base"/>
                            </div>
                        </li>
                        <li onClick={toggleTheme}>
                            <div className="flex items-center justify-between">
                                <p>Switch Theme</p>
                                <IoInvertMode
                                className="text-base"/>
                            </div>
                        </li>
                        <li onClick={handleClick}>
                            <div className="flex items-center justify-between">
                                <p>Log Out</p>
                                <IoLogOutOutline
                                className="text-base"/>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            
            <div className="flex items-center rounded-2xl bg-[--text-input-primary] p-3 mt-5 mr-2 focus-within:bg-[--text-input-secondary]
                            sm:mr-0">
                <IoSearch className="text-sm mr-4 shrink-0"/>
                <input type="text" className="outline-none bg-transparent text-base grow " placeholder="Search" />
            </div>                
        </section>
    );
}
 
export default ListHeader;