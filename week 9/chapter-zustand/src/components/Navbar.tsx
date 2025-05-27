import { FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";


const Navbar = () => {
    // zustand 이용 
    const {amount, cartItems} = useCartInfo(); 
    const {calculateTotals} = useCartActions(); 

    // redux toolkit 이용 
    // const {amount, cartItems} = useSelector((state)=> state.cart); 
    // const dispatch = useDispatch(); 

    useEffect(()=>{
        calculateTotals(); 
    }, [calculateTotals, cartItems]);

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 onClick={() => {window.location.href = '/'; }} className="text-2xl font-semibold cursor-pointer">Jerry</h1>
            <div className="flex items-center space-x-2">
                <FaShoppingCart className="text-2xl"/>
                <span className="text-xl font-medium">{amount}</span>
            </div>
        </div>
    )
}

export default Navbar
