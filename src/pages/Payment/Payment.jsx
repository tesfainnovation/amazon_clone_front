import LayOut from "../../components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../components/Api/axios";
import { db } from "../../utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/ActionType";

import { collection, doc, setDoc } from "firebase/firestore"; // Import the correct functions
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Ensure that basket is defined
  const totalItems =
    basket?.reduce((total, item) => total + item.amount, 0) || 0;
  console.log(totalItems);
  console.log(user);

  // Calculate the total amount of the order
  const total =
    basket?.reduce((amount, item) => {
      return item.price * item.amount + amount;
    }, 0) || 0;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // To track payment status

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      // Backend payment initiation
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // Stripe payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (paymentIntent.error) {
        setCardError(paymentIntent.error.message);
        console.error("Payment confirmation failed", paymentIntent.error);
      } else {
        if (paymentIntent.status === "succeeded") {
          console.log("Payment successful!", paymentIntent);

          // Save the order to Firestore
          try {
            // Create a reference to the 'orders' sub-collection in the user's document
            const orderRef = doc(
              collection(db, "users", user.uid, "orders"),
              paymentIntent.id
            );

            // Save the order data
            await setDoc(orderRef, {
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
              paymentStatus: paymentIntent.status,
              paymentId: paymentIntent.id,
            });

            console.log("Order saved to Firestore!");

            // Clear basket and navigate to the orders page
            dispatch({ type: Type.EMPTY_BASKET });
            navigate("/orders", {
              state: { message: "You have placed a new order" },
            });
          } catch (error) {
            console.error("Error saving order to Firestore:", error);
            setCardError("There was an issue saving the order to Firestore.");
          }
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setCardError("Payment failed, please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   // Disable button while processing
  //   setIsProcessing(true);

  //   try {
  //     // Backend payment initiation
  //     const response = await axiosInstance({
  //       method: "POST",
  //       url: `/payment/create?total=${total * 100}`,
  //     });

  //     // console.log(response.data);
  //     const clientSecret = response.data?.clientSecret;

  //     // client-side confirmation (Stripe)
  //     const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: { card: elements.getElement(CardElement) },
  //     });

  //     if (paymentIntent.error) {
  //       setCardError(paymentIntent.error.message);
  //       console.error("Payment confirmation failed", paymentIntent.error);
  //     } else {
  //       if (paymentIntent.status === "succeeded") {
  //         console.log("Payment successful!", paymentIntent);
  //       }
  //     }

  //     // Save the order to Firestore
  //     try {
  //       await db
  //         .collection("users")
  //         .doc(user.uid)
  //         .collection("orders")
  //         .doc(paymentIntent.id)
  //         .set({
  //           basket: basket,
  //           amount: paymentIntent.amount,
  //           created: paymentIntent.created,
  //         });
  //       console.log("Order saved to Firestore!");
  //       // Clear basket and navigate to the orders page
  //       dispatch({ type: Type.EMPTY_BASKET });
  //       navigate("/orders", {
  //         state: { message: "you have placed new order" },
  //       });
  //     } catch (error) {
  //       console.error("Error saving order to Firestore:", error);
  //       setCardError("There was an issue saving the order to Firestore.");
  //     }
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //     setCardError("Payment failed, please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>
            {/* <div>{user.email}</div> */}
            <div>123 React</div>
            <div>California</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      {" "}
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={!stripe || isProcessing}>
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
