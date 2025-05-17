import { useQuery } from "@tanstack/react-query";
import { getLPList } from "../../apis/lp";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}:PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn:() => 
            getLPList({
                cursor, 
                search, 
                order,
                limit,
            }),
            staleTime: 1000*60*5, // 5분 
            gcTime: 1000*60*10, // 10분   

            // 조건에 따라 쿼리를 실행 여부 제어 
            // enabled: Boolean(search),

            // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정
            // 기본 값: 3회, 네트워크 오류 등 임시적인 문제 보완 가능 

            // initial Data: 쿼리 실행 전 미리 제공할 초기 데이터 설정
            // 컴포넌트가 렌더링 될 시 빈 데이터 구조를 미리 제공하여 로딩 전에도 안전하게 UI를 구성할 수 있게 함 

            // keepPreviousData : 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 줄여줌 
            // 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험 향상 

            // select: (data) => data.data.data, 
    }); 
}

export default useGetLpList; 