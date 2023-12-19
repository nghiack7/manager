import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  TableFooter,
  TablePagination,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  // Additional styles as needed
}));

const handleTIme = (orderTime) => {
  const formattedTime = new Date(orderTime).toLocaleString(); // Basic formatting
  return formattedTime;
};
const HistoryOrderPopup = ({ onClose, customer }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Fetch orders based on customer ID
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/customer?search=${customer.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrders(data.data);
          }
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchOrders();
  }, [customer.id]);
  // Inside your component...
  if (loading) {
    return (
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress /> {/* Material-UI circular loading indicator */}
        </div>
      </DialogContent>
    );
  }
 // Extract the orders to be displayed based on pagination
 const indexOfLastOrder = (page + 1) * rowsPerPage;
 const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
 const paginatedOrders = orders && orders.length > 0 ? orders.slice(indexOfFirstOrder, indexOfLastOrder):[];
 const ordersCount = orders ? orders.length : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle className={classes.title}>
        Lịch Sử Đơn Hàng của {customer.name}
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>ID</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Ngày Tạo
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Danh Sách Hàng Hóa
              </TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{handleTIme(order.created_at)}</TableCell>
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
                {/* Add more table cells with order details */}
              </TableRow>
            ))}
          </TableBody>
        
        </Table>
        {!loading && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={3}
                count={ordersCount}
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
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryOrderPopup;
