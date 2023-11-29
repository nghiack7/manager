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
    width: "400px",
    padding: theme.spacing(2),
  },
  selectField: {
    marginBottom: theme.spacing(2),
  },
  quantityField: {
    marginBottom: theme.spacing(2),
  },
  addItemButton: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const CreateOrderPopup = ({ onClose, customer, onCreateOrder }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    customer_id: 0,
    items: [
      {
        product_id: 0,
        quantity: 0,
      },
    ],
  });
  const [products, setProducts] = useState([]);
  const [itemCount, setItemCount] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Fetching products failed.");
        } else {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = field === 'quantity' ? (isNaN(parseInt(value)) ? value : parseInt(value)) : value;
     setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  const handleAddItem = () => {
    setItemCount((prevCount) => prevCount + 1);
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          product_id: "",
          quantity: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.customer_id = customer.id;
    onCreateOrder(formData);
    setFormData({
      customer_id: 0,
      items: [{ product_id: "", quantity: 0 }],
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Tạo Đơn Hàng Mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className={classes.form}>
            {[...Array(itemCount)].map((_, index) => (
              <div key={index}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.selectField}
                >
                  <InputLabel id={`product-label-${index}`}>
                    Chọn sản phẩm
                  </InputLabel>
                  <Select
                    labelId={`product-label-${index}`}
                    value={formData.items[index].product_id}
                    onChange={(e) =>
                      handleItemChange(index, "product_id", e.target.value)
                    }
                    label="Product"
                  >
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Số lượng"
                  type="number"
                  value={formData.items[index].quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  className={classes.quantityField}
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              className={classes.addItemButton}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Tạo Đơn Hàng
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateOrderPopup;
