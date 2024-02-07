import styles from './index.module.css'
import { Box, Button, Center, Checkbox, FormControl, Heading, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Toast, UnorderedList, useDisclosure, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import AddButton from "../components/AddButton";
import AddTaskModal from '@/components/modals/AddTaskModal';
import Head from 'next/head';
import useSWR from 'swr';

type Todo = {
  id?: string;
  title: string;
  completed: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const initialRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error, mutate } = useSWR('http://api.laravel-v10-starter.localhost/api/todos', fetcher);

  useEffect(() => {
    if (isLoading) return;
    const incompleteTodos = data.filter((todo: Todo) => todo.completed == 0);
    const completedTodos = data.filter((todo: Todo) => todo.completed == 1);
    setIncompleteTodos(incompleteTodos);
    setCompletedTodos(completedTodos);
  }, [data]);

  // useEffect(() => {
  //   axios.get('http://localhost/api/todos')
  //     .then((res) => {
  //       const incompleteTodos = res.data.filter((todo: Todo) => todo.completed == 0);
  //       const completedTodos = res.data.filter((todo: Todo) => todo.completed == 1);
  //       setIncompleteTodos(incompleteTodos);
  //       setCompletedTodos(completedTodos);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const onChangeCompleted = (index: number, id: string) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompletedTodos = [...completedTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);

    axios.put(`http://api.laravel-v10-starter.localhost/api/todos/${id}`, { completed: true })
  }

  const onChangeBack = (index: number, id: string) => {
    const newCompletedTodos = [...completedTodos];
    newCompletedTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completedTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompletedTodos(newCompletedTodos);

    axios.put(`http://api.laravel-v10-starter.localhost/api/todos/${id}`, { completed: false })
  }

  const onClickModalClose = () => {
    setTodoTitle('');
    onClose();
  }

  const onChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
    if (e.target.value === '' || e.target.value.length > 190) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  const onClickAddTodo = () => {
    const newTodo = { title: todoTitle, completed: 0}
    const newIncompleteTodos = [...incompleteTodos, newTodo];
    setIncompleteTodos(newIncompleteTodos);

    onClickModalClose();

    toast({
      title: 'TODOタスクを作成しました',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    axios.post('http://api.laravel-v10-starter.localhost/api/todos', newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
    <Head>
      <title>Todo-App</title>
    </Head>

      <Center mt={5}>
        <Box w="400px">
          <Heading size="md">{`${year}年${month}月${day}日`}</Heading>
          <Box w="100%" bg="blackAlpha.50" p={5}>

            <Box>
              <Heading size="sm" mb={5}>未完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {incompleteTodos.map((incompleteTodo, index) => (
                  <ListItem listStyleType="none" key={incompleteTodo.id}>
                    <Checkbox onChange={() => onChangeCompleted(index, incompleteTodo.id ?? '')}>{incompleteTodo.title}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

            <Box mt={5}>
              <Heading size="sm" mb={5}>完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                {completedTodos.map((completedTodo, index) => (
                  <ListItem listStyleType="none" key={completedTodo.id}>
                    <Checkbox defaultChecked onChange={() => onChangeBack(index, completedTodo.id ?? '')}>{completedTodo.title}</Checkbox>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>

          </Box>
        </Box>
      </Center>

      <AddButton className={styles.addBtn} onClick={onOpen} />

      <AddTaskModal
        isOpen={isOpen}
        onClickModalClose={onClickModalClose}
        initialRef={initialRef}
        onChangeTodoTitle={onChangeTodoTitle}
        todoTitle={todoTitle}
        onClickAddTodo={onClickAddTodo}
        isDisabled={isDisabled}
      />
    </>
  )
}