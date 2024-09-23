import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CountryFormComponent.css";

const CountryFormComponent = () => {
  const { countries, loading, error } = useSelector((state) => state.countries);
  const [selectedCapital, setSelectedCapital] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCapital) {
      const country = countries.find(
        (c) => Array.isArray(c.capital) && c.capital[0] === selectedCapital
      );
      setSelectedCountry(country);
      if (country && country.translations) {
        const langs = Object.keys(country.translations);
        setLanguages(langs);
        setSelectedLanguage(langs[0] || "");
      } else {
        setLanguages([]);
        setSelectedLanguage("");
      }
    } else {
      setLanguages([]);
      setSelectedLanguage("");
      setSelectedCountry(null);
    }
  }, [selectedCapital, countries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCountry && selectedLanguage) {
      navigate(
        `/countries/${selectedCountry.id}?translation=${selectedLanguage}`
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (countries.length === 0) return <p>Немає доступних країн.</p>;

  return (
    <div className="country-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Виберіть столицю:</label>
          <select
            value={selectedCapital}
            onChange={(e) => setSelectedCapital(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Виберіть столицю --
            </option>
            {countries.map((country) =>
              Array.isArray(country.capital) && country.capital.length > 0 ? (
                <option key={country.id} value={country.capital[0]}>
                  {country.flag} {country.capital[0]}
                </option>
              ) : null
            )}
          </select>
        </div>
        {selectedCountry && languages.length > 0 && (
          <>
            <div>
              <label>Виберіть мову:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Виберіть мову --
                </option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">
              Read more about {selectedCountry.name.official}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CountryFormComponent;
