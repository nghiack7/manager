import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TextField,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  search: {
    marginBottom: theme.spacing(2),
  },
}));

const Products = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [showOrderDialog, setShowOrderDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleFetchDataProducts = async () => {
    try {
      const response = await fetch(`/api/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProducts(data.data); // Assuming data is an array of filtered customers
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or display error message to the user
    }
  };
  useEffect(() => {
    handleFetchDataProducts();
  }, []); // Empty dependency array to execute once on component mount

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/products/?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or display error message to the user
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchButtonClickHandler = () => {
    handleSearch();
  };

  const onShowListOrder = async (name) => {
    try {
      const response = await fetch(`/api/products/?name=${name}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSelectedProduct(name);
      setShowOrderDialog(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or display error message to the user
    }
  };

  const closeOrderDialog = () => {
    setShowOrderDialog(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <TextField
        className={classes.search}
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={searchButtonClickHandler}
      >
        Tìm Kiếm
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số TT</TableCell>
              <TableCell>Tên Sản Phẩm </TableCell>
              <TableCell>Giá (vnđ)</TableCell>
              <TableCell>Lịch Sử Mua Hàng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onShowListOrder(product.name)}
                >
                  Danh Sách Đơn Hàng
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Dialog for displaying orders */}
       <Dialog
        open={showOrderDialog}
        onClose={closeOrderDialog}
        aria-labelledby="order-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="order-dialog-title">
          {`Danh Sách Đơn Hàng cho sản phẩm "${selectedProduct}"`}
        </DialogTitle>
        <DialogContent>
          
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow>
              <TableCell>Đơn hàng </TableCell>
              <TableCell>Giá Trị</TableCell>
              <TableCell>Thời gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.money}</TableCell>
                <TableCell>{order.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOrderDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
