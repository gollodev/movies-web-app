import { useState, useEffect } from 'react'
import { CartState } from '../types/movies'
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Heading,
  Button,
  Tfoot,
  Alert,
  AlertIcon
 } from '@chakra-ui/react'
 import { useNavigate } from 'react-router-dom'

export default function ShoppingCartDetail() {
  const [orders, setOrders] = useState<CartState[]>([])
  const navigate = useNavigate()

  const handleFinishOrder = (): void => {
    navigate('/shopping-finish')
    localStorage.clear()
  }

  useEffect(() => {
    const storedOrders = localStorage.getItem('cartOrders')
    if (storedOrders) setOrders(JSON.parse(storedOrders))
  }, [])

  return (
    <Box mt={8}>
      <Box mt={4} mb={4}>
        <Heading as={'h1'} size={'xl'} color={'gray.400'} textAlign={'center'}>Orders</Heading>
      </Box>
      {orders?.length <= 0 && (
        <Box>
          <Alert status={'info'}>
            <AlertIcon />
            No orders yet!
          </Alert>
        </Box>
      )}
      {orders?.length > 0 && (
        <TableContainer>
          <Table variant={'simple'}>
            <Thead>
              <Tr>
                <Th>Movie</Th>
                <Th>Type</Th>
                <Th>Quantity</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((order, i) => (
                <Tr key={i}>
                  <Td>{order.movie}</Td>
                  <Td>{order.type}</Td>
                  <Td>{order.quantity}</Td>
                  <Td>{order.date || '---'}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Box>
                    <Button colorScheme={'blue'} onClick={handleFinishOrder}>Finish order</Button>
                  </Box>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
