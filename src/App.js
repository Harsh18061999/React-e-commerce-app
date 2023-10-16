
import Home from "./route/home/home.component";
import {Routes,Route} from 'react-router-dom';
import Navigation from "./route/navigation/navigation.component";
import Authentication from "./route/authentication/authentication.components";
import Shop from "./route/shop/shop.component";
import Checkout from "./route/checkout/checkout.component";
import {  useEffect} from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux/es/exports";
const App = () => {
  // console.log(" app component render")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  },[]);
  return (
    <Routes>
      <Route path="/" element={ <Navigation />}> 
        <Route index element={<Home />}></Route>
        <Route path="/shop/*" element={<Shop />}></Route>
        <Route path="/auth" element={<Authentication />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  )
}
export default App;
