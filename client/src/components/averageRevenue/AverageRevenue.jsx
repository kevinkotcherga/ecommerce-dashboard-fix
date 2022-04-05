import React from 'react';
import './averagerevenue.scss';

const AverageRevenue = ({ array }) => {

  // Set ne compte qu'une fois la même valeur dans un tableau
  function countUnique(iterable) {
    // .size permet de connaitre le nombre de valeur
    return new Set(iterable).size;
  }

  // Map des données pour obtenir l'id des commandes
  const getOrderId = array.map((order) => order.order_id);

  // Les id des commandes sont insérés dans countUnique
  const NumberOfUniqueOrders = countUnique(getOrderId);

  function getTotal(array) {
      // Le total est intialisé à 0
      let total = 0;
      array.map((item) => {
        // Chacun des éléments du tableau multiplie sa quantité à son prix à l'unité
        let value = item.quantity * item.unit_price;
        // Les valeurs sont ajoutées au total
        total += value;
      });
      return total;
    }

  // La valeur totale est divisée par le nombre de commandes uniques
  const AverageRevenuePerOrder = getTotal(array) / NumberOfUniqueOrders;

  return (
    <div className='averagerevenue'>
      <span className='averagerevenue__title'>Average revenue per order</span>
      {/* toFixed(2) ne laisse que deux chiffres après la virgule à la valeur */}
      <span className='averagerevenue__counter'>{AverageRevenuePerOrder.toFixed(2)} €</span>
    </div>
  )
};

export default AverageRevenue;
