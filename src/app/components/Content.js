'use client'

import { useState, useEffect } from 'react'
import {
  Image,
  Grid,
  Box,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  InputLeftElement,
  Wrap,
  WrapItem,
  SlideFade
} from '@chakra-ui/react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { MdCatchingPokemon, MdEgg } from 'react-icons/md'
import { PiCircleHalfFill, PiCircleNotchFill } from 'react-icons/pi'
import { TbCirclesFilled } from 'react-icons/tb'
import { IoMdRefresh } from 'react-icons/io'
import { ItemContainer } from './ItemContainer'
import { Item } from './Item'
import { FaShieldCat } from 'react-icons/fa6'
import { IoMale } from 'react-icons/io5'
import { IoMdFemale } from 'react-icons/io'
import { FaRegEyeSlash } from 'react-icons/fa'

export const Content = () => {
  const [showDescending, setShowDescending] = useState(false)
  const [pokemonData, setPokemonData] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [hiddenAbilityEffect, setHiddenAbilityEffect] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [visibleItemPokemon, setVisibleItemPokemon] = useState([]);

 const itemsPerPage = 6

  
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon/?limit=51'
        )
        const data = await response.json()
        // Fetch additional details for each Pokemon
        const pokemonWithDetails = await Promise.all(
          data.results.map(async pokemon => {
            const response = await fetch(pokemon.url)
            const details = await response.json()
            return { ...pokemon, details }
          })
        )
        setPokemonData(pokemonWithDetails)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
      }
    }
    fetchPokemonData()
  }, [])

  const handlePokemonClick = pokemon => {
    setSelectedPokemon(pokemon)
    fetchHiddenAbilityEffect(pokemon)
  }

  const fetchHiddenAbilityEffect = async pokemon => {
    const hiddenAbility = pokemon.details.abilities.find(
      ability => ability.is_hidden === true
    )
    if (hiddenAbility) {
      try {
        const response = await fetch(hiddenAbility.ability.url)
        const abilityDetails = await response.json()
        const enEffect = abilityDetails.effect_entries.find(
          entry => entry.language.name === 'en'
        )
        if (enEffect) {
          setHiddenAbilityEffect(enEffect.effect)
        } else {
          setHiddenAbilityEffect(null)
        }
      } catch (error) {
        console.error('Error fetching ability details:', error)
      }
    } else {
      setHiddenAbilityEffect(null)
    }
  }

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const data = await response.json();
        const allowedTypes = ['grass', 'fire', 'ground', 'water', 'flying', 'poison', 'normal', 'bug'];
        const types = data.results.filter(type => allowedTypes.includes(type.name)).map(type => type.name);
        setPokemonTypes(types);
        console.log(types); // Log the types fetched from the API
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };
    fetchPokemonTypes();
  }, []);
  
  
  
  useEffect(() => {
    let filteredPokemon = pokemonData;
  
    if (!filteredPokemon) {
      return; // Return early if filteredPokemon is null
    }
  
    if (searchQuery) {
      filteredPokemon = filteredPokemon.filter(pokemon =>
        pokemon.name.includes(searchQuery.toLowerCase())
      );
    }
  
    if (selectedType) {
      filteredPokemon = filteredPokemon.filter(pokemon =>
        pokemon.details.types.some(type => type.type.name === selectedType)
      );
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visiblePokemon = filteredPokemon.slice(startIndex, endIndex);
  
    setVisibleItemPokemon(visiblePokemon);
  }, [searchQuery, selectedType, pokemonData, currentPage, itemsPerPage]);
  
  const handleSearchQueryChange = event => {
    setSearchQuery(event.target.value);
  };
  
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    console.log(type); // Log the selected type
  };

  const handleAscendingClick = () => {
    setShowDescending(preValue => !preValue)
  }

  const handleRefreshClick = () => {
    window.location.reload()
  }

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!selectedPokemon) return;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.details.id}/`
        );
        const data = await response.json();
        const evolutionChainUrl = data.evolution_chain.url;
        const chainResponse = await fetch(evolutionChainUrl);
        const chainData = await chainResponse.json();
        // Extract Pokemon details from the evolution chain
        const pokemonChain = [];
        const traverseChain = (chain, level = 0) => {
          const pokemonDetails = {
            id: chain.species.url.split('/').slice(-2)[0],
            level: level
          };
          pokemonChain.push(pokemonDetails);
          if (chain.evolves_to.length > 0) {
            chain.evolves_to.forEach(child => {
              traverseChain(child, level + 1);
            });
          }
        };
        traverseChain(chainData.chain);
        setEvolutionChain(pokemonChain);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };
    fetchEvolutionChain();
  }, [selectedPokemon]);

  const typeColorScheme = {
    grass: 'green',
    fire: 'orange',
    ground: 'yellow',
    water: 'blue',
    flying: 'gray',
    poison: 'red',
    normal: 'teal', // Adjust according to your preference
    bug: 'purple' // Adjust according to your preference
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const visiblePokemon =
    pokemonData &&
    pokemonData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )

  return (
    <Grid templateColumns='repeat(12, 1fr)' width='1080px' mx='auto' gap={5}>
      <Box gridColumn='span 9' marginTop='30px'>
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box marginTop='10px'>
            <Box
              padding='0'
              backgroundColor='transparent'
              _active={{
                backgroundColor: 'transparent'
              }}
              display='flex'
              flexDirection='row'
              cursor='pointer'
              onClick={handleAscendingClick}
              marginBottom='10px' // Adjust the margin as needed
            >
              <Text fontSize='13px'>Ascending </Text>
              {showDescending ? (
                <HiChevronUp fontSize='23px' />
              ) : (
                <HiChevronDown fontSize='23px' />
              )}
            </Box>
            {showDescending && (
              <Box marginTop='2px' position='absolute'>
                <Text fontSize='13px'>Descending</Text>
              </Box>
            )}
          </Box>
          <Box flexDirection='row' display='flex'>
            <InputGroup>
              <InputLeftAddon
                fontSize='13px'
                backgroundColor='transparent'
                borderColor='transparent'
              >
                from
              </InputLeftAddon>
              <Input
                type='text'
                width='60px'
                paddingRight='10px'
                textAlign='right'
                borderRadius='10px'
                borderWidth='1.9px'
                borderColor='gray.400'
                maxlength='3'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                fontSize='13px'
                backgroundColor='transparent'
                borderColor='transparent'
              >
                to
              </InputLeftAddon>
              <Input
                type='text'
                width='60px'
                paddingRight='20px'
                textAlign='right'
                borderRadius='10px'
                borderWidth='1.9px'
                borderColor='gray.400'
              />
            </InputGroup>
          </Box>
        </Box>
        <Box
          display='flex'
          marginTop='30px'
          flexDirection='row'
          justifyContent='space-between'
          gap='2'
        >
          {/* type */}
          <Menu>
            <MenuButton
              borderRadius='10px'
              backgroundColor='white'
              fontSize='13px'
              as={Button}
              leftIcon={<MdCatchingPokemon fontSize='18px' color='gray' />}
              rightIcon={<HiChevronDown fontSize='23px' color='gray' />}
              fontWeight='400'
              color='gray'
              boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
              _hover={{
                backgroundColor: 'white.100' // Change to your desired hover color
              }}
              _active={{
                backgroundColor: 'white.100' // Change to your desired active color
              }}
            >
              Type
            </MenuButton>
            <MenuList>
            {pokemonTypes.map(type => (
              <MenuItem key={type} onClick={() => handleTypeSelect(type)}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
            </MenuList>
          </Menu>

          {/* weakness */}
          <Menu>
            <MenuButton
              borderRadius='10px'
              backgroundColor='white'
              fontSize='13px'
              as={Button}
              leftIcon={<PiCircleHalfFill fontSize='18px' color='gray' />}
              rightIcon={<HiChevronDown fontSize='23px' color='gray' />}
              fontWeight='400'
              color='gray'
              boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
              _hover={{
                backgroundColor: 'white.100' // Change to your desired hover color
              }}
              _active={{
                backgroundColor: 'white.100' // Change to your desired active color
              }}
            >
              Base Exp
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          {/* Ability */}
          <Menu>
            <MenuButton
              borderRadius='10px'
              backgroundColor='white'
              fontSize='13px'
              as={Button}
              leftIcon={<PiCircleNotchFill fontSize='18px' color='gray' />}
              rightIcon={<HiChevronDown fontSize='23px' color='gray' />}
              fontWeight='400'
              color='gray'
              boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
              _hover={{
                backgroundColor: 'white.100' // Change to your desired hover color
              }}
              _active={{
                backgroundColor: 'white.100' // Change to your desired active color
              }}
            >
              Ability
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          {/* Height */}
          <Menu>
            <MenuButton
              borderRadius='10px'
              backgroundColor='white'
              fontSize='13px'
              as={Button}
              leftIcon={<MdEgg fontSize='18px' color='gray' />}
              rightIcon={<HiChevronDown fontSize='23px' color='gray' />}
              fontWeight='400'
              color='gray'
              boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
              _hover={{
                backgroundColor: 'white.100' // Change to your desired hover color
              }}
              _active={{
                backgroundColor: 'white.100' // Change to your desired active color
              }}
            >
              Height
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              borderRadius='10px'
              backgroundColor='white'
              fontSize='13px'
              as={Button}
              leftIcon={<TbCirclesFilled fontSize='18px' color='gray' />}
              rightIcon={<HiChevronDown fontSize='23px' color='gray' />}
              fontWeight='400'
              color='gray'
              boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
              _hover={{
                backgroundColor: 'white.100' // Change to your desired hover color
              }}
              _active={{
                backgroundColor: 'white.100' // Change to your desired active color
              }}
            >
              Weight
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          <Button
            backgroundColor='gray.400'
            borderRadius='10px'
            boxShadow='0 4px 8px rgba(0, 0, 0, 0.15)'
            onClick={handleRefreshClick}
          >
            <IoMdRefresh fontSize='25px' padding='20px' color='white' />
          </Button>
        </Box>
       
          {pokemonData && (
            <>
             <Box
                display='flex'
                flexDirection='row'
                marginTop='30px'
                flexWrap='wrap'
                justifyContent='space-between'
              >
              {visibleItemPokemon ? (
                visibleItemPokemon.map(pokemon => (
                  <Box
                    onClick={() => handlePokemonClick(pokemon)}
                    key={pokemon.id}
                    width='31%'
                    marginBottom='25px'
                  >
                    <Box
                      backgroundColor='white'
                      borderRadius='20px'
                      boxShadow='lg'
                    >
                      <Box
                        height='110px'
                        justifyContent='center'
                        display='flex'
                        alignItems='center'
                        width='100%'
                        borderRadius='30px 30px 0 0'
                        overflow='hidden'
                      >
                        <Image
                          src={
                            pokemon.details.sprites.other.showdown
                              .front_default ||
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.details.id}.gif'
                          }
                          alt={pokemon.name}
                          boxSize='80px'
                        />
                      </Box>

                      <Box
                        textAlign='center'
                        mt='1'
                        fontWeight='600'
                        color='gray'
                        fontSize='13px'
                      >
                        N°{pokemon.details.base_experience}
                      </Box>
                      <Box
                        textAlign='center'
                        mt='1'
                        fontWeight='600'
                        color='black.100'
                        fontSize='19px'
                      >
                        {pokemon.name.charAt(0).toUpperCase() +
                          pokemon.name.slice(1)}
                      </Box>

                      <Box mt='1' textAlign='center'>
                        {pokemon.details.types.map((type, index) => (
                          <Button
                            key={index}
                            mb='2'
                            fontSize='14px'
                            colorScheme={typeColorScheme[type.type.name]}
                            height='30px'
                            width='60px'
                            marginRight='5px'
                          >
                            {type.type.name}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))
                ) : (
                  visiblePokemon.map(pokemon => (
                    <Box
                    onClick={() => handlePokemonClick(pokemon)}
                    key={pokemon.id}
                    width='31%'
                    marginBottom='25px'
                  >
                    <Box
                      backgroundColor='white'
                      borderRadius='20px'
                      boxShadow='lg'
                    >
                      <Box
                        height='110px'
                        justifyContent='center'
                        display='flex'
                        alignItems='center'
                        width='100%'
                        borderRadius='30px 30px 0 0'
                        overflow='hidden'
                      >
                        <Image
                          src={
                            pokemon.details.sprites.other.showdown
                              .front_default ||
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.details.id}.gif'
                          }
                          alt={pokemon.name}
                          boxSize='80px'
                        />
                      </Box>

                      <Box
                        textAlign='center'
                        mt='1'
                        fontWeight='600'
                        color='gray'
                        fontSize='13px'
                      >
                        N°{pokemon.details.base_experience}
                      </Box>
                      <Box
                        textAlign='center'
                        mt='1'
                        fontWeight='600'
                        color='black.100'
                        fontSize='19px'
                      >
                        {pokemon.name.charAt(0).toUpperCase() +
                          pokemon.name.slice(1)}
                      </Box>

                      <Box mt='1' textAlign='center'>
                        {pokemon.details.types.map((type, index) => (
                          <Button
                            key={index}
                            mb='2'
                            fontSize='14px'
                            colorScheme={typeColorScheme[type.type.name]}
                            height='30px'
                            width='60px'
                            marginRight='5px'
                          >
                            {type.type.name}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Box>
              )))}
                
           </Box>
           <br/>
           <Box display="flex" justifyContent="space-between">
           {currentPage > 1 && (
            <Button 
                onClick={previousPage} 
                backgroundColor="white"
                fontSize="15px"
                >Prev</Button>
          )}

          {currentPage * itemsPerPage < pokemonData.length && (
            <>
            <Text></Text>
            <Button  
                onClick={nextPage} 
                backgroundColor="white"
                fontSize="15px"
                >Next</Button>
            </>
          )}
          </Box>
          </>
          )}
        
      </Box>

      <Box gridColumn='span 3'>
        {selectedPokemon && (
          <Box
            backgroundColor='white'
            position='fixed'
            top='150'
            width='60'
            borderRadius='20px'
            boxShadow='lg'
          >
            <Grid templateColumns='repeat(12, 1fr)' width='auto'>
              <Box
                gridColumn='span 10'
                display='flex'
                marginLeft='75px'
                marginTop='10px'
              >
                <Box height='80px' width='100%' overflow='hidden'>
                  <Image
                    src={
                      selectedPokemon.details.sprites.other.showdown
                        .front_default ||
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.details.id}.gif'
                    }
                    alt={selectedPokemon.name}
                    boxSize='80px'
                  />
                </Box>
              </Box>
              <Box display='none' gridColumn='span 2' marginTop='20px'>
                <Box
                  height='30px'
                  backgroundColor='skyblue'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width='75%'
                  borderRadius='10px'
                  marginBottom='10px'
                >
                  <IoMale fontSize='20px' fontWeight='500' />
                </Box>
                <Box
                  height='30px'
                  backgroundColor='transparent'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width='75%'
                  borderRadius='10px'
                  borderColor='red'
                  borderWidth='2px'
                >
                  <IoMdFemale fontSize='20px' color='red' fontWeight='500' />
                </Box>
              </Box>
            </Grid>

            <Box
              textAlign='center'
              mt='1'
              fontWeight='600'
              color='gray'
              fontSize='13px'
            >
              #{selectedPokemon.details.id}
            </Box>

            <Box
              textAlign='center'
              // mt='1'
              fontWeight='600'
              color='black.100'
              fontSize='17px'
            >
              {selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)}
            </Box>

            <Box
              mt='1'
              textAlign='center'
              flexDirection='row'
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='2'
            >
              {selectedPokemon.details.types.map((type, index) => (
                <Button
                  key={index}
                  mb='1'
                  colorScheme={typeColorScheme[type.type.name]}
                  fontSize='11px'
                  height='25px'
                  width='50px'
                >
                  {type.type.name}
                </Button>
              ))}
            </Box>

            {hiddenAbilityEffect && (
              <Box textAlign='center' mt='1'>
                <Text fontWeight='bold' fontSize='14px'>
                  POKEDEX ENTREY
                </Text>
                <Text fontSize='12px' padding='6px'>
                  {hiddenAbilityEffect &&
                    hiddenAbilityEffect.split(' ').slice(0, 10).join(' ')}
                </Text>
              </Box>
            )}

            <Box>
              <Text fontWeight='bold' fontSize='14px' mb='1' textAlign='center'>
                ABILITIES
              </Text>

              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='2'
              >
                {selectedPokemon.details.abilities
                  .slice(0, 2)
                  .map((ability, index) => (
                    <Button
                      key={index}
                      mb='2'
                      fontSize='12px'
                      backgroundColor='#F3F6FF'
                      height='26px'
                      width='100px'
                      borderColor={ability.is_hidden ? 'red' : 'gray'}
                      borderRadius='20px'
                      borderWidth='1px'
                      rightIcon={
                        ability.is_hidden ? (
                          <FaRegEyeSlash fontSize='16px' color='gray' />
                        ) : null
                      }
                    >
                      {ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)}
                      {/* {ability.ability.name} */}
                    </Button>
                  ))}
              </Box>
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='12'
                textAlign='center'
              >
                <Box textAlign='center'>
                  <Text
                    fontWeight='bold'
                    fontSize='14px'
                    mb='2'
                    textAlign='center'
                  >
                    HEIGHT
                  </Text>
                </Box>

                <Box textAlign='center'>
                  <Text
                    fontWeight='bold'
                    fontSize='14px'
                    mb='2'
                    textAlign='center'
                  >
                    WEIGHT
                  </Text>
                </Box>
              </Box>
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='2'
              >
                <Box>
                  <Button
                    mb='2'
                    fontSize='12px'
                    backgroundColor='#F3F6FF'
                    height='26px'
                    width='100px'
                    borderRadius='20px'
                    disabled
                  >
                    {selectedPokemon.details.height}m
                  </Button>
                </Box>

                <Box>
                  <Button
                    mb='1'
                    fontSize='12px'
                    backgroundColor='#F3F6FF'
                    height='26px'
                    width='100px'
                    borderRadius='20px'
                  >
                    {selectedPokemon.details.weight}kg
                  </Button>
                </Box>
              </Box>
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='12'
                textAlign='center'
              >
                <Box textAlign='center'>
                  <Text
                    fontWeight='bold'
                    fontSize='14px'
                    mb='1'
                    textAlign='center'
                  >
                    STATS
                  </Text>
                </Box>
              </Box>

              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='2'
              >
                
                {selectedPokemon.details.stats.map((stat, index) => {
                  const statInfo = {
                    hp: { shortForm: 'HP', bgColor: 'pink' },
                    attack: { shortForm: 'AT', bgColor: 'skyblue' },
                    defense: { shortForm: 'DF', bgColor: 'green' },
                    'special-attack': { shortForm: 'SA', bgColor: 'purple' },
                    'special-defense': { shortForm: 'SD', bgColor: 'orange' },
                    speed: { shortForm: 'SP', bgColor: 'gray' }
                  }

                  const statName = stat.stat.name

                  if (statName in statInfo) {
                    const { shortForm, bgColor } = statInfo[statName]

                    return (
                      <Box
                        key={index}
                        justifyContent='center'
                        flexDirection='row'
                        backgroundColor='#F3F6FF'
                        padding='3px'
                        borderRadius='20px'
                        alignItems='center'
                        gap='2'
                      >
                        <Text
                          backgroundColor={bgColor}
                          borderRadius='50px'
                          padding='5px'
                          fontSize='8px'
                          fontWeight='bold'
                          color='white'
                        >
                          {shortForm}
                        </Text>
                        <Text fontSize='8px' padding='3px' fontWeight='bold'>
                          {stat.base_stat}
                        </Text>
                      </Box>
                    )
                  } else {
                    // Return null if the stat name is not recognized
                    return null
                  }
                })}
              </Box>
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='12'
                mt="1"
                textAlign='center'
              >
                <Box textAlign='center'>
                  <Text
                    fontWeight='bold'
                    fontSize='14px'
                    mb='2'
                    textAlign='center'
                  >
                    EVOLUTION
                  </Text>
                </Box>
              </Box>
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='2'
              >
                <Box>
          <Wrap>
            {evolutionChain.map(({ id, level }) => (
              <WrapItem key={id}  padding="10px">
                <Box display="flex" flexDirection="column" alignItems="center">                
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={`Pokemon ${id}`}
                    boxSize='50px'
                  />
                  <Text 
                    backgroundColor="#F3F6FF" 
                    padding="4px"  
                    fontSize='12px'
                    borderRadius="30px"
                    >
                    {`Lvl: ${level}`}
                  </Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
                </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  )
}
