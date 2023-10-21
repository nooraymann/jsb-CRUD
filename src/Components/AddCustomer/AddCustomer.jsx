import React, { useState } from 'react';
import styles from './AddCustomer.module.css';
import placeholder from '../../Assets/placeholder.jpg';

const NewCustomerPage = ({ onAddCustomer }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleAddCustomer = () => {
    const newCustomer = {
      firstName,
      lastName,
      email,
      phone,
      photo
    };

    // Call the onAddCustomer function with the new customer data
    onAddCustomer(newCustomer);

    // Reset form fields and photo state
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPhoto(null);
  };

  const handleCancel = () => {
    // Reset form fields and photo state
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPhoto(null);
  };

  return (
    <div>
      <form className="container-fluid bg-white p-5 text-dark">
        <div>
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="Chosen"
              className={'rounded-pill' + ' ' + styles.sized}
            />
          ) : (
            <img
              src={placeholder}
              alt="Placeholder"
              className={'rounded-pill' + ' ' + styles.sized}
            />
          )}

          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="row m-auto mb-5"
          />
        </div>

        <div className="data row">
          <div className="firstName  col-md-6 mb-5">
            <input
              type="text"
              id="firstName"
              value={firstName}
              className={'form-control ' + ' ' + styles.muted}
              placeholder="First Name"
              onChange={handleFirstNameChange}
            />
          </div>

          <div className="lastName col-md-6">
            <input
              type="text"
              id="lastName"
              value={lastName}
              className={'form-control' + ' ' + styles.muted}
              placeholder="Last Name"
              onChange={handleLastNameChange}
            />
          </div>

          <div className="phone col-md-6 mb-5">
            <input
              type="number"
              id="phone"
              value={phone}
              className={'form-control' + ' ' + styles.muted}
              placeholder="Phone"
              onChange={handlePhone}
            />
          </div>

          <div className="email col-md-6">
            <input
              type="email"
              id="Email"
              value={email}
              className={'form-control' + ' ' + styles.muted}
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className="row justify-content-between">
          <button
            type="button"
            className="col-md-2 rounded-pill btn btn-secondary text-dark"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="col-md-2 rounded-pill btn btn-info text-light"
            onClick={handleAddCustomer}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCustomerPage;