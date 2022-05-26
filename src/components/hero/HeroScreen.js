import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroesById } from "../../helpers/getHeroesById";

export const HeroScreen = () => {

  const { heroId } = useParams();

  const navigate = useNavigate();
  const heroes = useMemo( ()=>  getHeroesById(heroId),[heroId] )

  const { id, superhero, alter_ego, publisher, first_appearance, characters } =
    heroes;

  const handleReturn = () => {
    /*  navigate(`${publisher === "DC Comics" ? "/dc": "/"}`, {replace: true}) */
    navigate(-1); 
  };

  if (!heroes) {
    return <Navigate to="/" />;
  }

  const imagePath = `/assets/img/${id}.jpg`;

  return (
    <div className="row mt-5 ">
      <div className="col-4">
        <img src={imagePath} alt={superhero} className="img-thumbnail animate__animated animate__backInLeft" />
      </div>
      <div className="col-8">
        <h3> {superhero} </h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {" "}
            <b>Alter ego: </b> {alter_ego}
          </li>
          <li className="list-group-item">
            {" "}
            <b>Publisher: </b> {publisher}
          </li>
          <li className="list-group-item">
            {" "}
            <b>First Appearence: </b> {first_appearance}
          </li>
        </ul>
        <h5 className="mt-5"> Characters </h5>
        <p>{characters} </p>

        <button className="btn btn-primary" onClick={handleReturn}>
          Return  
        </button>
      </div>
    </div>
  );
};
