import React from "react";
import {
  Image,
  Grid,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

export const Nav = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="8vh"
      >
        <Image src="/logo.png" boxSize="60px" alt="Dan Abramov" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="9vh"
        marginBottom="10px"
      >
        <Text fontSize="30px" color="#f25554" fontWeight="bold">
          PokeDex
        </Text>
      </Box>

      <Grid templateColumns="repeat(12, 1fr)" width="1080px" mx="auto" gap={5}>
        <Box gridColumn="span 9">
          <InputGroup>
            <Input
              placeholder="Search your Pokemon!"
              height="60px"
              bg="white"
              border="none"
              borderRadius="15px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              _placeholder={{
                color: "gray",
                fontSize: "13px",
              }}
            />
            <InputRightElement>
              <Image
                src="/search.png"
                boxSize="35px"
                marginTop="20px"
                marginRight="20px"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box gridColumn="span 3"></Box>
      </Grid>
    </Box>
  );
};
