import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data.js";
import classes from "./Carousel.Module.css";

function CarouselEffect() {
  return (
    <div className={classes.carouselWrapper}>
      {" "}
      {/* Custom wrapper class for layout */}
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return (
            <img
              src={imageItemLink}
              alt={`carousel-item-${index}`}
              key={index}
            />
          );
        })}
      </Carousel>
      <div className={classes.hero_img}></div> {/* Hero image with overlay */}
    </div>
  );
}

export default CarouselEffect;
