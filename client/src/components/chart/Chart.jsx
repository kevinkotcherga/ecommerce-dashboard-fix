import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ array }) => {

  function getRevenuePerMonth(array) {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		return [
      /* Un reduce est appliqué à array, il va parcourir le tableau et pour chaque élément appeler la fonction
         avec les paramètres accumulator et current */
			...array
				.reduce((accumulator, current) => {
          // Split sépare les éléments "yyyy", "mm", "dd"
					const [y, m, d] = current.date.split('-');
          // Un tableau commencent par 0, month indiquera la valeur du bon mois avec -1
					const month = months[m - 1];
          // accumulator récupère chaque mois et multiplie leur prix à l'unité par leur quantité
					return accumulator.set(
						month,
						(accumulator.get(month) ?? 0) + current.unit_price * current.quantity,
					);
          // Un nouveau tableau est envoyé avec les nouvelles valeurs
				}, new Map())
				.entries(),
		];
	}

  const revenuePerMonth = getRevenuePerMonth(array);

  // Un map est utilisé pour enlever les chiffres après la virgule et avoir un rendu plus propre
  const removeCommaFromArray = revenuePerMonth.map(item => {
    const months = item[0];
    // toFixed(2) ne laisse que deux chiffres après la virgule à la valeur
    const removeCommaFromNumber = item[1].toFixed(0);

  /*  Cette fonction m'aurait permis de séparer les montants par des virgules pour
   plus de visibilité mais le graphique ne comprend pas cette option : */

  /* function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const removeComaWithcoma = numberWithCommas(removeCommaFromNumber)
   */

    return [months, removeCommaFromNumber]
  })

  return (
    <ResponsiveContainer height="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={removeCommaFromArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid fill="#f8f9fa"/>
        <XAxis dataKey="0" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="1" name='Month' fill="#266399" />
      </BarChart>
    </ResponsiveContainer>
  )
};

export default Chart;
