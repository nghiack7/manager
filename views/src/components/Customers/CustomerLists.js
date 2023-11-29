import React from "react";
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
} from "@material-ui/core";


const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
  },
  tableHeaderCell: {
    fontWeight: "bold",
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

  return (
    <Paper className={classes.tableContainer}>
     
      <Table >
        <TableHead >
          <TableRow>
            <TableCell sortDirection className={classes.tableHeaderCell}>ID</TableCell>
            <TableCell sortDirection className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Gender</TableCell>
            <TableCell className={classes.tableHeaderCell}>Phone</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            <TableCell className={classes.tableHeaderCell}>Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{customer.number_phone}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEditCustomer(customer.id)}
                >
                  Chỉnh Sửa
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDeleteCustomer(customer.id)}
                >
                  Xóa
                </Button>
              </TableCell>
              <TableCell>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onCreateOrder(customer.id)}
                >
                  Tạo Đơn Hàng Mới
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onGetCustomerHistory(customer.id)}
                >
                  Lịch Sử Mua Hàng
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className={classes.tableFooterRow}>{<TablePagination/>}</TableFooter>
      </Table>
    </Paper>
  );
};

export default CustomerLists;
