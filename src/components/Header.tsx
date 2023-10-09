import { Box, Heading, Divider, HStack, Icon, Tooltip } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { LuShoppingCart } from 'react-icons/lu'

export default function Header() {
  return (
    <Box as={'header'}>
      <HStack marginY={'0.8rem'} justifyContent={'space-between'}>
        <Box>
          <Link to={'/'}>
            <Heading as={'h1'} size={'md'} color={'blue.700'}>
              Movie Web Panel
            </Heading>
          </Link>
        </Box>
        <HStack>
          <Tooltip label={'Go to checkout!'}>
            <Link to={'/shopping-cart'}>
              <Icon as={LuShoppingCart} boxSize={8} color={'blue.700'} w={8} h={8} />
            </Link>
          </Tooltip>
        </HStack>
      </HStack>
      <Divider />
    </Box>
  )
}
