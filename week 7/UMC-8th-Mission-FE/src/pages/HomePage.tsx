import { useEffect, useState } from "react";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from 'react-intersection-observer';
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import Modal from "../components/Modal";
import { GoToTop } from "../components/GoToTop";


const HomePage = () => {
    const [search, setSearch] = useState(""); 
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError, refetch} = useGetInfiniteLpList(5, search, order === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc);

    // const {data, isPending, isError} = useGetLpList({
    //     search, 
    //     limit: 50, 
    // });


    // ref) 특정한 HTML 요소 감시 가능 
    // inView) 그 요소가 화면에 보이면 true 아니면 false 
    const {ref, inView} = useInView({threshold: 0, });

    useEffect(() => {
        if(inView){
            !isFetching && hasNextPage && fetchNextPage(); 
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    useEffect(() => {
        refetch(); 
    }, [order, refetch]); 

    if(isError) {
        return <div className="text-pink-500">Error</div>; 
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <GoToTop/>
            <Modal/>
            <div className="mb-4 flex justify-between items-center pt-10">
                <div>
                    {/* <input className="outline-1 px-2 py-1 focus:outline-fuchsia-500 focus:text-fuchsia-500" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어를 입력"/>
                    <button className="bg-pink-500 text-white font-bold cursor-pointer rounded px-2 py-1 ml-3 hover:bg-fuchsia-500">검색</button> */}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setOrder("asc")} className={`cursor-pointer px-4 py-2 rounded border font-bold ${order === "asc" ? "bg-white text-black" : "bg-black text-white"}`}>오래된순</button>
                    <button onClick={() => setOrder("desc")} className={`cursor-pointer px-4 py-2 rounded border font-bold ${order === "desc" ? "bg-white text-black" : "bg-black text-white"}`}>최신순</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
                {lps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => 
                <LpCard key={lp.id} lp = {lp} />)}
                {isFetching && <LpCardSkeletonList count={20}/> }
            </div>
            <div ref={ref} className="h-2"></div>
        </div>
    );
};

export default HomePage;
