import styles from './index.module.css'
import { Box, Button, Center, Checkbox, FormControl, Heading, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UnorderedList, useDisclosure } from "@chakra-ui/react";
import AddButton from "./componets/AddButton";
import { ChangeEvent, useRef, useState } from 'react';
import { v4 as uuid} from 'uuid';

export default function Home() {
  const [incompleteTodos, setIncompleteTodos] = useState([{ id: '1', title: "買い物にいく" }, { id: '2', title: "確定申告をする" }, { id: '3', title: "ドットインストールを進める" }]);
  const [completedTodos, setCompletedTodos] = useState([{ id: '4', title: "Discordの招待" }, { id: '5', title: "MENTAでチャットの返信" }, { id: '6', title: "Reactの復習" }]);
  const [todoTitle, setTodoTitle] = useState('');
  const initialRef = useRef(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onChangeCompleted = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompletedTodos = [...completedTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);
  }

  const onChangeBack = (index: number) => {
    const newCompletedTodos = [...completedTodos];
    newCompletedTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completedTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);
  }

  const onClickModalClose = () => {
    setTodoTitle('');
    onClose();
  }

  const onChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }

  const onClickAddTodo = () => {
    const newTodo = { id: uuid(), title: todoTitle }
    const newIncompleteTodos = [...incompleteTodos, newTodo];
    setIncompleteTodos(newIncompleteTodos);
    onClickModalClose();
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
                    <Checkbox defaultChecked onChange={() => onChangeBack(index)}>{completeTodo.title}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

          </Box>
        </Box>
      </Center>

      <AddButton className={styles.addBtn} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClickModalClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクの追加</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl>
              <Input ref={initialRef} placeholder='TODOを入力...' onChange={onChangeTodoTitle} value={todoTitle} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' onClick={onClickModalClose}>キャンセル</Button>
            <Button colorScheme='blue' mx={3} onClick={onClickAddTodo} isDisabled={todoTitle ? false : true} >追加</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
