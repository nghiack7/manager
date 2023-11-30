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
  tableContainer: {
    margin: "20px auto",
    maxWidth: "80%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#37474F", // Header background color
    color: "#FFFFFF", // Header text color
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5", // Alternate row color
    },
    "&:hover": {
      backgroundColor: "#EEEEEE", // Hover color
    },
  },
  emptyCell: {
    textAlign: "center",
    fontStyle: "italic",
    color: "red",
  },
  button: {
    color: "#FFFFFF", // Button text color
    backgroundColor: "#2196F3", // Button background color
    "&:hover": {
      backgroundColor: "#1976D2", // Hover color for button
    },
  },
  cellText: {
    fontFamily: 'Arial, sans-serif', // Example font family
    fontSize: '14px', // Example font size
    color: "black",
    fontWeight: "bold",
    // Add other font properties as needed
  },
}));

const Products = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showCreateProductDialog, setShowCreateProductDialog] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);

  const handleFetchDataProducts = async () => {
    try {
      const response = await fetch(`/api/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.data); // Assuming data is an array of filtered customers
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or display error message to the user
    }
  };
  useEffect(() => {
    handleFetchDataProducts();
  }, []); // Empty dependency array to execute once on component mount

  const handleSearch = async () => {
    if (searchTerm === "") {
      handleFetchDataProducts();
    }
    try {
      const response = await fetch(`/api/products/info?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        setProducts(data.data);
      }
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

  const onShowListOrder = async (product) => {
    try {
      const response = await fetch(`/api/products/orders/${product.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success){
        setOrderHistory(data.data);
      }
      setSelectedProduct(product.name);
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
  const handleCreateProduct = async () => {
    try {
      const price = parseFloat(newProductPrice); // Parse price to float

      if (isNaN(price)) {
        // Handle invalid price input
        console.error('Invalid price');
        return;
      }
      // Perform an API request to create a new product
      const response = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProductName,
          price: price,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // If successful, close the dialog and refresh product data
      setShowCreateProductDialog(false);
      handleFetchDataProducts(); // Refresh product data
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error state or display error message to the user
    }
  };

  const closeCreateProductDialog = () => {
    setShowCreateProductDialog(false);
    // Reset input fields or any necessary state variables related to creating a new product
    setNewProductName('');
    setNewProductPrice(0);
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
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Số TT</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Tên Sản Phẩm
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Giá (vnđ)
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Tổng Số Tiền Đã Bán Được
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Lịch Sử Mua Hàng
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className={classes.emptyCell}>
                  Sản Phẩm Không Tồn Tại! Vui lòng kiểm tra lại
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className={classes.tableRow}>
                  <TableCell className={classes.cellText}>{product.id}</TableCell>
                  <TableCell className={classes.cellText}>{product.name}</TableCell>
                  <TableCell className={classes.cellText}>{product.price}</TableCell>
                  <TableCell className={classes.cellText}>{product.total}</TableCell> 
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onShowListOrder(product)}
                      className={classes.button}
                    >
                      Danh Sách Đơn Hàng
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCreateProductDialog(true)}
      >
        Tạo Sản Phẩm Mới
      </Button>

      {/* Dialog for creating a new product */}
      <Dialog
        open={showCreateProductDialog}
        onClose={closeCreateProductDialog}
        aria-labelledby="create-product-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="create-product-dialog-title">
          Tạo Sản Phẩm Mới
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Sản Phẩm"
            variant="outlined"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Giá Sản Phẩm (vnđ)"
            variant="outlined"
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateProductDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleCreateProduct} color="primary">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
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
                  <TableCell className={classes.tableHeaderCell}>Đơn hàng </TableCell>
                  <TableCell className={classes.tableHeaderCell}>Khách hàng </TableCell> 
                  <TableCell className={classes.tableHeaderCell}>Giá Trị Đơn Hàng Cho Sản Phẩm</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Thời gian</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.length === 0 ? (
                 <TableRow>
                 <TableCell colSpan={4} className={classes.emptyCell}>
                   Sản Phẩm Này Chưa Bán Được Đơn Hàng Nào Cả
                 </TableCell>
               </TableRow> 
                ):(
                  orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.created_at}</TableCell>
                  </TableRow>
                )))}
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
