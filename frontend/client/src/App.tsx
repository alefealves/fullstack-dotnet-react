import { Badge, Box, Button, Flex, HStack, Heading, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import './App.css';
import { AddIcon } from '@chakra-ui/icons';
import { BASE_URL } from './constant';
import { useEffect, useState } from 'react';
import { Product } from './types/product';
import axios from 'axios';
import ProductSkeleton from './components/ProductSkeleton';

function App() {

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
        <Heading>
          Product List
        </Heading>
        <Button
          colorScheme='blue'
          leftIcon={<AddIcon />}
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
                <Td>{product.name}</Td>
                <Td>{product.description}</Td>
                <Td>{product.isAvailable}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td>25.4</Td>
              </Tr>
            ))}  
          </Tbody>
        </Table>
      </TableContainer>
    </Box>  
  )
}

export default App






