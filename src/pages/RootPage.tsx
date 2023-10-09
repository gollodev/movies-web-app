import { Container, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootPage() {
  return (
    <Container maxW={'container.lg'}>
      <Box display={'grid'} minHeight={'100vh'} gridTemplateRows={'1fr auto'}>
        <Box mb={6}>
          <Box mt={6}>
            <Header/>
          </Box>
          <Box as={'main'}>
            <Outlet/>
          </Box>
        </Box>
        <Footer/>
      </Box>
    </Container>
  )
}
