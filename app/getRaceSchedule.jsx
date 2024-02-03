export default async function getRaceSchedule(season) {
  return fetch(`https://ergast.com/api/f1/${season}.json?limit=1000`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const raceSchedule = data.MRData.RaceTable.Races;
      return raceSchedule;
    });
}
