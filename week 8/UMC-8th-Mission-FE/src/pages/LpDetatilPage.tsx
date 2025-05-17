import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/CommentCard/CommentList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { useEffect, useState } from "react";



const LpDetailPage = () => {
	const navigate = useNavigate(); 
	const {lpId} = useParams();
	const { accessToken } = useAuth(); 

	const {data:lp, isError} = useGetLpDetail({lpId: Number(lpId)});
	const {data:me} = useGetMyInfo(accessToken);  

	// mutate -> 비동기 요청을 실행하고 콜백 함수를 이용해 후속 작업 처리
	// mutateAsync -> Promise를 반환해서 await 사용 가능 
	const { mutate: likeMutate } = usePostLike(); 
	const { mutate: dislikeMutate } = useDeleteLike();
	const { mutate: updateLp } = useUpdateLp();
	const { mutate: deleteLp } = useDeleteLp(); 

	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [thumbnail, setThumbnail] = useState("");

	useEffect(() => {
		if (lp?.data) {
			setTitle(lp.data.title);
			setContent(lp.data.content);
			setThumbnail(lp.data.thumbnail);
		}
	}, [lp]);

	const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number);

	const handleLikeLp = () => {
		likeMutate({ lpId: Number(lpId) }); 
	}; 

	const handleDislikeLp = () => {
		dislikeMutate({ lpId: Number(lpId) }); 
	}; 

	const handleUpdate = () => {
		updateLp({
			lpId: Number(lpId),
			title,
			content,
			thumbnail,
		});
		setEditMode(false);
	};

	const handleDelete = () => {
		if (confirm("정말로 이 LP를 삭제하시겠습니까?")) {
			deleteLp(Number(lpId));
		}
	};

	if (isError || !lp) {
		return <div className="text-red-500">Error Occurred</div>;
	}

	return (
		<div className="max-w-4xl text-white text-center mx-auto px-6 py-10 space-y-6">
			<div className="flex justify-between items-center">
				<button onClick={() => navigate(-1)} className="cursor-pointer">돌아가기</button>
				<div className="flex gap-5">
					{me?.data.id === lp.data.authorId && (
						<>
							{editMode ? (
								<>
									<button onClick={handleUpdate} className="cursor-pointer">저장</button>
									<button onClick={() => setEditMode(false)} className="cursor-pointer">취소</button>
								</>
							) : (
								<>
									<button onClick={() => setEditMode(true)} className="cursor-pointer">수정</button>
									<button onClick={handleDelete} className="cursor-pointer">삭제</button>
								</>
							)}
						</>
					)}
					<button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
						<FaHeart
							className="w-5 h-4 cursor-pointer hover:scale-125"
							style={{
								fill: isLiked ? "red" : "black",
								stroke: isLiked ? "red" : "white",
								strokeWidth: 50,
							}}
						/>
					</button>
				</div>
			</div>

			{editMode ? (
				<label htmlFor="thumbnail-upload" className="cursor-pointer inline-block">
					<img
						src={thumbnail}
						alt="썸네일"
						className="w-64 h-64 object-cover mx-auto rounded"
					/>
					<input
						id="thumbnail-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							const reader = new FileReader();
							reader.onloadend = () => {
								setThumbnail(reader.result as string);
							};
							reader.readAsDataURL(file);
						}}
					/>
				</label>
			) : (
				<img src={lp.data.thumbnail} alt={lp.data.title} className="w-64 h-64 object-cover mx-auto" />
			)}

			{editMode ? (
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="text-2xl font-bold bg-[#202024]  p-2 rounded w-full text-white"
				/>
			) : (
				<h2 className="text-2xl font-bold">{lp.data.title}</h2>
			)}

			{editMode ? (
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full bg-[#202024] p-2 rounded text-white"
					rows={6}
				/>
			) : (
				<p>{lp.data.content}</p>
			)}

			<CommentList />
		</div>
	);
};

export default LpDetailPage;
