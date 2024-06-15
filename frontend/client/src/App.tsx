import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import './App.css'
import { AddIcon } from '@chakra-ui/icons'

function App() {

  const fecthData = () => {}

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
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>  
  )
}

export default App
