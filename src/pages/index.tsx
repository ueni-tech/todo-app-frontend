import styles from './index.module.css'
import { Box, Button, Center, Checkbox, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import AddButton from "./componets/AddButton";
import { useState } from 'react';

export default function Home() {
  const [incompleteTodos, setInconpleteTodos] = useState(["買い物に行く", "確定申告に行く", "ドットインストールを進める"]);
  const [completeTodos, setCompleteTodos] = useState(["Reactの復習", "Discordの招待", "MENTAでチャットの返信"]);

  return (
    <>
      <Center mt={5}>
        <Box w="400px">
          <Heading size="md">2024年1月24日</Heading>
          <Box w="100%" bg="blackAlpha.50" p={5}>
            
            <Box>
              <Heading size="sm" mb={5}>未完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {incompleteTodos.map(incompleteTodo => (
                  <ListItem listStyleType="none">
                    <Checkbox>{incompleteTodo}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

            <Box mt={5}>
              <Heading size="sm" mb={5}>完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {completeTodos.map(completeTodo => (
                  <ListItem listStyleType="none">
                    <Checkbox>{completeTodo}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

          </Box>
        </Box>
      </Center>

      <AddButton className={styles.addBtn} />
    </>
  )
}
