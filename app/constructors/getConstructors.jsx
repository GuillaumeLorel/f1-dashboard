import fetchWikipediaInfo from "@/components/fetchWikipediaInfo";

export default async function getConstructors(season) {
  const response = await fetch(
    `https://ergast.com/api/f1/${season}/constructors.json?limit=1000`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const constructors = data.MRData.ConstructorTable.Constructors;

  // Ajouter des informations Wikipedia pour chaque pilote
  const constructorsWithWikipediaInfo = await Promise.all(
    constructors.map(async (constructor) => {
      const wikipediaInfo = await fetchWikipediaInfo(constructor.url);
      return {
        ...constructor,
        wikipediaInfo,
      };
    })
  );

  return constructorsWithWikipediaInfo;
}
