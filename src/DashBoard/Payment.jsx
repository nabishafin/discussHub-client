import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';


const Payment = () => {
    // TO DO
    const stripePromise = loadStripe('pk_test_51QjcFBIkyTa1ikFPKaxYYhyE1WMurwr043SuPJ0gLPrWbMkLOvH2AgzaTotLvfoC6gbgRyOaGGu0YDtyLIDdLXSD00dXyzTFaC');
    console.log(stripePromise)
    return (
        <div>

            <div>
                <h1 className='text-center text-4xl font-bold text-black'>Payment For MemberShip </h1>
                <p className='text-center font-bold mt-3 text-gray-500'>Payment Price : 200 tk Only </p>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;