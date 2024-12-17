async function getPokemonDetails(pokemonName) {
    try {
      // Récupère les données générales
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = await pokemonResponse.json();
      const pokemonId = pokemonData.id
      console.log(pokemonData)
      console.log(pokemonId)
      
      // Récupère les données de l'espèce
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();
  
      // Récupère les endroits où trouver le Pokémon
      const encountersResponse = await fetch(pokemonData.location_area_encounters);
      const encountersData = await encountersResponse.json();
    
      // Poids et taille
      const weight = pokemonData.weight / 10; // en kg
      const height = pokemonData.height / 10; // en m

      // Type
      const pokemonType = []
      pokemonData.types.forEach(index => {
        pokemonType.push(index.type.name)
      });
      
      console.log(`Pokemon Types: ${pokemonType}`)
      // Description
      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
  
      // Cri
      const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
  
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
        <main>
          <div id='profile'>
            <div id='image-type'>
                <img src="${imageUrl}" alt="${pokemonName}"/>
                <p> ${pokemonType} </p>
            </div>
            <div id='text'>
                <strong>Locations:</strong>
                <div id='locations'>                  
                    <p> ${locations.length > 0 ? locations.join(", ") : "Unknown"}</p>
                </div>
                <div id='widthNheight'>
                    <p><strong>Weight:</strong> ${weight} kg</p>
                    <p><strong>Height:</strong> ${height} m</p>
                </div>
            </div>
          </div>
          <div id='description'>
            <strong>${pokemonData.name.toUpperCase()}:</strong>
            <p> ${description}</p>
          </div>
          <audio controls>
            <source src="${cryUrl}" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </main>
      `;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  }
  
  getPokemonDetails("400");
  