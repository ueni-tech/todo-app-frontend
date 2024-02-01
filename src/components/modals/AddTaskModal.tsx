import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { ChangeEvent, FC, MutableRefObject } from "react";

type Props = {
  isOpen: boolean;
  onClickModalClose: () => void;
  initialRef: MutableRefObject<null>;
  onChangeTodoTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  todoTitle: string;
  onClickAddTodo: () => void;
  isDisabled: boolean;
}

const AddTaskModal: FC<Props> = ({isOpen, onClickModalClose, initialRef, onChangeTodoTitle, todoTitle, onClickAddTodo, isDisabled}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClickModalClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タスクの追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input ref={initialRef} placeholder='TODOを入力...' onChange={onChangeTodoTitle} value={todoTitle} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' onClick={onClickModalClose}>キャンセル</Button>
          <Button colorScheme='blue' mx={3} onClick={onClickAddTodo} isDisabled={isDisabled} >追加</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddTaskModal
