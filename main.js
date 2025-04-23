document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const pokemonGallery = document.getElementById('pokemon-gallery');
    const pokemonNameInput = document.getElementById('pokemon-name');
    const pokemonImageInput = document.getElementById('pokemon-image');
    const addPokemonButton = document.getElementById('add-pokemon');

    // Imágenes predeterminadas de Pokémon para usar cuando el usuario hace clic en una imagen
    const defaultPokemonImages = [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',  // Pikachu
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',   // Bulbasaur
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',   // Charmander
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',   // Squirtle
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png', // Mewtwo
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',  // Jigglypuff
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png', // Snorlax
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'  // Eevee
    ];

    // Agregar un nuevo Pokémon
    addPokemonButton.addEventListener('click', () => {
        const name = pokemonNameInput.value.trim();
        let imageUrl = pokemonImageInput.value.trim();
        
        if (!name) {
            alert('Por favor ingresa un nombre para el Pokémon');
            return;
        }
        
        // Si no se proporciona URL, usar una imagen aleatoria
        if (!imageUrl) {
            const randomIndex = Math.floor(Math.random() * defaultPokemonImages.length);
            imageUrl = defaultPokemonImages[randomIndex];
        }
        
        // Crear la tarjeta del Pokémon usando insertAdjacentHTML
        const pokemonCardHTML = `
            <div class="pokemon-card">
                <button class="delete-btn">X</button>
                <img class="pokemon-image" src="${imageUrl}" alt="${name}">
                <div class="pokemon-name">${name}</div>
            </div>
        `;
        
        pokemonGallery.insertAdjacentHTML('beforeend', pokemonCardHTML);
        
        // Limpiar los campos del formulario
        pokemonNameInput.value = '';
        pokemonImageInput.value = '';
        
        // Agregar eventos a la nueva tarjeta
        const newCard = pokemonGallery.lastElementChild;
        addCardEvents(newCard);
    });

    // Función para agregar eventos a cada tarjeta de Pokémon
    function addCardEvents(card) {
        const deleteBtn = card.querySelector('.delete-btn');
        const pokemonImage = card.querySelector('.pokemon-image');
        
        // Evento para eliminar la tarjeta
        deleteBtn.addEventListener('click', () => {
            card.remove();
        });
        
        // Evento para reemplazar la imagen al hacer clic
        pokemonImage.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * defaultPokemonImages.length);
            const newImage = document.createElement('img');
            newImage.src = defaultPokemonImages[randomIndex];
            newImage.alt = pokemonImage.alt;
            newImage.className = 'pokemon-image';
            
            // Aplicar el método replaceChild para cambiar la imagen
            card.replaceChild(newImage, pokemonImage);
            
            // Volver a agregar el evento click a la nueva imagen
            newImage.addEventListener('click', () => {
                const nextRandomIndex = Math.floor(Math.random() * defaultPokemonImages.length);
                newImage.src = defaultPokemonImages[nextRandomIndex];
            });
        });
        
        // Eventos para animar la tarjeta con mouseenter y mouseleave
        card.addEventListener('mouseenter', () => {
            // Usar la API Web Animations para animar la tarjeta
            card.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' }
            ], {
                duration: 300,
                fill: 'forwards',
                easing: 'ease-out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.animate([
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                fill: 'forwards',
                easing: 'ease-in'
            });
        });
    }

    // Agregar algunos Pokémon por defecto al cargar la página
    const defaultPokemon = [
        { name: 'Pikachu', image: defaultPokemonImages[0] },
        { name: 'Bulbasaur', image: defaultPokemonImages[1] },
        { name: 'Charmander', image: defaultPokemonImages[2] }
    ];
    
    defaultPokemon.forEach(pokemon => {
        const pokemonCardHTML = `
            <div class="pokemon-card">
                <button class="delete-btn">X</button>
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}">
                <div class="pokemon-name">${pokemon.name}</div>
            </div>
        `;
        
        pokemonGallery.insertAdjacentHTML('beforeend', pokemonCardHTML);
        const newCard = pokemonGallery.lastElementChild;
        addCardEvents(newCard);
    });
});