import { Box, VStack, Alert, AlertIcon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function ShoppingFinish() {
  return (
    <Box mt={8} justifyContent={'center'} alignItems={'center'}>
      <VStack>
        <Link to={'/'}>
          <Alert status='success'>
            <AlertIcon />
            Congrats! You purchase is successfully!
          </Alert>
        </Link>
      </VStack>
    </Box>
  )
}
