import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "contexts/checkout";
import { CartStateContext } from "contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { phoneRegExp } from "constants/common";

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

const LoginStep = () => {
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <div className="detail-container">
      <h2>Sign In now!</h2>
      <div className="auth-message">
        {isLoggedIn ? (
          <>
            <p>
              Hello, <span>{user.username}</span>
            </p>
            <button onClick={() => handleLoginAsDiffUser()}>
              Login as Different User
            </button>
          </>
        ) : (
          <>
            <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button>
          </>
        )}
      </div>
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>
        <button disabled={!isLoggedIn} onClick={() => handleProceed()}>
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const AddressStep = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleBackToLogin = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  return (
    <div className="detail-container">
      <h2>Personal Information</h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          addressLine: "L1, Palm Residency",
          city: "Kingston",
          state: "New York",
          code: "12401",
          country: "United States"
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
          <Form>
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                component={Input}
              />
            </div>
            <Field
              name="text"
              type="text"
              placeholder="Ghi chú món ăn"
              component={Input}
            />

            <div className="actions">
              <button
                type="button"
                className="outline"
                onClick={() => handleBackToLogin()}
              >
                <i className="rsc-icon-arrow_back" /> Login in as Different User
              </button>
              <button type="submit">
                Oder
                <i className="rsc-icon-arrow_forward" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const PaymentStep = () => {
  const { shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleBackToAddress = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  const handlePayment = () => {};
  return (
    <div className="detail-container">
      <h2>Oder Details</h2>
      {/* <div>
        <pre>{JSON.stringify(shippingAddress, null, 0)}</pre>
      </div> */}
      <div className="actions">
        <button
          type="button"
          className="outline"
          onClick={() => handleBackToAddress()}
        >
          <i className="rsc-icon-arrow_back" /> Back to Details
        </button>
        <button disabled={!shippingAddress} onClick={() => handlePayment()}>
          Save Address
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { items = [] } = useContext(CartStateContext);
  const { isLoggedIn } = useContext(AuthStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;
  let total = 0

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="order-details">
          <ul className="timeline">
            <li
              className={classNames({
                done: isLoggedIn,
                active: step === CHECKOUT_STEPS.AUTH
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.AUTH)}
            >
              <h2>Sign In</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}
            >
              <h2>Details</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            {/* <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li> */}
          </ul>
          {step === CHECKOUT_STEPS.AUTH && <LoginStep />}
          {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />}
          {step === CHECKOUT_STEPS.PAYMENT && <PaymentStep />}
        </div>
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
                    <p className="product-price">{product.price}</p>
                  </div>
                  <div className="product-total">
                    <p className="quantity">
                      {`${product.quantity} ${
                        product.quantity > 1 ? "Nos." : "No."
                      }`}
                    </p>

                    <p className="amount">{product.quantity * product.price}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="total-breakup">
            <li>
              <h2>Total</h2>
              <h2>{total}vnd</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
