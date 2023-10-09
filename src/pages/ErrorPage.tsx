import { useNavigate } from 'react-router-dom'
import { Box, Heading, Button, VStack } from '@chakra-ui/react'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={0} mb={0}>
      <VStack>
        <Box>
          <Heading size={'xl'} color={'gray.300'}>Somethig is bad!</Heading>
        </Box>
        <Box>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </Box>
      </VStack>
    </Box>
  )
}
