const specialCases = {
  Alexander_Albon: "Alex_Albon",
  Melbourne_Grand_Prix_Circuit: "Albert_Park_Circuit",
  "Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace": "Interlagos_Circuit",
  Jeddah_Street_Circuit: "Jeddah_Corniche_Circuit",
  Autodromo_Nazionale_Monza: "Monza_Circuit",
  Suzuka_Circuit: "Suzuka_International_Racing_Course",
  "Las_Vegas_Grand_Prix#Circuit": "Las_Vegas_Grand_Prix",
};

export default async function fetchWikipediaInfo(url) {
  try {
    let title = url.replace("http://en.wikipedia.org/wiki/", "");
    title = title.replace("https://en.wikipedia.org/wiki/", "");

    title = specialCases[title] || title;

    // Récupérer le résumé
    const summaryResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
    );
    if (!summaryResponse.ok) return null;
    const summaryData = await summaryResponse.json();
    const summary = summaryData.extract;

    // Récupérer l'image principale
    const imageResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&piprop=original&titles=${title}`
    );
    if (!imageResponse.ok) return { summary };
    const imageData = await imageResponse.json();
    const page = imageData.query.pages[Object.keys(imageData.query.pages)[0]];
    const imageUrl = page.original ? page.original.source : "/no-image.svg";

    return { summary, imageUrl };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Wikipedia:",
      error
    );
    return null;
  }
}
