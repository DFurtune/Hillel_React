import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCountry } from "../../redux/slices/countrySlice";
import RecursiveList from "../RecursiveList/RecursiveList";
import RedirectButtonComponent from "../RedirectButtonComponent/RedirectButtonComponent";
import './CountryCardComponent.css'

const CountryCardComponent = () => {
  const { countryId } = useParams();
  const [searchParams] = useSearchParams();
  const { countries, loading, error } = useSelector((state) => state.countries);
  const [country, setCountry] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const foundCountry = countries.find((c) => c.id === countryId);
    setCountry(foundCountry);
  }, [countryId, countries]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!country) return <p>Country not found.</p>;

  const translation = searchParams.get("translation");
  let countryName = country.name.official;

  if (
    translation &&
    country.translations &&
    country.translations[translation]
  ) {
    countryName = country.translations[translation].official;
  }

  const handleDelete = () => {
    if (window.confirm("Ви впевнені, що хочете видалити цю країну?")) {
      dispatch(deleteCountry(country.id));
      navigate("/countries");
    }
  };

  return (
    <div className="country-card">
      <h3>{countryName}</h3>
      <div className="country-details">
        <RecursiveList data={country} />
      </div>
      <button onClick={handleDelete}>Delete</button>
      <RedirectButtonComponent to="/countries" text="Back to Countries" />
    </div>
  );
};

export default CountryCardComponent;
