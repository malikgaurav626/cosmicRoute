export async function getData() {
  try {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const response = await fetch(
    //   "https://api.le-systeme-solaire.net/rest/bodies/",
    //   options
    // );
    // let data = await response.json();
    // // sort data by name
    // data.bodies.sort((a, b) => {
    //   return a.englishName > b.englishName ? 1 : -1;
    // });
    // data = data.bodies;
    // // filter data so that only main planets are left i.e, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
    // data = data.filter((planet) => {
    //   return (
    //     planet.englishName === "Mercury" ||
    //     planet.englishName === "Venus" ||
    //     planet.englishName === "Earth" ||
    //     planet.englishName === "Mars" ||
    //     planet.englishName === "Jupiter" ||
    //     planet.englishName === "Saturn" ||
    //     planet.englishName === "Uranus" ||
    //     planet.englishName === "Neptune" ||
    //     planet.englishName === "Pluto"
    //   );
    // });

    // download(JSON.stringify(data), "data.json", "application/json");

    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

// function download(content, fileName, contentType) {
//   var a = document.createElement("a");
//   var file = new Blob([content], { type: contentType });
//   a.href = URL.createObjectURL(file);
//   a.download = fileName;
//   a.click();
// }
