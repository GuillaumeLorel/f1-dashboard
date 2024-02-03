export default async function getQualifyingResults(season, constructorId) {
  const response = await fetch(
    `https://ergast.com/api/f1/${season}/constructors/${constructorId}/qualifying.json?limit=1000`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  // Transformer la structure des données pour inclure le nom du circuit
  const racesWithQualifyingResults = data.MRData.RaceTable.Races.map(
    (race) => ({
      circuitName: race.Circuit.circuitName,
      circuitId: race.Circuit.circuitId,
      qualifyingResults: race.QualifyingResults,
    })
  );

  return racesWithQualifyingResults;
}
