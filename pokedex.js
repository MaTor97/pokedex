const pokemonTypes = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

async function getPokemonDetails(pokemonName) {
  try {
    // Récupère les données générales
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await pokemonResponse.json();
    const pokemonId = pokemonData.id;

    // Poids et taille
    const weight = pokemonData.weight / 10; // en kg
    const height = pokemonData.height / 10; // en m

    // Type
    const pokemonType = [];
    pokemonData.types.forEach(index => {
      pokemonType.push(index.type.name);
    });

    // Définir les couleurs en fonction des types
    const typeColors = pokemonType.map(type => pokemonTypes[type]);
    const backgroundStyle =
      typeColors.length === 1
        ? `background: linear-gradient(45deg, rgb(0 0 0/20%),rgb(255 255 255/30%)), ${typeColors[0]};`
        : `background: linear-gradient(45deg, ${typeColors.join(", ")});`;

    // Cri
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;

    // Image (sprite par défaut)
    const imageUrl = pokemonData.sprites.front_default;

    // Affichage dans la page
    document.body.innerHTML = `
      <main style="${backgroundStyle}">
        <div id='profile'>
          <div id='image-type'>
            <img src="${imageUrl}" alt="${pokemonName}" />
            <div id='data'>
              <p><strong>${pokemonData.name.toUpperCase()}</strong></p>
            <div id='assets'>
              <p><strong>Weight</strong></br> ${weight} kg</p>
              ${pokemonType
                .map(
                  type => `
                  <div style="background-color: ${pokemonTypes[type]}; color: white; padding: 5px; border-radius: 5px; margin-top: 5px; border : 1px solid black;">
                    ${type.toUpperCase()}
                  </div>`
                )
                .join("")}
                <p><strong>Height</strong></br> ${height} m</p>
              </div>
              <audio controls>
                <source src="${cryUrl}" type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
        
      </main>
    `;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}

getPokemonDetails("60");
