import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  makeStyles,
  TablePagination,
  TableFooter,
  TextField,
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
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5', // Alternate row color
    },
    '&:hover': {
      backgroundColor: '#EEEEEE', // Hover color
    },
  },
  actionButton: {
    marginRight: 5,
  },
  createOrderButton: {
    marginRight: 5,
    backgroundColor: "#2196F3", // Create Order button background color
    color: "#FFFFFF", // Create Order button text color
    '&:hover': {
      backgroundColor: "#1976D2", // Hover color for Create Order button
    },
  },
});

const CustomerLists = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onCreateOrder,
  onGetCustomerHistory,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.number_phone.includes(searchQuery)
  );

  const paginatedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page when changing the search query
  };

  return (
    <Paper className={classes.tableContainer}>
      <TextField
        label="Tìm kiếm Tên or SDT"
        value={searchQuery}
        onChange={handleSearch}
        variant="outlined"
        margin="normal"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Tên Khách Hàng</TableCell>
            <TableCell className={classes.tableHeaderCell}>Giới Tính</TableCell>
            <TableCell className={classes.tableHeaderCell}>SDT</TableCell>
            <TableCell className={classes.tableHeaderCell}>Hành Động</TableCell>
            <TableCell className={classes.tableHeaderCell}>Đơn Hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCustomers.map((customer) => (
            <TableRow key={customer.id} className={classes.tableRow}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{customer.number_phone}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEditCustomer(customer.id)}
                  className={classes.actionButton}
                >
                  Chỉnh Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteCustomer(customer.id)}
                  className={classes.actionButton}
                >
                  Xóa
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => onCreateOrder(customer.id)}
                  className={classes.createOrderButton}
                >
                  Tạo Đơn Hàng Mới
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onGetCustomerHistory(customer.id)}
                  className={classes.actionButton}
                >
                  Lịch Sử Mua Hàng
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={3}
              count={customers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default CustomerLists;
