import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constant';
import { Product } from '../types/product';

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData?:Product
}

const ProductForm = ({isOpen, onClose, fetchProduct, currentData}:ProductFormProps) => {

  const toast = useToast();

  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || '',
    description: currentData?.description || '',
    price: currentData?.price || 0,
    isAvailable: currentData?.isAvailable || false
  })

  const onSave = () => {
    if(currentData) {
      editProduct();
    } else {
      addProduct();
    }
  }

  const addProduct = () => {
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

  const editProduct = () => {
    axios.put(BASE_URL+"product/"+currentData?.id, product).then(() => {
      onClose();
      fetchProduct();

      toast({
        title: 'Product is updated.',
        description: "We've updated your product.",
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
                value={product.price}
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