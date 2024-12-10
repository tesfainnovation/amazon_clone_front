import classes from "./Header.module.css";
import USAFlag from "../../assets/images/usa-flag.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeaders from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/Firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext); // Access basket state from context
  // console.log(basket)
  // Calculate total number of items in the basket (sum of 'amount' for each product)
  const totalItems = basket?.reduce((total, item) => total + item.amount, 0);
  // console.log(totalItems)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* Logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>

            {/* Delivery Information */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivery to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          {/* Right Side */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src={USAFlag} alt="" />
              <select name="" id="">
                <option value="5">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <small>Hello, Sign In</small>
                    <br />
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/Orders">
              <small>returns</small>
              <br />
              <span>& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/Cart" className={classes.cart}>
              <BiCart size={35} />
              {/* Display the total number of items in the cart */}
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeaders />
    </section>
  );
}

export default Header;
