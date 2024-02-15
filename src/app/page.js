import Image from "next/image";
import styles from "./page.module.css";
import { Nav } from './components/Nav';
import { Content } from './components/Content';
import { ChakraProvider } from '@chakra-ui/react';
import { ItemContainer } from './components/ItemContainer';


export default function Home() {
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <Nav/>
        <Content/>
      </main>
    </ChakraProvider>

  );
}
