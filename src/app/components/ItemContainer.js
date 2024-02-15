"use client";
import { useState } from "react";
import {Item} from "./Item";
import {Box,Wrap, WrapItem} from "@chakra-ui/react";

export const ItemContainer = () => {

  const items = [
    { id: 1, },
    { id: 2, },
    { id: 3, },
    { id: 4, },
    { id: 5, },
    { id: 6, },

  ];

  return (
    <Wrap spacing={3} justify="space-between">
    {items.map((item) => (
      <WrapItem key={item.id}>
        <Item  />
      </WrapItem>
    ))}
  </Wrap>
  )
}

