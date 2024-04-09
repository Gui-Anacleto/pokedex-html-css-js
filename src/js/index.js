const pokeContainer = document.querySelector('#pokeContainer');
const pokemonCount = 150;
const colors = {
  fire: "rgba(255, 69, 0, 0.5)",
  grass: "rgba(152, 215, 165, 0.5)",
  electric: "rgba(255, 255, 0, 0.5)",
  water: "rgba(65, 105, 225, 0.5)",
  ground: "rgba(205, 133, 63, 0.5)",
  rock: "rgba(112, 128, 144, 0.5)",
  fairy: "rgba(255, 192, 203, 0.5)",
  poison: "rgba(123, 104, 238, 0.5)",
  bug: "rgba(34, 139, 34, 0.5)",
  dragon: "rgba(131, 111, 255, 0.5)",
  psychic: "rgba(255, 105, 180, 0.5)",
  flying: "rgba(135, 206, 235, 0.5)",
  fighting: "rgba(255, 165, 0, 0.5)",
  normal: "rgba(245, 245, 245, 0.5)",
  ghost: "rgba(75, 0, 130, 0.5)",
  ice: "rgba(0, 191, 255, 0.5)",
  steel: "rgba(169, 169, 169, 0.5)"
}

const mainTypes = Object.keys(colors)

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemons(i)
  }
}

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data)
}

const createPokemonCard = (poke) => {
  const card = document.createElement('div');
  card.classList.add("pokemon")

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, '0')


  const pokeTypes = poke.types.map(type => type.type.name)


  // const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
  const types = mainTypes.filter(type => pokeTypes.includes(type));

  // console.log('tip', types)

  const color = [colors[types[0]], colors[types[1]]]
  console.log(color)

  if (color[1] === undefined) {
    card.style.background = `linear-gradient(to top right, ${color[0]}, ${color[0]})`;
  }
  card.style.background = `linear-gradient(to top right, ${color[0]}, ${color[1]})`;


  const pokemonInnerHTML = `
  <div class="imagemContainer">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
      alt="${name}"
    />
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span> ${types} </span></small>
  </div>
  `
  card.innerHTML = pokemonInnerHTML

  pokeContainer.appendChild(card)
}

fetchPokemons()

