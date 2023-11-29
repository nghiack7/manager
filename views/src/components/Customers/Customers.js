import { useContext, useState, useEffect, useCallback } from "react";


import Errors from "../Errors/Errors";
import CustomerLists from "./CustomerLists";
import AddCustomerPopup from "./AddCustomerPopup";
import EditCustomerPopup from "./EditCustomerPopup";
import CreateOrderPopup from "./CreateOrderPopup";


const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showOrderPopup, setShowOrderPopup]= useState(false);
  const [showHistoryPopup, setShowHistoryPopup]= useState(false);
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
      "name": customerData.name,
      "gender": customerData.gender,
      "number_phone": customerData.number_phone,
    }
    const requestOptions = {
      method: "POST",
      heades: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }
    try {
      const response = await fetch("/api/customers/", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        customerData.id = response.data.id;
      }
      
    } catch (error) {
      setErrors(error);
    
    }
    setCustomers((prevCustomers) => [...prevCustomers, customerData]);
    setShowAddPopup(false); // Close add popup after adding customer
  };

  const deleteCustomerHandler = async (customerId) => {
    const requestOptions = {
      method: "DELETE",
      heades: {
        'Content-Type': 'application/json',
      },}
    try {
      const response = await fetch("/api/customers/${customerId}",requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
         
      }
      
    } catch (error) {
      setErrors(error);
    
    }
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.ID !== customerId)
    );
  };

  const showHistoryOrderHandler = async (customerId) => {
    try {
      const response = await fetch("./api/orders/?search=${customerId}");
      if (!response.ok) {
        throw new Error('Network response was not ok');
 
      } else {
        const data = await response.json();
      }

    }
  }

  const editCustomerHandler = (updatedCustomerData) => {
    // Assuming 'updatedCustomerData' contains modified customer information
    // Send PUT/PATCH request to API to update customer data
    // Update 'customers' state upon successful update
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.ID === updatedCustomerData.ID ? updatedCustomerData : customer
      )
    );
    setShowEditPopup(false); // Close edit popup after editing customer
  };


  const getCustomerHistoryHandler = (customerId) => {
    // Send DELETE request to API to remove customer with 'customerId'
    // Update 'customers' state upon successful deletion
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.ID !== customerId)
    );
  };  
  const createOrderHandler = async (orderData) => {
    const postData = {
      customer_id: orderData.customer_id,
      items: orderData.items,
    }
    const requestOptions = {
      method: "POST",
      heades: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }
    try {
      const response = await fetch("/api/orders/", requestOptions);
      const data =await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        console.log("succcessfully created order", data.data)
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

  }
  const showHistoryHandler = (customerId) => {
    const selected = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(selected);
    setShowHistoryPopup(true);

  }
  const closeEditPopupHandler = () => {
    setShowEditPopup(false);
    setSelectedCustomer(null);
  };

  const closeOrderPopupHandler = () => {
    setShowOrderPopup(false);
    setSelectedCustomer(null);  };
    const closeHitoryPopupHandler = () => {
      setShowHistoryPopup(false);
      setSelectedCustomer(null);  };
  const customersContent =
    customers.length === 0 ? (
      <p>Chưa có khách hàng nào!!!</p>
    ) : (
      <CustomerLists
        customers={customers}
        onEditCustomer={showEditPopupHandler}
        onDeleteCustomer={deleteCustomerHandler}
        onCreateOrder={showCreateOrderHandler}
        onGetCustomerHistory={getCustomerHistoryHandler}
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
        <CreateOrderPopup
          onClose={closeHitoryPopupHandler}
          customer={selectedCustomer}
          onCreateOrder={showHistoryOrderHandler}
        />
      )}
    </section>
  );
};

export default Customers;
