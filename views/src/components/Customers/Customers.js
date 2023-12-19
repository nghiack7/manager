import { useContext, useState, useEffect, useCallback } from "react";

import Errors from "../Errors/Errors";
import CustomerLists from "./CustomerLists";
import AddCustomerPopup from "./AddCustomerPopup";
import EditCustomerPopup from "./EditCustomerPopup";
import CreateOrderPopup from "./CreateOrderPopup";
import HistoryOrderPopup from "./HistoryOrderPopup";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomersHandler = useCallback(async () => {
    setErrors({});

    try {
      const response = await fetch("/api/customers/");
      const data = await response.json();
      if (!response.ok) {
        let errorText = "Fetching customers failed.";
        if (!data.hasOwnProperty("error")) {
          throw new Error(errorText);
        }
        if (typeof data["error"] === "string") {
          setErrors({ unknown: data["error"] });
        } else {
          setErrors(data["error"]);
        }
      } else {
        setCustomers(data.data);
      }
    } catch (error) {
      setErrors({ error: error.message });
    }
  }, []);

  useEffect(() => {
    fetchCustomersHandler();
    const delay = 5000; // 10 seconds in milliseconds

    const timeoutId = setTimeout(() => {
      // Place your code that needs to be delayed here
      console.log("Executing after 5 seconds");
    }, delay);

    return () => clearTimeout(timeoutId); //
  }, [fetchCustomersHandler]);

  const addCustomerHandler = async (customerData) => {
    const postData = {
      name: customerData.name,
      gender: customerData.gender,
      number_phone: customerData.number_phone,
    };
    const requestOptions = {
      method: "POST",
      heades: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    try {
      const response = await fetch("/api/customers/", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json(); // Await JSON parsing
        if (data.success) {
          // Access the id from the data
          const customerId = data.data.id;

          // Create a new customer object with the retrieved id
          const newCustomer = { ...customerData, id: customerId };

          // Update state using the previous state
          setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
          setShowAddPopup(false); // Close add popup after adding customer
        }
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const deleteCustomerHandler = async (customerId) => {

    const requestOptions = {
      method: "DELETE",
      heades: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `/api/customers/${customerId}`,
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        
      }
    } catch (error) {
      setErrors(error);
    }
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== customerId)
     );
     setSelectedCustomer(null);

  };

  const editCustomerHandler = async (updatedCustomerData) => {
    const postData = {
      id: updatedCustomerData.id,
      name: updatedCustomerData.name,
      gender: updatedCustomerData.gender,
      number_phone: updatedCustomerData.number_phone,
    };
    const requestOptions = {
      method: "PUT",
      headers: { // Fixed spelling of "headers"
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    try {
      const response = await fetch(`/api/customers/${updatedCustomerData.id}`, requestOptions); // Updated URL with backticks for template literals
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json(); // Await JSON parsing
        if (data.success) {
          // Access the id from the data
          const customerId = data.data.id;
  
          // Create a new customer object with the retrieved id
          const newCustomer = { ...updatedCustomerData, id: customerId };
  
          // Update state using the previous state
          setCustomers((prevCustomers) => prevCustomers.map(customer => customer.id === customerId ? newCustomer : customer));
          setShowAddPopup(false); // Close add popup after adding customer
        }
      }
    } catch (error) {
      setErrors(error.message); // Use error.message to set error state
    }
  };
  

  const createOrderHandler = async (orderData) => {
    const postData = {
      customer_id: orderData.customer_id,
      items: orderData.items,
    };
    const requestOptions = {
      method: "POST",
      heades: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    try {
      const response = await fetch("/api/orders/", requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log("succcessfully created order", data.data);
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const showEditPopupHandler = (customerId) => {
    const selected = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(selected);
    setShowEditPopup(true);
  };

  const showCreateOrderHandler = (customerId) => {
    const selected = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(selected);
    setShowOrderPopup(true);
  };
  const showHistoryHandler = (customerId) => {
    const selected = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(selected);
    setShowHistoryPopup(true);
  };
  const closeEditPopupHandler = () => {
    setShowEditPopup(false);
    setSelectedCustomer(null);
  };

  const closeOrderPopupHandler = () => {
    setShowOrderPopup(false);
    setSelectedCustomer(null);
  };
  const closeHitoryPopupHandler = () => {
    setShowHistoryPopup(false);
    setSelectedCustomer(null);
  };
  const customersContent =
    customers.length === 0 ? (
      <p>Chưa có khách hàng nào!!!</p>
    ) : (
      <CustomerLists
        customers={customers}
        onEditCustomer={showEditPopupHandler}
        onDeleteCustomer={deleteCustomerHandler}
        onCreateOrder={showCreateOrderHandler}
        onGetCustomerHistory={showHistoryHandler}
      />
    );

  const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);

  return (
    <section>
      <h1 className="pb-4">Danh Sách Khách Hàng</h1>
      <button onClick={() => setShowAddPopup(true)}>Thêm Khách Hàng Mới</button>
      {errorContent}
      {customersContent}

      {showAddPopup && (
        <AddCustomerPopup
          onClose={() => setShowAddPopup(false)}
          onAddCustomer={addCustomerHandler}
        />
      )}

      {showEditPopup && selectedCustomer && (
        <EditCustomerPopup
          onClose={closeEditPopupHandler}
          customer={selectedCustomer}
          onEditCustomer={editCustomerHandler}
        />
      )}
      {showOrderPopup && selectedCustomer && (
        <CreateOrderPopup
          onClose={closeOrderPopupHandler}
          customer={selectedCustomer}
          onCreateOrder={createOrderHandler}
        />
      )}
      {showHistoryPopup && selectedCustomer && (
        <HistoryOrderPopup
          onClose={closeHitoryPopupHandler}
          customer={selectedCustomer}
        />
      )}
    </section>
  );
};

export default Customers;
