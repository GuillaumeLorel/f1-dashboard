import fetchWikipediaInfo from "../../../components/fetchWikipediaInfo";

export default async function getCircuit(season = null, circuitId) {
  const response =
    season === null
      ? await fetch(
          `https://ergast.com/api/f1/circuits/${circuitId}.json?limit=1000`
        )
      : await fetch(
          `https://ergast.com/api/f1/${season}/circuits/${circuitId}.json?limit=1000`
        );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const circuit = data.MRData.CircuitTable.Circuits[0];

  // Ajouter des informations Wikipedia pour chaque pilote
  const wikipediaInfo = await fetchWikipediaInfo(circuit.url);

  return {
    ...circuit,
    wikipediaInfo,
  };
}
