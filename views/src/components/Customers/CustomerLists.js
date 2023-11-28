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
} from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
  },
  tableHeaderCell: {
    fontWeight: "bold",
  },
});

const CustomerLists = ({ customers, onEditCustomer, onDeleteCustomer }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Gender</TableCell>
            <TableCell className={classes.tableHeaderCell}>Phone</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CustomerLists;
