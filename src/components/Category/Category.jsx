import CategoryCard from "./CategoryCard";
import { CategoryInfos } from "./CategoryFullInfos";
import classes from "./Category.module.css";

function Category() {
  // console.log("CategoryInfos:", CategoryInfos); // Log the entire CategoryInfos array

  return (
    <section className={classes.category_container}>
      {CategoryInfos.map((infos, index) => {
        return <CategoryCard data={infos} key={index} />;
      })}
    </section>
  );
}

export default Category;
