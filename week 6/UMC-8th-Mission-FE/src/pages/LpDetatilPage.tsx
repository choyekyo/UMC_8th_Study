import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Lp } from "../types/lp";
import CommentList from "../components/CommentCard/CommentList";

const fetchLpById = async (id: string): Promise<Lp> => {
	const response = await axios.get(`http://localhost:8000/v1/lps/${id}`);
	return response.data.data;
};

const LpDetailPage = () => {

    const navigate = useNavigate(); 
	const params = useParams();
	const id = params.id;

	const getLpDetail = () => {
		return fetchLpById(id!);
	};

	const {data: lp, isError} = useQuery({
		queryKey: ["lpDetail", id],
		queryFn: getLpDetail,
		enabled: !!id,
	});

	if (isError || !lp) {
		return <div className="text-red-500">Error Occurred</div>;
	}

	return (
		<div className="max-w-4xl text-white text-center mx-auto px-6 py-10 space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="cursor-pointer">돌아가기</button>
                <div className="flex gap-5">
                    <button>수정</button>
                    <button>삭제</button>
                    <button>♡</button>
                </div>
            </div>
            
			<img src={lp.thumbnail} alt={lp.title} className="w-64 h-64 object-cover mx-auto" />
			<h2 className="text-2xl font-bold">{lp.title}</h2>
			<p>{lp.content}</p>
            <CommentList/>
		</div>
	);
};

export default LpDetailPage;
