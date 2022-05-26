import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getHeroByName } from "../../helpers/getHeroByName";
import { useForm } from "../../hooks/useForm";
import queryString from "query-string";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValue, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValue;
  const heroesFiltred = useMemo(() => getHeroByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* navigate(`/hero/${getHeroByName(name)}`) */
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search Heroes</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Form</h4>
          <hr />
          <form>
            <input
              type="text"
              placeholder="Search a heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              onChange={handleInputChange}
              value={searchText}
            />
            <button
              type="submit"
              className="btn btn-outline-primary  w-100 mt-1"
              onClick={handleSubmit}
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" ? (
            <div className="alert alert-info ">Search a hero</div>
          ) : (
            heroesFiltred.length === 0 && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                Hero "{q}" not found
              </div>
            )
          )}

          {heroesFiltred.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
