import fetchWikipediaInfo from "../../../components/fetchWikipediaInfo";

export default async function getConstructor(season = null, constructorId) {
  const response =
    season === null
      ? await fetch(
          `https://ergast.com/api/f1/constructors/${constructorId}.json?limit=1000`
        )
      : await fetch(
          `https://ergast.com/api/f1/${season}/constructors/${constructorId}.json?limit=1000`
        );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const constructor = data.MRData.ConstructorTable.Constructors[0];

  // Ajouter des informations Wikipedia pour chaque pilote
  const wikipediaInfo = await fetchWikipediaInfo(constructor.url);

  return {
    ...constructor,
    wikipediaInfo,
  };
}
