import React from 'react';
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
    Collape,
    Select,
    InputLeftElement,
  } from "@chakra-ui/react";
  import { MdCatchingPokemon,MdEgg } from "react-icons/md";

export const Item = () => {
    
  return (
    <Box backgroundColor="white" borderRadius="20px" boxShadow="lg" >
      <Box height="80px" width="100%" borderRadius="30px 30px 0 0" overflow="hidden">
        {/* <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        <MdCatchingPokemon style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </Box>

      <Box textAlign="center" mt="1" fontWeight="600" color="gray" fontSize="13px">
        N387
      </Box>
      <Box textAlign="center" mt="1" fontWeight="600" color="black.100" fontSize="19px">
        Turtwig
      </Box>

      <Box mt="1"textAlign="center">
        <Button  mb="2" fontSize="14px" colorScheme="green" height="30px" width="60px">Grass</Button>
      </Box>
    </Box>
  )
}
