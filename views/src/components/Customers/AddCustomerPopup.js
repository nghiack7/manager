import React, { useState } from "react";
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

const AddCustomerPopup = ({ onClose, onAddCustomer }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    number_phone: "",
    // Add other fields as needed for the customer
  });

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

    // Call the function to add the customer with formData
    onAddCustomer(formData);

    // Reset form data and close the popup
    setFormData({
      name: "",
      gender: "",
      number_phone: "",
      // Reset other fields as needed for the customer
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Thêm Khách Hàng Mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className={classes.form}>
            <TextField
              label="Name"
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
            Add Customer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCustomerPopup;
