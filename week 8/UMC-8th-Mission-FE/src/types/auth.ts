import { CommonResponse } from "./common";

// 회원가입 관련 
export type RequestSignupDto = {
    name: string; 
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
}; 

export type ResponseSignupDto = CommonResponse<{
    id: number;
    name: string;
    email: string; 
    bio: string | null
    avatar: string | null;
    createAt: Date;
    updateAt: Date;
}>;

// 로그인 관련 
export type RequestSigninDto = {
    email: string;
    password: string;
};

export type ResponseSigninDto = CommonResponse<{
    id: number; 
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

// 내 정보 조회 
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string; 
    bio: string | null
    avatar: string | null;
    createAt: Date;
    updateAt: Date;
}>;

// 내 정보 수정 
export type UpdateMyInfoDto = {
    name: string;
    bio: string;
    avatar?: string;
}; 