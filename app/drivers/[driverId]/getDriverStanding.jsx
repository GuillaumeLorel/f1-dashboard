export default async function getDriverStanding(driverId) {
  return fetch(
    `https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json?limit=1000`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const driverStandings = data.MRData.StandingsTable.StandingsLists;
      return driverStandings;
    });
}
