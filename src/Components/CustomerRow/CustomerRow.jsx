import React from 'react';

const CustomerRow = ({ customer, onDelete, onEdit ,isFirstRow}) => {
  const handleDelete = () => {
    onDelete(customer.id);
  };
  
  const handleEdit = () => {
    onEdit(customer);
  };
  return (
    <div className={`row pb-4 mb-4 align-items-center${isFirstRow ? ' border-bottom' : ''}`}>
      <div className="col-md-3">
        <img src={customer.picture} className="rounded-circle" alt="" />
      </div>
      <div className="col-md-3">
        <strong>{customer.firstName} {customer.lastName}</strong>
      </div>
      <div className="col-md-3"></div>
      <div className="col-md-3">
        <button className="btn btn-light text-info me-2" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="btn btn-light text-danger" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CustomerRow;