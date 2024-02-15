"use client";

import { useState, useEffect} from "react";
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
} from "@chakra-ui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdCatchingPokemon, MdEgg } from "react-icons/md";
import { PiCircleHalfFill, PiCircleNotchFill } from "react-icons/pi";
import { TbCirclesFilled } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { ItemContainer } from "./ItemContainer";
import { Item } from "./Item";
import { FaShieldCat } from "react-icons/fa6";
import { IoMale } from "react-icons/io5";
import { IoMdFemale } from "react-icons/io";

export const Content = () => {
  const [showDescending, setShowDescending] = useState(false);
  const [pokemonData, setPokemonData] =useState(null);
 
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        // Fetch additional details for each Pokemon
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const details = await response.json();
            return { ...pokemon, details };
          })
        );
        setPokemonData(pokemonWithDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleAscendingClick = () => {
    setShowDescending((preValue) => !preValue);
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const typeColorScheme = {
    grass: "green",
    fire: "orange",
    ground: "yellow",
    water: "blue",
    flying: "gray",
    poison: "red",
    normal: "teal", // Adjust according to your preference
    bug: "purple" // Adjust according to your preference
  };
  

  return (
    <Grid templateColumns="repeat(12, 1fr)" width="1080px" mx="auto" gap={5}>
     
      <Box gridColumn="span 9" marginTop="30px">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box marginTop="10px">
            <Box
              padding="0"
              backgroundColor="transparent"
              _active={{
                backgroundColor: "transparent",
              }}
              display="flex"
              flexDirection="row"
              cursor="pointer"
              onClick={handleAscendingClick}
              marginBottom="10px" // Adjust the margin as needed
            >
              <Text fontSize="13px">Ascending </Text>
              {showDescending ? (
                <HiChevronUp fontSize="23px" />
              ) : (
                <HiChevronDown fontSize="23px" />
              )}
            </Box>
            {showDescending && (
              <Box marginTop="2px" position="absolute">
                <Text fontSize="13px">Descending</Text>
              </Box>
            )}
          </Box>
          <Box flexDirection="row" display="flex">
            <InputGroup>
              <InputLeftAddon
                fontSize="13px"
                backgroundColor="transparent"
                borderColor="transparent"
              >
                from
              </InputLeftAddon>
              <Input
                type="text"
                width="60px"
                paddingRight="10px"
                textAlign="right"
                borderRadius="10px"
                borderWidth="1.9px"
                borderColor="gray.400"
                maxlength="3"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                fontSize="13px"
                backgroundColor="transparent"
                borderColor="transparent"
              >
                to
              </InputLeftAddon>
              <Input
                type="text"
                width="60px"
                paddingRight="20px"
                textAlign="right"
                borderRadius="10px"
                borderWidth="1.9px"
                borderColor="gray.400"
              />
            </InputGroup>
          </Box>
        </Box>
        <Box
          display="flex"
          marginTop="30px"
          flexDirection="row"
          justifyContent="space-between"
          gap="2"
        >
          {/* type */}
          <Menu>
            <MenuButton
              borderRadius="10px"
              backgroundColor="white"
              fontSize="13px"
              as={Button}
              leftIcon={<MdCatchingPokemon fontSize="18px" color="gray" />}
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
              fontWeight="400"
              color="gray"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _hover={{
                backgroundColor: "white.100", // Change to your desired hover color
              }}
              _active={{
                backgroundColor: "white.100", // Change to your desired active color
              }}
            >
              Type
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          {/* weakness */}
          <Menu>
            <MenuButton
              borderRadius="10px"
              backgroundColor="white"
              fontSize="13px"
              as={Button}
              leftIcon={<PiCircleHalfFill fontSize="18px" color="gray" />}
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
              fontWeight="400"
              color="gray"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _hover={{
                backgroundColor: "white.100", // Change to your desired hover color
              }}
              _active={{
                backgroundColor: "white.100", // Change to your desired active color
              }}
            >
              Weakness
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          {/* Ability */}
          <Menu>
            <MenuButton
              borderRadius="10px"
              backgroundColor="white"
              fontSize="13px"
              as={Button}
              leftIcon={<PiCircleNotchFill fontSize="18px" color="gray" />}
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
              fontWeight="400"
              color="gray"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _hover={{
                backgroundColor: "white.100", // Change to your desired hover color
              }}
              _active={{
                backgroundColor: "white.100", // Change to your desired active color
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
              borderRadius="10px"
              backgroundColor="white"
              fontSize="13px"
              as={Button}
              leftIcon={<MdEgg fontSize="18px" color="gray" />}
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
              fontWeight="400"
              color="gray"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _hover={{
                backgroundColor: "white.100", // Change to your desired hover color
              }}
              _active={{
                backgroundColor: "white.100", // Change to your desired active color
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
              borderRadius="10px"
              backgroundColor="white"
              fontSize="13px"
              as={Button}
              leftIcon={<TbCirclesFilled fontSize="18px" color="gray" />}
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
              fontWeight="400"
              color="gray"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _hover={{
                backgroundColor: "white.100", // Change to your desired hover color
              }}
              _active={{
                backgroundColor: "white.100", // Change to your desired active color
              }}
            >
              Weight
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>

          <Button
            backgroundColor="gray.400"
            borderRadius="10px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.15)"
            onClick={handleRefreshClick}
          >
            <IoMdRefresh fontSize="25px" padding="20px" color="white" />
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          marginTop="30px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
       
          {pokemonData && (
            <>
               {pokemonData.map((pokemon) => (
                <Box key={pokemon.id} width="31%" marginBottom="25px">
                  <Box backgroundColor="white" borderRadius="20px" boxShadow="lg" >
                      <Box 
                          height="100px"  
                          justifyContent="center"
                          display="flex"
                          alignItems="center" 
                          width="100%" 
                          borderRadius="30px 30px 0 0" 
                          overflow="hidden"
                      >
                        <Image 
                              src={pokemon.details.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.details.id}.png"} alt={pokemon.name} 
                              boxSize="100px" 
                         />

                      </Box>

                      <Box textAlign="center" mt="1" fontWeight="600" color="gray" fontSize="13px">
                        N°{pokemon.details.base_experience}
                      </Box>
                      <Box textAlign="center" mt="1" fontWeight="600" color="black.100" fontSize="19px">
                      {pokemon.name}
                      </Box>
                    
                      <Box mt="1"textAlign="center">
                      {pokemon.details.types.map((type, index) => (
                          <Button
                            key={index}
                            mb="2"
                            fontSize="14px"
                            colorScheme={typeColorScheme[type.type.name]}
                            height="30px"
                            width="60px"
                            marginRight="5px"
                          >
                            {type.type.name}
                          </Button>
                        ))}
                        <Button  mb="2" fontSize="14px" colorScheme="green" height="30px" width="60px">Grass</Button>
                      </Box>

                    </Box>
                </Box>
                 ))}
            </>
          )}
        </Box>
      </Box>

      <Box gridColumn="span 3">
        <Box backgroundColor="white" borderRadius="20px" boxShadow="lg">
          <Grid templateColumns="repeat(12, 1fr)" width="auto">
            <Box gridColumn="span 10" display="flex" marginLeft="40px">
              <Box
                height="100px"
                width="100%"
                borderRadius="30px 30px 0 0"
                overflow="hidden"
              >
                <FaShieldCat
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
            <Box gridColumn="span 2" marginTop="20px">
              <Box
                height="30px"
                backgroundColor="skyblue"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="75%"
                borderRadius="10px"
                marginBottom="10px"
                
              >
                <IoMale fontSize="20px" fontWeight="500" />
              </Box>
              <Box
                height="30px"
                backgroundColor="transparent"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="75%"
                borderRadius="10px"
                borderColor="red"
                borderWidth="2px" 
              >
                <IoMdFemale fontSize="20px" color="red" fontWeight="500" />
              </Box>
            </Box>
          </Grid>

          <Box
            textAlign="center"
            mt="1"
            fontWeight="600"
            color="gray"
            fontSize="13px"
          >
            N387
          </Box>

          <Box
            textAlign="center"
            mt="1"
            fontWeight="600"
            color="black.100"
            fontSize="19px"
          >
            Turtwig
          </Box>

          <Box 
            mt="1" 
            textAlign="center" 
            flexDirection="row" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            gap="2"
          >
            <Button
              mb="2"
              fontSize="11px"
              backgroundColor="#8FA5E5"
              height="25px"
              width="50px"
            >
              Water
            </Button>
            <Button
             mb="2"
             fontSize="11px"
             backgroundColor="#ADA1B1"
             height="25px"
             width="50px"
            >
              Steel
            </Button>
          </Box>
          <Box 
            textAlign="center" 
            mt="2"
          >
            <Text 
              fontWeight="bold"
              fontSize="14px"
            >
              POKEDEX ENTREY
            </Text>
            <Text fontSize="12px" padding="10px">
              It swim as fast as a jet boat.The edges of its wings are sharp and can slice a part drifting ice.
            </Text>
          </Box>

          <Box 
          >
            <Text 
              fontWeight="bold"
              fontSize="14px"
              mb="2"
              textAlign="center" 

            >
              ABILITIES
            </Text>

            <Box 
              flexDirection="row" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              gap="2"
            >
            <Button
              mb="2"
              fontSize="13px"
              backgroundColor="#F3F6FF"
              height="30px"
              width="110px"
              borderColor="gray"
              borderWidth="1px"
              borderRadius="20px"
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
            >
              Torrent
            </Button>
            <Button
              mb="2"
              fontSize="13px"
              backgroundColor="#F3F6FF"
              height="30px"
              width="110px"
              borderColor="red"
              borderWidth="1px"
              borderRadius="20px"
              rightIcon={<HiChevronDown fontSize="23px" color="gray" />}
            >
              Torrent
            </Button>
            </Box>
            <Box 
              flexDirection="row" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              gap="12"
              textAlign="center"
            >
              <Box textAlign="center">
                <Text >
                  HEIGHT
                </Text>
              </Box>
           
              <Box textAlign="center">
                <Text >
                WEIGHT
                </Text>
              </Box>
            </Box>
            <Box 
              flexDirection="row" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              gap="2"
            >
            <Box>
              <Button
                mb="2"
                fontSize="13px"
                backgroundColor="#F3F6FF"
                height="30px"
                width="110px"
                borderRadius="20px"
                disabled

              >
                1.7m
              </Button>
            </Box>

            <Box>
              <Button
                  mb="2"
                  fontSize="13px"
                  backgroundColor="#F3F6FF"
                  height="30px"
                  width="110px"
                  borderRadius="20px"
                >
                  84.4kg
              </Button>
                
            </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
