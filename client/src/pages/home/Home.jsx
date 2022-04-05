import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import TotalRevenue from '../../components/totalRevenue/TotalRevenue'
import AverageRevenue from '../../components/averageRevenue/AverageRevenue';
import styled from "styled-components";
import './home.scss';
import axios from 'axios';
import Customers from '../../components/customers/Customers';
import Chart from '../../components/chart/Chart';

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
`

const Option = styled.option`
`

const Home = () => {

  // setCountry récupère la valeur du pays sélectionné dans handleFilters()
  const [country, setCountry] = useState({});
  // À chaque changement d'option du Select, handleFilters récupère l'information du pays choisi
  const handleFilters = (element) => {
    const value = element.target.value;
    // Le pays choisi est stocké dans setCountry
    setCountry(value);
  };

  // setFilteredCountries récupère la data filtré par pays dans getCountries()
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        // Axios appelle l'api de recherche et lui donne la valeur d'un pays sélectionné si elle existe
        const response = await axios.get(country === 'All' ? '/search.json' : `/search.json?q=${country}`);
        // La donnée récupérée par axios est stocké dans setFilteredCountries
        setFilteredCountries(response.data.orders)
      } catch (err) {}
    };
    getCountries();
  }, [country]);

  // Si rien n'est contenu dans filteredCountries alors le tableau est vide et ne créer pas d'erreurs
  const array = filteredCountries || [];

  return (
    <div className='home'>
      <Header />
      <div className="home__country">
        <span className='home__label'>Country</span>
        <Select name="country" onChange={handleFilters}>
          <Option defaultValue >
            All
          </Option>
          <Option>Netherlands</Option>
          <Option>France</Option>
          <Option>Norway</Option>
          <Option>Germany</Option>
          <Option>Australia</Option>
          <Option>EIRE</Option>
          <Option>United</Option>
        </Select>
      </div>
      <div className="home__summary">
        <span className='home__title'>Summary</span>
        <div className='home__widgets'>
          {/* La valeur d'array est envoyé dans les composant widgets */}
          <TotalRevenue array={array} />
          <AverageRevenue array={array} />
          <Customers array={array} />
        </div>
      </div>
      <div className="home__chart">
        <span className='home__title'>Revenue Per Month</span>
        <div className='home__graphique'>
          <Chart array={array} />
        </div>
      </div>
    </div>
  )
};

export default Home;
