import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentData, CommentApiResponse } from "../../types/comment";
import { useParams } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import CommentListSkeletonList from "./CommentListSkeletonList";

const CommentList = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const token = rawToken?.replace(/^"|"$/g, ""); 

    const { data: comments, isLoading, isError } = useQuery<CommentData[]>({
        queryKey: ["comments", id, order],
        queryFn: async () => {
            const res = await axios.get<CommentApiResponse>(
                `http://localhost:8000/v1/lps/${id}/comments`,
                {
                    params: {
                        cursor: 0,
                        limit: 100,
                        order: order,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data.data.data;
        },
        enabled: !!id && !!token,
    });
    if (isLoading) return <CommentListSkeletonList count={3} />;
    if (isError) return <div className="text-red-500">댓글 불러오기 실패</div>;
    return (
        
        <div className="mt-10 text-white">
            <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-2xl">댓글</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setOrder("asc")}
                        className={`cursor-pointer px-4 py-2 rounded border font-bold ${
                            order === "asc" ? "bg-white text-black" : "bg-black text-white"
                        }`}
                    >
                        오래된순
                    </button>
                    <button
                        onClick={() => setOrder("desc")}
                        className={`px-4 py-2 rounded border font-bold ${
                            order === "desc" ? "bg-white text-black" : "bg-black text-white"
                        }`}
                    >
                        최신순
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-10">
                <input
                    type="text"
                    placeholder="댓글을 입력해주세요"
                    className="flex-1 px-3 py-2 rounded border border-gray-600 bg-[#1f1f1f] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-pink-500 text-white font-semibold px-4 py-2 rounded hover:bg-pink-600 cursor-pointer">
                    작성
                </button>
            </div>

            <div className="space-y-4">
                {(comments ?? []).map((comment) => (
                    <div key={comment.id} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold">
                            {comment.author?.name?.[0] ?? "?"}
                        </div>
                        <div className="flex flex-col items-start ml-2">
                            <span className="font-semibold">
                                {comment.author?.name ?? "알 수 없음"}
                            </span>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                            <span className="text-xs text-gray-500 mt-1">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList;
