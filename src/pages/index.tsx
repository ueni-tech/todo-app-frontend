import styles from './index.module.css'
import { Box, Button, Center, Checkbox, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import AddButton from "./componets/AddButton";
import { useState } from 'react';

export default function Home() {
  const [incompleteTodos, setInconpleteTodos] = useState([{id: 1, title: "買い物にいく"}, {id: 2, title: "確定申告をする"}, {id: 3, title: "ドットインストールを進める"}]);
  const [completedTodos, setCompletedTodos] = useState([{id: 4, title: "Discordの招待"}, {id: 5, title: "MENTAでチャットの返信"}, {id: 6, title: "Reactの復習"}]);


  const onChangeCompleted = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompletedTodos = [...completedTodos, incompleteTodos[index]];

    setInconpleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);
  }

  const onChangeBack = (index: number) => {
    const newCompletedTodos = [...completedTodos];
    newCompletedTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completedTodos[index]];

    setInconpleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);
  }

  return (
    <>
      <Center mt={5}>
        <Box w="400px">
          <Heading size="md">2024年1月24日</Heading>
          <Box w="100%" bg="blackAlpha.50" p={5}>

            <Box>
              <Heading size="sm" mb={5}>未完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {incompleteTodos.map((incompleteTodo, index) => (
                  <ListItem listStyleType="none" key={incompleteTodo.id}>
                    <Checkbox onChange={() => onChangeCompleted(index)}>{incompleteTodo.title}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

            <Box mt={5}>
              <Heading size="sm" mb={5}>完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {completedTodos.map((completeTodo, index) => (
                  <ListItem listStyleType="none" key={completeTodo.id}>
                    <Checkbox defaultChecked onChange={()=>onChangeBack(index)}>{completeTodo.title}</Checkbox>
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
