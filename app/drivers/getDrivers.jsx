import fetchWikipediaInfo from "../../components/fetchWikipediaInfo";

export default async function getDrivers(season) {
  const response = await fetch(
    `https://ergast.com/api/f1/${season}/drivers.json?limit=1000`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const drivers = data.MRData.DriverTable.Drivers;

  // Ajouter des informations Wikipedia pour chaque pilote
  const driversWithWikipediaInfo = await Promise.all(
    drivers.map(async (driver) => {
      const wikipediaInfo = await fetchWikipediaInfo(driver.url);
      return {
        ...driver,
        wikipediaInfo,
      };
    })
  );

  return driversWithWikipediaInfo;
}
