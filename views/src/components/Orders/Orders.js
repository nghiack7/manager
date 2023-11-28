import React, { useState } from "react";
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    marginBottom: theme.spacing(2),
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/orders?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data); // Assuming data is an array of filtered customers
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số TT</TableCell>
              <TableCell>Danh Sách Đơn Hàng</TableCell>
              <TableCell>Thời Gian Mua</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
