import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"

import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component"
import "./payment-from.style.scss"
const PaymentFrom = () => {
    const stripe = useStripe();
    const elements = useElements();
    const payentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
    }
    return (
        <div className="payment-form-container">
            <div className="form-container">
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </div>
        </div>
    )
}

export default PaymentFrom;