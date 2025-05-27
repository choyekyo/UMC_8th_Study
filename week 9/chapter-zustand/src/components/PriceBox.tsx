import { useCartInfo } from "../hooks/useCartStore";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useModalActions } from "../hooks/useModalStore";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
    const {total} = useCartInfo(); 
    const {openModal} = useModalActions(); 
    // const {total} = useSelector((state)=> state.cart); 
    // const dispatch = useDispatch();

    const handleOpenModal = () => {
        openModal();
    };

    return (
        <div className="p-12 flex justify-between">
            <button onClick={handleOpenModal} className="border p-4 rounded-md cursor-pointer hover:bg-gray-200">장바구니 초기화</button>
            <div>총 가격 {total}원</div>
        </div>
    )
}

export default PriceBox;
