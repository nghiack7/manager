import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
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
  actionButton: {
    marginRight: 5,
  },
  createOrderButton: {
    marginRight: 5,
    backgroundColor: "#2196F3", // Create Order button background color
    color: "#FFFFFF", // Create Order button text color
    "&:hover": {
      backgroundColor: "#1976D2", // Hover color for Create Order button
    },
  },
});

const Orders = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchDataOrders = async () => {
    try {
      const response = await fetch(`/api/orders/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.data); // Assuming data is an array of filtered orders
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or display error message to the user
    } 
  }
  useEffect(()=>{
    fetchDataOrders();
  },[]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/orders/customer?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.data); // Assuming data is an array of filtered orders
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TextField
        className={classes.search}
        label="Search by Name or Phone"
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
            {/* Table header */}
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Số TT</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Khách Hàng
              </TableCell> 
              <TableCell className={classes.tableHeaderCell}>
                Danh Sách Đơn Hàng
              </TableCell>
          
              <TableCell className={classes.tableHeaderCell}>
                Thời Gian Mua
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Display data in table rows */}
            {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                <TableRow key={order.id} className={classes.tableRow}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>
                          ID
                        </TableCell>
                        
                        <TableCell className={classes.tableHeaderCell}>
                          Tên Sản Phẩm
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell}>
                          Số Lượng
                        </TableCell>
                        {/* Add more table headers as needed */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.product_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            {/* Add more item details */}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2}>No items found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  </TableCell>
                  <TableCell>{order.created_at}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={searchResults.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Orders;
