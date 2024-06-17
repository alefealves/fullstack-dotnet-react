import { Badge, Box, Button, Flex, HStack, Heading, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import '../App.css';
import { AddIcon } from '@chakra-ui/icons';

const ProductSkeleton = () => {
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
          <Skeleton>Product List</Skeleton>
        </Heading>
          <Skeleton>
            <Button
            colorScheme='blue'
            leftIcon={<AddIcon />}
            >
              <Skeleton>Add Product</Skeleton>
            </Button>
          </Skeleton>
      </Flex>

      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th><Skeleton>Id</Skeleton></Th>
              <Th><Skeleton>Name</Skeleton></Th>
              <Th><Skeleton>Description</Skeleton></Th>
              <Th><Skeleton>Is Available</Skeleton></Th>
              <Th isNumeric><Skeleton>Price</Skeleton></Th>
              <Th><Skeleton>Actions</Skeleton></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({length: 5}).map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton>01</Skeleton></Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>AD</SkeletonCircle>
                    <Text><Skeleton>Name</Skeleton></Text>
                  </HStack>
                </Td>
                <Td><Skeleton>Product Description</Skeleton></Td>
                <Td>
                  <Badge>
                    <Skeleton>Sim</Skeleton>
                  </Badge>
                </Td>
                <Td isNumeric><Skeleton>123</Skeleton></Td>
                <Td>
                  <HStack>
                    <Skeleton>1</Skeleton>
                    <Skeleton>2</Skeleton>
                    <Skeleton>3</Skeleton>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>  
  );
} 

export default ProductSkeleton