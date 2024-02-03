import fetchWikipediaInfo from "@/components/fetchWikipediaInfo";

export default async function getCircuits(season) {
  const response = await fetch(
    `https://ergast.com/api/f1/${season}/circuits.json?limit=1000`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const circuits = data.MRData.CircuitTable.Circuits;

  // Ajouter des informations Wikipedia pour chaque pilote
  const circuitsWithWikipediaInfo = await Promise.all(
    circuits.map(async (circuits) => {
      const wikipediaInfo = await fetchWikipediaInfo(circuits.url);
      return {
        ...circuits,
        wikipediaInfo,
      };
    })
  );

  return circuitsWithWikipediaInfo;
}
