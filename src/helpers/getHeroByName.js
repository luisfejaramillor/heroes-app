import { heroes } from "../data/heroes";

export const getHeroByName = (name = "") => {
  /* const {id} = heroes.find( hero => hero.superhero === name)
    return id */
  if (name.length === 0) {
    return [];
  }
  name = name.toLowerCase();
  const filtredHero = heroes.filter((hero) =>
    hero.superhero.toLowerCase().includes(name)
  );

  return filtredHero;
};
