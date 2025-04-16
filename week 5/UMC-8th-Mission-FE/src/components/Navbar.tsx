import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate(); 
    return (
        <div className="flex justify-between items-center px-5 py-3 bg-[#141414]">
            <button onClick={() => nav('')} className="text-2xl font-bold text-pink-600 cursor-pointer">UMC</button>
            <div className="flex gap-3">
                <button onClick={() => nav('my')} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    내 정보
                </button>
                <button onClick={() => nav('login')} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    로그인
                </button>
                <button onClick={() => nav('signup')} className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer">
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default Navbar;
