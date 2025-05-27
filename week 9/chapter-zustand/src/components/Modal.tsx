import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
    const {isOpen} = useModalInfo(); 
    const {closeModal} = useModalActions();
    const {clearCart} = useCartActions(); 
    // const {isOpen} = useSelector((state) => state.modal);   
    // const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
    };

    const handleClearCart = () => {
        clearCart();
        closeModal();
    };

    // 모달이 열려 있지 않을 때 렌더링하지 않음 
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-70 text-center">
                <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-4 py-2 rounded cursor-pointer" onClick={handleCloseModal}>
                        아니요
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded cursor-pointer" onClick={handleClearCart}>
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
