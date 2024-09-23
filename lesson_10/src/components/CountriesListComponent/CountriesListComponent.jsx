import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCountry } from "../../redux/slices/countrySlice";
import { Link } from "react-router-dom";
import "./CountriesListComponent.css";

const CountriesListComponent = () => {
  const { countries, loading, error } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю країну?")) {
      dispatch(deleteCountry(id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (countries.length === 0) return <p>Немає доступних країн.</p>;

  return (
    <div className="countries-list">
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <div className="country-info">
              <span>{country.flag}</span>
              <Link to={`/countries/${country.id}`}>
                {country.name.official}
              </Link>
            </div>
            <button onClick={() => handleDelete(country.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesListComponent;
