import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "contexts/checkout";
import {
  CartDispatchContext,
  CartStateContext,
  removeCart,
  removeFromCart
} from "contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { phoneRegExp } from "constants/common";
import axios from "axios";

const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone Number is not a valid 10 digit number")
    .min(10, "Phone Number is too short")
    .max(10, "Phone Number is too long"),
  addressLine: Yup.string().required("Door No. & Street is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  code: Yup.string().required("ZIP/Postal code is required!"),
  country: Yup.string().required("Country is required!")
});

const Checkout = () => {
  const [fullName, setFullname] = React.useState("");
  // const [phoneNumber, setPhoneNumber] = React.useState("");
  const [note, setNote] = React.useState("");
  const { items = [] } = useContext(CartStateContext);
  const [open, setOpen] = React.useState(false);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;
  let total = 0;
  const history = useHistory();
  const dispatch = useContext(CartDispatchContext);

  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
    console.log("loglog", addressData);
  };

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  const orderNow = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "foods": [
            {"foodId":1,
            "quantity":3
            },{"foodId":2,
            "quantity":5
            }
        
        ],
        "note": "Hello",
        "phone": "0123456782"
        
    })
    };
    {
      
    }
    fetch("https://order-foods.herokuapp.com/api/v1/orders/create", options);
  };

  const handleRemove = (items) => {
    return removeCart(dispatch, items);
  };

  return (
    <>
      <div className="checkout-page">
        <div className="container">
          <div className="order-summary">
            <h2>
              Summary
              <span>{` (${totalItems}) Items`}</span>
            </h2>
            <ul className="cart-items">
              {items.map((product) => {
                total += product.quantity * product.price;
                return (
                  <li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>

                      <p className="product-price">{product.price}.000</p>
                    </div>
                    <button
                      className="product-remove"
                      onClick={() => handleRemove(product.id)}
                    >
                      ×
                    </button>

                    <div className="product-total">
                      <p className="quantity">
                        {`${product.quantity} ${
                          product.quantity > 1 ? "Nos." : "No."
                        }`}
                      </p>

                      <p className="amount">
                        {product.quantity * product.price}.000
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="total-breakup">
              <li>
                <h2>Total :</h2>
                <h2>{total}.000 vnd</h2>
              </li>
            </ul>
          </div>
          <div className="order-details" style={{ marginLeft: "50px" }}>
            <div className="detail-container">
              <ul className="timeline"></ul>
              <h2>Personal Information</h2>
              <Formik
                initialValues={{
                  fullName: "",
                  phoneNumber: ""
                }}
                validationSchema={AddressSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const addressData = { ...values };
                    resetForm();
                    handleSaveAddress(addressData);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {() => (
                  <Form >
                    <div className="field-group">
                      <Field
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        component={Input}
                      />
                      <Field
                        name="phoneNumber"
                        // value={phoneNumber}
                        type="text"
                        placeholder="Phone Number"
                        component={Input}
                      />
                    </div>
                    <Field
                      name="text"
                      value={note}
                      type="text"
                      placeholder="Ghi chú món ăn"
                      component={Input}
                      style={{ height: "70px" }}
                    />

                    <div className="actions">
                      <button
                        type="button"
                        className="outline"
                        onClick={() => handleContinueShopping()}
                        style={{
                          backgroundColor: "#0bc122",
                          color: "black",
                          marginTop: "112px"
                        }}
                      >
                        <i className="rsc-icon-arrow_back" /> Shoping
                      </button>
                      {/* <Link to="/order-details"> */}

                      <button
                        type="submit"
                        onClick={orderNow}
                        style={{ backgroundColor: "#0bc122", color: "black" }}
                      >
                        Oder
                        <i className="rsc-icon-arrow_forward" />
                      </button>
                      {/* </Link> */}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
