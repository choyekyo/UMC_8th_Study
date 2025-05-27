import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false,
}; 

const modalSlice = createSlice({
    name: 'modal', 
    initialState, 
    reducers: {
        // OpenModal 
        openModal: (state) => {
            state.isOpen = true;
        },
        // CloseModal 
        closeModal: (state) => {
            state.isOpen = false; 
        }, 
    }, 
}); 

// 액션 생성자를 내보내는 작업
// dispatch(openModal) 의 형식으로 사용하기 위해 필요 
export const {openModal, closeModal} = modalSlice.actions; 

// 리듀서 함수를 변수에 담는 작업 
// Redux store에 reducer 함수를 등록해야 하기 때문에 필요 
const modalReducer = modalSlice.reducer;
export default modalReducer;