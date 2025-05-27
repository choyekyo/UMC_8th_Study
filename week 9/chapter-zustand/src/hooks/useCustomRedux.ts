import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// 공식 문서 내 useage-with-typeScript 부분 참고 
export const useDispatch: () => AppDispatch = useDefaultDispatch; 
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector; 