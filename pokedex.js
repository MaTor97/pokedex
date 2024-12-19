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

    console.log(pokemonData)

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
        ? `background: radial-gradient(rgb(0 0 0/20%),rgb(255 255 255/30%)), ${typeColors[0]};`
        : `background: radial-gradient(${typeColors.join(", ")});`;

    // Cri
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
 
    // Image (sprite par défaut)
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png
`;

    // Affichage dans la page
    document.body.innerHTML = `
      <main style="${backgroundStyle}">
        <div id='profile'>
          <div id='image-type'>
            <div id='assets'>
              <div id='name' >
                <p id='one'><strong>${pokemonData.name.toUpperCase()}</strong></p>
              </div>
              <p><strong>Weight:</strong> ${weight} kg</p>
              <p><strong>Height:</strong> ${height} m</p>
                <div id='types'>
                ${pokemonType
                  .map(
                    type => `
                    <div style="background-color: ${pokemonTypes[type]}; color: white; padding: 2px 8px; border-radius: 5px; margin: 10px 0; border : 1px solid black;">
                      ${type.toUpperCase()}
                    </div>`
                  )
                  .join("")}
                </div>
                
                <audio controls>
                  <source src="${cryUrl}" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
              </div>              
              <img src="${imageUrl}" alt="${pokemonName}" />

            </div>
          </div>
            <div id='data'>
                
            </div>
        </div>
      </main>
    `;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}

async function getPokemonEvolution(pokemonId) {
  // Récupère les informations du Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  
  // Récupère l'URL de la chaîne d'évolution
  const evolutionResponse = await fetch(data.species.url);
  const evolutionData = await evolutionResponse.json();
  
  // Récupère l'URL de la chaîne d'évolution
  const evolutionChainResponse = await fetch(evolutionData.evolution_chain.url);
  const evolutionChain = await evolutionChainResponse.json();
  
  // Affiche la chaîne d'évolution
  console.log('Chain d\'évolution: ', evolutionChain);
  
  // Exemple de récupération de l'évolution
  let chain = evolutionChain.chain;
  while (chain) {
    console.log('Évolution:', chain.species.name);
    chain = chain.evolves_to[0];  // Passe à la prochaine évolution (s'il y en a une)
  }
}




getPokemonDetails("27");
