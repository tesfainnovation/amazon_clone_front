import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";
import { productUrl } from "../../components/Api/EndPoints";

function ProductDetails() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product details based on productId
  useEffect(() => {
    setIsLoading(true); // Set loading state to true while fetching data

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data); // Set product data after successful fetch
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, [productId]); // Re-fetch data whenever productId changes

  return (
    <LayOut>
      {isLoading ? (
        <Loader /> // Display loader while data is being fetched
      ) : (
        <ProductCard
          product={product}
          renderDesc={true} // Show product description
          renderAdd={true} // Show "Add to Cart" button
          flex={true} // Use flex layout for product display
        />
      )}
    </LayOut>
  );
}

export default ProductDetails;
