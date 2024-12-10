// import classes from "./Orders.module.css";
// import { DataContext } from "../../components/DataProvider/DataProvider";
// import LayOut from "../../components/LayOut/LayOut";
// import { db } from "../../utility/Firebase";
// import { useContext, useEffect, useState } from "react";
// import ProductCard from "../../components/Product/ProductCard";


// function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Get orders from Firestore when user is logged in
//     if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log(snapshot);
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });
//     } else {
//       setOrders([]);
//       console.log("No user signed in");
//     }
//   }, [user]);

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders_container}>
//           <h2>Your Orders</h2>
//           <div>
//             {orders?.length === 0 ? (
//               <p style={{ padding: "20px" }}> No orders found</p>
//             ) : (
//               <p>Loading orders...</p>
//             )}
//           </div>
//           {/* ordered items */}
//           <div>
//             {orders?.map((eachOrder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p>Order ID: {eachOrder.id}</p>
//                   {eachOrder?.data?.basket?.map((order) => {
//                     return (
//                       <ProductCard flex={true} product={order} key={order.id} />
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../utility/Firebase"; // Ensure correct import
import { collection, doc, query, orderBy, getDocs } from "firebase/firestore";
import classes from "./Orders.module.css";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          // Create a query to fetch orders from Firestore
          const ordersRef = collection(db, "users", user.uid, "orders");
          const ordersQuery = query(ordersRef, orderBy("created", "desc"));
          const querySnapshot = await getDocs(ordersQuery);

          // Map the documents to the orders array
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          console.log(ordersData)

          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      } else {
        setOrders([]);
        console.log("No user signed in");
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {orders?.length === 0 ? (
              <p
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#2ecc71",
                }}
              >
                🎉 Payment successful! Your order is being processed. Thank you
                for shopping with us! 🛒
              </p>
            ) : (
              <p
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#3498DB",
                }}
              >
                🚚 Your order is on the way! Get ready for your awesome
                delivery! 📦
              </p>
            )}
          </div>
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
