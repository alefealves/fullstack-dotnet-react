import { Avatar, Badge, Box, Button, Flex, HStack, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import './App.css';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { BASE_URL } from './constant';
import { useEffect, useState } from 'react';
import { Product } from './types/product';
import axios from 'axios';
import ProductSkeleton from './components/ProductSkeleton';
import ProductForm from './components/ProductForm';
import ViewDetail from './components/ViewDetail';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:viewDialogOpen, onClose:viewDialogClose, onOpen:onViewDialogOpen } = useDisclosure();
  const [ currentData, setCurrentData ] = useState<Product>({} as Product);
  
  const [data, setData] = useState<Product[]>([]);
  const [isLoanding, setIsLoanding] = useState<boolean>(false);
  const toast = useToast();

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

  const getProduct = (id: number) => {
    axios.get<Product>(BASE_URL+"product/"+id).then((res) => {
      setCurrentData(res.data);
      onOpen();
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleAdd = () => {
    setCurrentData({} as Product);
    onOpen();
  }

  const onDeleteHandle = (id: number) => {
    axios.delete(BASE_URL+"product/"+id).then(() => {
      toast({
        title: 'Product is deleted.',
        description: "We've deleted your product.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fecthData();
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleViewDetail = (id: number) => {
    axios.get<Product>(BASE_URL+"product/"+id).then((res) => {
      setCurrentData(res.data);
      onViewDialogOpen();
    }).catch((err) => {
      console.log(err)
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
          onClick={() => handleAdd()}
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
                    <EditIcon 
                      onClick={() => getProduct(product.id)}
                      boxSize={22} color={'blue'} />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon boxSize={22} color={'red'} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>Are you sure to delete this?</PopoverBody>
                        <PopoverFooter>
                          <Button 
                            float={'right'} 
                            onClick={() => onDeleteHandle(product.id)}
                            colorScheme={'red'}
                            >Delete</Button>
                        </PopoverFooter> 
                      </PopoverContent>
                    </Popover>  
                    
                    <ViewIcon 
                      onClick={() => handleViewDetail(product.id)}
                      boxSize={22} 
                      color={'green'} />
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
          currentData={currentData}
          isOpen={isOpen}
          fetchProduct={fecthData} 
          onClose={onClose} />
      }

      {viewDialogOpen && 
        <ViewDetail 
          isOpen={viewDialogOpen}
          onClose={viewDialogClose}
          currentData={currentData}
          /> 
      }
    </Box>  
  )
}

export default App






