import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { axiosInstance } from "../apis/axios";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const openModal = () => {setIsOpen(true); }
    const closeModal = () => {setIsOpen(false);}
    
    const nav = useNavigate();

    const handlerDeleteUser = async () => {
        try {
            await axiosInstance.delete("/v1/users");
            
            localStorage.clear();
            alert("탈퇴되었습니다. 다음에 또 이용해 주세요!");
            closeModal();
            window.location.href = "/";
        } catch (e) {
            console.error(e);
        }
    }; 

    return (
        <div className="w-60 h-[calc(100vh-64px)] bg-[#202024] text-white p-4 shadow-lg flex flex-col items-start">
            <button className="mb-4 flex items-center gap-2 hover:text-pink-400 hover:cursor-pointer"><IoSearchOutline /><p>찾기</p></button>
            
            <button onClick={() => nav('my')} className="mb-4 flex items-center gap-2 hover:text-pink-400 hover:cursor-pointer"><IoPerson /><p>마이페이지</p></button>
            <button onClick={openModal} className="absolute bottom-10 left-20 cursor-pointer hover:text-pink-400">탈퇴하기</button>
            {isOpen && (
                <div onClick={closeModal} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="relative bg-[#282A30] pb-8 pr-8 pl-8 pt-5 rounded-xl shadow-lg  w-xl h-80 max-w-md z-50">
                        <button onClick={closeModal}><span className="absolute top-3 right-4 text-gray-300 text-2xl pr-2 hover:text-white cursor-pointer">x</span></button>
                        <p className="text-2xl flex justify-center pt-10">정말 탈퇴하시겠습니까?</p>
                        <div className="justify-items-center pt-20 px-10">
                            <button onClick={handlerDeleteUser} className="w-25 h-10 rounded-xl bg-gray-400 cursor-pointer hover:bg-pink-500 mr-10">네</button>
                            <button onClick={closeModal} className="w-25 h-10 rounded-xl bg-pink-500 cursor-pointer ml-10">아니오</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Sidebar;
