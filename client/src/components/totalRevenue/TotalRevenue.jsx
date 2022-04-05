import React from 'react';
import './totalrevenue.scss';

const TotalRevenue = ({ array }) => {

  function getTotal(array) {
      // Le total est intialisé à 0
      let total = 0;
      array.map((item) => {
        // Chacun des éléments du tableau multiplie sa quantité à son prix à l'unité
        let value = item.quantity * item.unit_price;
        // Les valeurs sont ajoutées au total
        total += value;
      })
      return total;
    }

  // Cette fonction permet de séparer les grands nombres par des virgules
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // La valeur de getTotal est envoyée dans numberWithCommas pour lui insérer des virgules
  // toFixed(2) ne laisse que deux chiffres après la virgule à la valeur de getTotal
  const totalWithCommas = numberWithCommas(getTotal(array).toFixed(2));

  return (
    <div className='total'>
      <span className='total__title'>Revenue</span>
      <span className='total__counter'>{totalWithCommas} €</span>
    </div>
  )
};

export default TotalRevenue;
