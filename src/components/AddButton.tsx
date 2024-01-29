import { Button } from '@chakra-ui/react'
import React from 'react'
import { AddIcon } from '@chakra-ui/icons'

type AddButtonProps = {
  className?: string;
  onClick?: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({className, onClick}) => {
  return (
    <Button onClick={onClick} className={className} w="80px" h="80px" borderRadius={50} colorScheme='blue'><AddIcon boxSize={10} /></Button>
  )
}

export default AddButton