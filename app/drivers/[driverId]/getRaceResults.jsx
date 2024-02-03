export default async function getRaceResults(season, driverId) {
  const response = await fetch(
    `https://ergast.com/api/f1/${season}/drivers/${driverId}/results.json?limit=1000`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const results = data.MRData.RaceTable.Races;

  return results;
}
