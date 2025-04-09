import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import { ResponseSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate(); 
    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin, 
    }); 


    const handleSubmit = async() => {
        console.log(values);
        try {
            const response:ResponseSigninDto = await postSignin(values);
            setItem(response.data.accessToken);
        } catch (error) {
            alert(error);
        }
        // console.log(response);
    }; 

    // 오류가 하나라도 있거나 입력값이 비어있으면 버튼을 비활성화 
    const isDisabled =  Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true 
    Object.values(values).some((value) => value === ""); // 입력 값이 비어있으면  true 
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 ">
            <div className="flex flex-col gap-3">
                <div className="flex items-center ">
                    <button className="text-white text-2xl cursor-pointer mr-25" onClick={() => navigate(-1)}>&lt;</button>
                    <h1 className="text-xl font-bold text-white ">로그인</h1>
                </div>
                <input {...getInputProps('email')}
                name="email" type={"email"}  className={`border border-[#ccc] w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-200"}`} placeholder="이메일을 입력해주세요"/>
                {errors?.email && touched?.email && (<div className="text-red-500 text-sm" >{errors.email}</div>)}
                <input {...getInputProps('password')}
                type={"password"}  className={`border border-[#ccc] w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-200"}`} placeholder="비밀번호를 입력해주세요"/>
                {errors?.password && touched?.password && (<div className="text-red-500 text-sm" >{errors.password}</div>)}
                <button type="button" onClick={handleSubmit} disabled={isDisabled} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-700 ">로그인</button>
            </div>
        </div>
    )
}

export default LoginPage
