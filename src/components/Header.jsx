import React, { useContext } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup
} from "contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "contexts/common";
import CartPreview from "components/CartPreview";

const Header = (props) => {
  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleSearchInput = (event) => {
    return setSearchKeyword(commonDispatch, event.target.value);
  };

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  return (
    <header>
      <div className="container">
        <div className="brand">
          <a href="/">
            <h1 className="logo" style={{ marginRight: "50px" }}>
              {" "}
              OrderFoods
            </h1>
          </a>
        </div>

        <div className="search">
          <a className="mobile-search" href="#">
            <img
              src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
              alt="search"
            />
          </a>
          <form action="#" method="get" className="search-form">
            <a
              className="back-button"
              href="#"
              // onClick={this.handleSearchNav.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                alt="back"
              />
            </a>
            <input
              type="search"
              placeholder="Search ..."
              className="search-keyword"
              onChange={handleSearchInput}
            />
            <button
              className="search-button"
              type="submit"
              // onClick={this.handleSubmit.bind(this)}
            />
          </form>
        </div>

        <div className="cart">
          <div className="cart-info">
            <table>
              <tbody>
                <tr>
                  <td>No. of items</td>
                  <td>:</td>
                  <td>
                    <strong>{cartQuantity}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td>
                    <strong>{cartTotal}.000 </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <a className="cart-icon" href="#" onClick={handleCartButton}>
            <img
              className={props.cartBounce ? "tada" : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            />
            {cartQuantity ? (
              <span className="cart-count">{cartQuantity}</span>
            ) : (
              ""
            )}
          </a>
          <CartPreview />
        </div>
      </div>
    </header>
  );
};

export default Header;
