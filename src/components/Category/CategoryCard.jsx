// import { Link } from "react-router-dom";
// import classes from "./category.module.css";

// function CategoryCard({ data }) {
//   // Log each property individually
//   console.log("CategoryCard data.name:", data?.name); // Log the name
//   console.log("CategoryCard data.title:", data?.title); // Log the title
//   console.log("CategoryCard data.imgLink:", data?.imgLink); // Log the image link

//   return (
//     <div className={classes.category}>
//       <Link to={`/category/${data.name}`}>
//         <span>
//           <h2>{data?.title || "Default Title"}</h2>{" "}
//           {/* Fallback if title is missing */}
//         </span>
//         <img
//           src={data?.imgLink || "https://default-image-path.com/default.jpg"} // Fallback if imgLink is missing
//           alt={data?.title || "Category Image"} // Fallback alt text
//         />
//         <p>Shop now</p>
//       </Link>
//     </div>
//   );
// }

// export default CategoryCard;


import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({data}) {
  return (
    <div className={classes.category}>
      <Link to ={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard