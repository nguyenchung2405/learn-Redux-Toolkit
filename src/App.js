import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartcontainer from "./components/cartContainer/CartContainer";
import Modal from "./components/modal/Modal";
import Navbar from "./components/navbar/Navbar";
import { calculateTotal, getCartItems } from "./redux/features/cart/cartSlice";
function App() {
  const {cartItems,isLoading} = useSelector(state => state.cart);
  const {isOpen} = useSelector(state => state.modal);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(calculateTotal());
  },[cartItems])
  
  useEffect(()=>{
    dispatch(getCartItems());
  },[])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return <main>
    {isOpen && < Modal/>}
    <Navbar/>
    <Cartcontainer/>
  </main>;
}
export default App;
