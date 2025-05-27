import { useCartInfo } from "../hooks/useCartStore";
import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem"


const CartList = () => {
    // zoostand 이용 
    const {cartItems} = useCartInfo(); 
    
    
    // redux-toolkit 
    // const {cartItems, amount, total} = useSelector((state) => state.cart); 
    return (
        <div className="flex flex-col items-center justify-center">
            <ul>
                {cartItems.map((item) => (
                    <CartItem key={item.id} lp={item}/>
                ))}
            </ul>
        </div>
    )
}

export default CartList
