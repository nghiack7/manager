import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "300px",
  },
}));

const EditCustomerPopup = ({ onClose, customer, onEditCustomer }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    number_phone: "",
    // Add other fields as needed for the customer
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        gender: customer.gender || "",
        number_phone: customer.number_phone || "",
        // Set other fields based on 'customer' data
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here if needed

    onEditCustomer({
      ...formData,
      id: customer.id, // Assuming 'ID' is the unique identifier for customers
    });

    setFormData({
      name: "",
      gender: "",
      number_phone: "",
      // Reset other fields as needed for the customer
    });
    onClose();
  };

  return (
    <Dialog open={Boolean(customer)} onClose={onClose}>
      <DialogTitle>Chỉnh Sửa Thông Tin Khách Hàng</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className={classes.form}>
            <TextField
              label="Họ và Tên"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="gender-label">Giới Tính</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                label="Gender"
                name="gender"
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                {/* Add other gender options as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Số Điện Thoại"
              type="text"
              name="number_phone"
              value={formData.number_phone}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            {/* Add other input fields for the customer */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update Customer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCustomerPopup;
