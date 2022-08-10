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
  let id = useParams();


  useEffect(() => {

    
    fetch(`https://order-foods.herokuapp.com/api/v1/orders + ${id}`)
      .then((response) => response.json())
      .then((products) => {
        console.log("Success:", products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
    
        
      {/* <div id="order-details">
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>A basic table example with a caption</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.fullName}
                    </TableCell>
                    <TableCell align="right">{product.totalPrice}</TableCell>
                    <TableCell align="right">{product.fat}</TableCell>
                        <TableCell align="right">{product.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div> */}
    </>
  );
};
export default withRouter(OrderDetails);
