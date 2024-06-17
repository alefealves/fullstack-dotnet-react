import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constant';

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
}

const ProductForm = ({isOpen, onClose, fetchProduct}:ProductFormProps) => {

  const toast = useToast();

  const [product, setProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    isAvailable: false
  })

  const onSave = () => {
    axios.post(BASE_URL+"product", product).then(() => {
      onClose();
      fetchProduct();

      toast({
        title: 'Product added.',
        description: "We've added your product.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            shadow={'sm'}
          >Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4}
              alignItems={'self-start'}>
              <Input type="text" placeholder="Name" 
               value={product.name}
               onChange={(e) => setProduct({...product, name: e.target.value})}/> 
              <Textarea 
                placeholder="Product Description"
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})} />
              <Input 
                type='number' 
                placeholder='Price'
                onChange={(e) => setProduct({...product, price: Number(e.target.value)})} />     
              <Text>
                Is Available
              </Text>    
              <Switch
                isChecked={product.isAvailable}
                onChange={(e) => setProduct({...product, isAvailable: e.target.checked})} />   
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={onSave}
              colorScheme='blue'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProductForm