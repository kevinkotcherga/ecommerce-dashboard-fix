import React from 'react';
import './customers.scss';

const Customers = ({ array }) => {

  // Set ne compte qu'une fois la même valeur dans un tableau
  function countUnique(iterable) {
    // .size permet de connaitre le nombre de valeur
    return new Set(iterable).size;
  }
  // Map des données pour obtenir l'id des clients
  const customers = array.map((customer) => customer.customer_id)
  // La valeur de customers est envoyée dans countUnique
  const NumberOfCustomers = countUnique(customers)

  return (
    <div className='customers'>
        <span className='customers__title'>Customers</span>
        <span className='customers__counter'>{NumberOfCustomers}</span>
    </div>
  )
};

export default Customers;
