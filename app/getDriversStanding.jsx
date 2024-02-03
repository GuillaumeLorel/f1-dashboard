export default async function getDriversStanding(season) {
  return fetch(
    `https://ergast.com/api/f1/${season}/driverStandings.json?limit=1000`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const driversStanding = data.MRData.StandingsTable.StandingsLists;
      return driversStanding;
    });
}
