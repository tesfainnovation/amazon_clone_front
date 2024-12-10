import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("fetching error", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard
              // productAdd={true}
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard";
// import classes from "./product.module.css";
// import Loader from "../loader/Loader";

// function Product() {
//   const [products, setProducts] = useState([]); // Initialize with empty array
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state

//   useEffect(() => {
//     setIsLoading(true); // Start loading when API request begins

//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data); // Set the fetched products
//         setIsLoading(false); // Stop loading once data is fetched
//       })
//       .catch((err) => {
//         console.log("Error fetching products:", err);
//         setIsLoading(false); // Stop loading if error occurs
//       });
//   }, []); // Empty dependency array, runs only once on mount

//   return (
//     <>
//       {isLoading ? (
//         <Loader /> // Display loading spinner while data is being fetched
//       ) : (
//         <section className={classes.products_container}>
//           {products.map((singleProduct) => (
//             <ProductCard productAdd={true} product={singleProduct} key={singleProduct.id} />
//           ))}
//         </section>
//       )}
//     </>
//   );
// }

// export default Product;
