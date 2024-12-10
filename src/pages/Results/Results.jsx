import Classes from "./Results.module.css";
import axios from "axios";
import { productUrl } from "../../components/Api/EndPoints";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

function Results() {
  const { categoryName } = useParams(); // Get category name from the URL parameters
  const [results, setResults] = useState([]); // State to store the fetched results
  const [isLoading, setIsLoading] = useState(true); // State to track the loading state
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    setError(null); // Reset error state

    // Fetching data from the API
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data); // Update results state with fetched data
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        setIsLoading(false); // Set loading state to false if there's an error
      });
  }, [categoryName]); // Dependency array to refetch data whenever the category changes

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader /> // Show loader while data is loading
        ) : error ? (
          <p>{error}</p> // Show error message if fetching failed
        ) : (
          <div className={Classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;

