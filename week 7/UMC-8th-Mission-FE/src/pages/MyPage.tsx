import { useQuery } from "@tanstack/react-query";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { IoIosOptions } from "react-icons/io";
import { useEffect, useState } from "react";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
const MyPage = () => {
    const [fixInfo, setFixInfo] = useState(false); 
    const {data, isLoading, isError, error} = useQuery<ResponseMyInfoDto>({
        queryKey: ['myInfo'],
        queryFn: getMyInfo, 
    }); 

    // 입력 값
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    const {mutate: updateMyInfo} = useUpdateMyInfo(); 

    // 초기 데이터 로드 후 상태 반영
    useEffect(() => {
    if (data?.data) {
        setName(data.data.name);
        setBio(data.data.bio ?? "");
        setAvatar(data.data.avatar ?? "");
    }
    }, [data]);
    
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (isError) {
        return <div>Error: {error.message}</div>; 
    }

    return (
        <>
        <div className="flex flex-row justify-center items-center text-white">
            {fixInfo ? (
                <label htmlFor="avatar-upload" className="cursor-pointer relative">
                    <img
                        src={avatar || "default-hamster.jpeg"}
                        className="w-40 h-40 rounded-full object-cover"
                        alt="프로필"
                    />
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setAvatar(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </label>
            ) : (
                <img
                    src={avatar || "default-hamster.jpeg"}
                    className="w-40 h-40 rounded-full object-cover"
                    alt="프로필"
                />
            )}
            <div className="ml-10">
            {fixInfo ? (
                <div className="flex flex-col">
                    <input
                        type="text"
                        value={name}
                        placeholder="닉네임"
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black border-white border p-2 text-white w-64 rounded mb-2"
                    />
                    <input
                        type="text"
                        value={bio}
                        placeholder="소개"
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-black border-white border p-2 text-white w-64 rounded"
                    />
                </div>
            ) : (
                <>
                    <p className="text-3xl font-bold">{name}</p>
                    <p className="pt-1">{bio || "자기소개를 작성해주세요"}</p>
                </>
            )}
                <p className="pt-3">{data?.data.email}</p>
            </div>
            {!fixInfo && (
                <button
                    onClick={() => setFixInfo(true)}
                    className="fixed top-20 right-10 hover:text-pink-500 cursor-pointer"
                >
                    <IoIosOptions className="scale-150" />
                </button>
            )}
            {fixInfo && (
                <button onClick={() => { if (!name.trim()) { alert("닉네임은 빈칸일 수 없습니다!"); return; }
                updateMyInfo({ name, bio, ...(avatar && { avatar }) });
                setFixInfo(false);
                }} className="fixed top-20 right-10 w-20 h-10 rounded-lg bg-gray-500 hover:bg-pink-500 cursor-pointer">저장</button>
            )}
        </div>
        <hr className="text-gray-500 opacity-20 mt-10"/>
        </>
    );
}

export default MyPage; 
