require("dotenv").config();

const stripe = require("stripe")(process.env.STEIPE_SECRET_KEY)

export const hendler = async (event) => {
    try{
        const {amount} = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            payment_method_tyoes:["card"]
        });

        return{
            statusCode:200,
            body:JSON.stringify({paymentIntent})
        }
    }catch(error){
        console.log({error})
        return {
            status:400,
            body:JSON.stringify({error})
        }
    }
}