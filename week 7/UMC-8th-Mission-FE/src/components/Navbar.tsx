import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { IoSearchOutline } from "react-icons/io5";
import useLogout from "../hooks/mutations/useLogout";
import { useQuery } from "@tanstack/react-query";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { accessToken} = useAuth();
    const navigate = useNavigate();
    const {mutate: logout} = useLogout(); 

    const {data:user} = useQuery({
        queryKey: ["myInfo"],
		queryFn: getMyInfo,
		enabled: !!accessToken,
    }); 

    const handleLogout = () => {
        logout();
    }; 





    return (
        <div className="flex justify-between items-center px-5 py-3 h-16 bg-[#202024]">
            <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-pink-500 text-4xl font-bold hover:cursor-pointer hover:text-pink-700">≡</button>
            <button onClick={() => navigate('')} className="text-2xl font-bold text-pink-600 cursor-pointer ">UMC</button>
            </div>
            <div className="flex gap-3">
                <button onClick={() => navigate('search')} className="py-2 hover:cursor-pointer text-pink-500 text-xl"><IoSearchOutline /></button>
                {!accessToken  && (<>
                    <button onClick={() => navigate('login')} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    로그인
                    </button>
                    <button onClick={() => navigate('signup')} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    회원가입
                    </button>
                </>)  }
            
                {accessToken && (<>
                    <p className="pt-2 pr-2 text-pink-500"> {user?.data.name}님 반갑습니다.</p>
                    <button onClick={handleLogout} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    로그아웃
                </button>
                </>)}
            </div>
        </div>
    );
};

export default Navbar;
