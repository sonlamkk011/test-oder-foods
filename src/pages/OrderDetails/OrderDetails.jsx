import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "components/Header";
import "./OrderDetails.scss";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

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
              <caption>A basic table example with a caption</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">OrderTime</TableCell>
                  <TableCell align="right">Status</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {products?.orderDetails.map((item) => {
                  return (
                    <TableRow key={item.food.id}>
                      <TableCell component="th" scope="row">
                        {item.food.name}
                      </TableCell>
                      <TableCell align="right">{item.food.price}.000</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.food.createdAt}</TableCell>
                      <TableCell align="right">{item.food.status}</TableCell>

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
