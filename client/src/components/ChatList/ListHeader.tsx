import { IoSearch } from "react-icons/io5";
const ListHeader = () => {
    return ( 
        <section className="px-5 pt-7">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="flex items-center rounded-2xl bg-gray-100 p-3 mt-5 mr-2">
                <IoSearch className="text-sm text-gray-700 mr-4"/>
                <input type="text" className="outline-none bg-transparent text-base grow" placeholder="Search" />
            </div>                
        </section>
    );
}
 
export default ListHeader;