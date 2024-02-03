import fetchWikipediaInfo from "../../../components/fetchWikipediaInfo";

export default async function getDriver(season = null, driverId) {
  const response =
    season === null
      ? await fetch(
          `https://ergast.com/api/f1/drivers/${driverId}.json?limit=1000`
        )
      : await fetch(
          `https://ergast.com/api/f1/${season}/drivers/${driverId}.json?limit=1000`
        );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const driver = data.MRData.DriverTable.Drivers[0];

  // Ajouter des informations Wikipedia pour chaque pilote
  const wikipediaInfo = await fetchWikipediaInfo(driver.url);

  return {
    ...driver,
    wikipediaInfo,
  };
}
