import React, { useState, useEffect } from 'react';

const EditCustomer = ({ customer, onUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    setEmail(customer.email);
    setPhoneNumber(customer.phoneNumber);
  }, [customer]);

  const handleUpdate = () => {
    const updatedCustomer = {
      id: customer.id,
      firstName,
      lastName,
      email,
      phoneNumber
    };

    onUpdate(updatedCustomer);
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditCustomer;