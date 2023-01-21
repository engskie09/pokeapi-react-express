const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const filterPokemonByName = (array, filter) => {

  if (filter === '') {
    return array;
  }

  return array.filter((pokemon) => pokemon.name.includes(filter));
}

export { paginate, filterPokemonByName };