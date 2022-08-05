import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from "@mui/material/Alert";




const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, name, price, id, stock } = data;
  const [open, setOpen] = React.useState(false);




  const handleClose = () => {
    setOpen(false);
  }

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setOpen(true);
    setTimeout(() => {
      setIsAdded(false);
      setOpen(false);
    }, 3500);
  };

  return (
    <div className="product">
      <div className="product-image" style={{ borderRadius: "5px", width: 230, height: 150 }}>
        <img src={image} alt={name} />
      </div>
      <h4 className="product-name">{name}</h4>
      <p className="product-price">{price}</p>
      <div className="product-action">
        <button
          className
          type="button"
          onClick={handleAddToCart}

        >
        ADD TO CART
        </button>

      </div>
      <div >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ height: 50, }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%', marginTop: -190, marginLeft: 190 }}>
            Đã Thêm {name} vào giỏ hàng
          </Alert>
        </Snackbar>
      </div>
    </div>



  );
}

export default ProductCard;
