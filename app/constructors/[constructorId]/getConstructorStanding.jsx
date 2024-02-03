export default async function getConstructorStanding(constructorId) {
  return fetch(
    `https://ergast.com/api/f1/constructors/${constructorId}/constructorStandings.json?limit=1000`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const constructorStandings = data.MRData.StandingsTable.StandingsLists;
      return constructorStandings;
    });
}
