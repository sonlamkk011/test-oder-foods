import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from 'react-moment';

import Header from "components/Header";
import "./OrderDetails.scss";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { formatDate } from "ulti/formatDate";
function createData(Products, Pirce, Status) {
  return { Products, Pirce, Status };
}

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`https://order-foods.herokuapp.com/api/v1/orders/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("res.error");
        }
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };
  console.log("sdadsadsadada", products);

  return (
    <>
      <Header />
      {/* <div id="order-details">
        <div className="container">
          <div className="row">
            {products?.orderDetails.map((item) => {
              return (
                <div key={item.food.id}>
                  <div>{item.food.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      <div id="order-details">
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption style={{ color:"black"}}>
                Mặt hàng của bạn đã đc order thành công, vui lòng chờ ...
              </caption>
              <TableHead>
                <TableRow style={{backgroundColor:"lime", color:"black"}}>
                  <TableCell style={{fontSize:"20px"}}>Products</TableCell>
                  <TableCell align="right" style={{fontSize:"20px"}}>Price</TableCell>
                  <TableCell align="right" style={{fontSize:"20px"}}>Quantity</TableCell>
                  <TableCell align="right" style={{fontSize:"20px"}}>Order Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.orderDetails.map((item) => {
                  return (
                    <TableRow key={item.food.id} style={{}}>
                      <TableCell component="th" scope="row">
                        {item.food.name}
                      </TableCell>
                      <TableCell align="right">{item.food.price}.000</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                      <Moment format="DD/MM/YYYY">
                        {item.food.createdAt}
                        </Moment>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default withRouter(OrderDetails);
