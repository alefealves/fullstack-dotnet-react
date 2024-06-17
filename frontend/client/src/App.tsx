import { Avatar, Badge, Box, Button, Flex, HStack, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import './App.css';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { BASE_URL } from './constant';
import { useEffect, useState } from 'react';
import { Product } from './types/product';
import axios from 'axios';
import ProductSkeleton from './components/ProductSkeleton';
import ProductForm from './components/ProductForm';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<Product[]>([]);
  const [isLoanding, setIsLoanding] = useState<boolean>(false);

  useEffect(() => {
    fecthData();
  }, [])
  
  const fecthData = () => {
    setIsLoanding(true);
    axios.get(BASE_URL+"product").then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoanding(false)
    })
  }

  if (isLoanding) return <ProductSkeleton />  

  return (
    <Box
      shadow={'md'}
      rounded={'md'}
      m={32}
      >
      <Flex px="5"
        justifyContent={'space-between'}
        alignContent={'center'}
        mb={5}
      >
        <Heading fontSize="20">Product List</Heading>
        <Button
          colorScheme='blue'
          leftIcon={<AddIcon />}
          onClick={onOpen}
        >
          Add Product
        </Button>
      </Flex>

      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Is Available</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product : Product) => (
              <Tr>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar size={'sm'} name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>
                  <Badge>{product.isAvailable ? 'Sim' : 'Não'}</Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>  
                  <HStack gap={3}> 
                    <EditIcon boxSize={22} color={'blue'} />
                    <DeleteIcon boxSize={22} color={'blue'} />
                    <ViewIcon boxSize={22} color={'blue'} />
                  </HStack>
                </Td>
              </Tr>
            ))}  
          </Tbody>
        </Table>
      </TableContainer>

      {data.length == 0 && (
        <Heading textAlign={'center'} p="5" fontSize={14} >
         Sem dados
        </Heading>
      )}

      {isOpen && 
        <ProductForm 
          isOpen={isOpen}
          fetchProduct={fecthData} 
          onClose={onClose} />
      }
    </Box>  
  )
}

export default App






