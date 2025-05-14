import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCommentDto } from "../../types/comment";
import { postComment } from "../../apis/comment";

const useAddComment = (lpId:string) => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: ({ content }: Omit<CreateCommentDto, "lpId">) => 
            postComment({lpId:Number(lpId), content}),
        onSuccess: () => {
            alert("댓글이 등록되었습니다.");
            // 댓글 데이터 다시 불러오기 
            queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
        },
        onError: (e) => {
            alert("에러가 발생했습니다. 다시 시도해 주세요" + e); 
        }
    })
}

export default useAddComment;