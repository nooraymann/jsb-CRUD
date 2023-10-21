import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddCustomer from '../AddCustomer/AddCustomer';
import CustomerRow from '../CustomerRow/CustomerRow';
import EditCustomer from '../EditCustomer/EditCustomer';
import styles from './CustomerList.module.css';


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [showNewCustomerPage, setShowNewCustomerPage] = useState(false);
  
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://dummyapi.io/data/v1/user', {
                    headers: { 'app-id': '64fc4a747b1786417e354f31' },
                });
                setCustomers(response.data.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDeleteCustomer = (customerId) => {
        setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.id !== customerId)
        );
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleAddCustomer = async (newCustomer) => {
        try {
          // Make a POST request to the API endpoint
          const response = await axios.post('https://dummyapi.io/data/v1/user/create', newCustomer, {
            headers: {
              'app-id': '64fc4a747b1786417e354f31',
              'Content-Type': 'application/json',
            },
          });
    
          // Check if the request was successful
          if (response.status === 200) {
            // Add the new customer to the list
            setCustomers((prevCustomers) => [...prevCustomers, response.data]);
    
            // Hide the new customer page
            setShowNewCustomerPage(false);
          }
        } catch (error) {
          // Handle any error that occurred during the API request
          console.error('Error adding customer:', error, newCustomer);
        }
      };
    const handleEditCustomer = (customer) => {
        setEditingCustomerId(customer.id);
    };

    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        setEditingCustomerId(null);
    };

    const handleCancelEdit = () => {
        setEditingCustomerId(null);
    };

    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const filteredCustomers = customers.filter(
        (customer) =>
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );

   
    return (
        <div className={styles.bg } >
<div className='container border text-center rounded p-5'>
            {!showNewCustomerPage ? (
                <>
                    {<div >
                        {/* search */}
                        <div className='search row g-0'>
                            <label for="search" class="visually-hidden ">Search</label>
                            <input className="form-control rounded-pill" type="text" id="search" placeholder="Search by name" value={searchQuery} onChange={handleSearch}/>
                        </div>
                        <div className='button row m-4'>
                        <button className='btn btn-info text-light rounded col-md-3 ms-auto ' onClick={() => setShowNewCustomerPage(true)}>
                        <i class="fa-solid fa-plus fa-lg"></i>  Add New Customer
                    </button>
                        </div>
    
                        {editingCustomerId ? (
                            <EditCustomer
                                customer={customers.find((customer) => customer.id === editingCustomerId)}
                                onUpdate={handleUpdateCustomer}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            currentCustomers.map((customer) => (
                                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onDelete={handleDeleteCustomer}
                  onEdit={handleEditCustomer}
                  isFirstRow={customer.id === currentCustomers[0].id} 
                />
                            ))
                        )}
                    
<div className="pagination ">
    <div className="buttons w-0 ms-auto">

    <button
        className="btn btn-transparent border-none text-white"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
       <i class="fa-solid fa-angle-left"></i>
      </button>
      <span className="page-info">
        {currentPage}/{totalPages}
      </span>
      <button
        className="btn btn-transparent border-none text-white"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
       <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  
    </div>
                    </div>}
                   
                </>
            ) : (
            <div className={styles.addCustomerForm}> <AddCustomer onAddCustomer={handleAddCustomer} /></div>
            )}
        </div>
        </div>
    );

};

export default CustomerList;