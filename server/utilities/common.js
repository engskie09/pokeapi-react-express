const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const filterPokemonByName = (array, name) => {

  if (name === '') {
    return array;
  }

  return array.filter((pokemon) => pokemon.name.includes(name));
}

export { paginate, filterPokemonByName };