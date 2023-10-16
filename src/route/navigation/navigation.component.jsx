import {Outlet,Link} from 'react-router-dom';
import { Fragment , useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/87 - crown.svg';
import {useSelector} from "react-redux";
import "./navigation.style.scss";
import CardIcon from '../../components/card-icon/card-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartOpen } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux/es/exports';
import { signOutStart } from '../../store/user/user.action';
const Navigation = () => {
  const dispatch = useDispatch();
  // console.log("navigation component render")
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen  = useSelector(selectCartOpen);
    console.log(isCartOpen , " selectCartOpen")

    const singnOutUser = () => dispatch(signOutStart())
    return (
      <Fragment>
        <div className='navigation'>
            <Link className="logo-container" to="/">
                <CrwnLogo />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to="/shop">
                    SHOP
                </Link>
                { 
                  currentUser ?  (<span className='nav-link' onClick={singnOutUser}>
                    SIGN OUT
                  </span>) : 
                  (<Link className='nav-link' to="/auth">
                    SIGN IN
                  </Link>)
                }
                <CardIcon />
          </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;