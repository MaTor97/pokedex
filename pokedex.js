async function getPokemonDetails(pokemonName) {
    try {
      // Récupère les données générales
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = await pokemonResponse.json();
      
      // Récupère les données de l'espèce
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();
  
      // Récupère les endroits où trouver le Pokémon
      const encountersResponse = await fetch(pokemonData.location_area_encounters);
      const encountersData = await encountersResponse.json();
  
      // Poids et taille
      const weight = pokemonData.weight / 10; // en kg
      const height = pokemonData.height / 10; // en m
  
      // Description
      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
  
      // Cri
      const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`;
  
      // Localisations
      const locations = encountersData.map(encounter => encounter.location_area.name);
  
      // Image (sprite par défaut)
      const imageUrl = pokemonData.sprites.front_default;
  
      console.log(`Name: ${pokemonName}`);
      console.log(`Weight: ${weight} kg`);
      console.log(`Height: ${height} m`);
      console.log(`Description: ${description}`);
      console.log(`Cry: ${cryUrl}`);
      console.log(`Locations: ${locations.join(", ")}`);
      console.log(`Image URL: ${imageUrl}`);
  
      // Affichage dans la page
      document.body.innerHTML = `
        <div style="text-align: center; font-family: Arial; margin-top: 20px;">
          <h1>${pokemonName.toUpperCase()}</h1>
          <img src="${imageUrl}" alt="${pokemonName}" style="width: 200px; height: auto;" />
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Height:</strong> ${height} m</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Locations:</strong> ${locations.length > 0 ? locations.join(", ") : "Unknown"}</p>
          <audio controls>
            <source src="${cryUrl}" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      `;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  }
  
  getPokemonDetails('bulbasaur');
  