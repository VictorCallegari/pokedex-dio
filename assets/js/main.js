const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonList = document.getElementById('pokemonList');
const limit = 6;
let offset = 0;

function convertPokemonToLi(pokemon) {
    const paddedNumber = String(pokemon.number).padStart(4, '0');
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${paddedNumber}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`;
}

function appendPokemonToDOM(pokemons) {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            appendPokemonToDOM(pokemons);
        })
        .catch((error) => {
            console.error('Error loading Pokemon items:', error);
            // Trate o erro conforme necessário (por exemplo, exibindo uma mensagem para o usuário)
        });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItems(offset, limit);
});






