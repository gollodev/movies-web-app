import { Box, Divider, Heading } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      as={'footer'}
      w={'100%'}
      p={2}
      textAlign={'center'}
      bg={'white'}
    >
      <Divider color={'gray.300'} />
      <Box p={4}>
        <Heading as={'p'} size={'sm'} color={'gray'} fontWeight={'medium'}>Developed with <Box as={'span'}>&#x2764;</Box> by Jose Lopez.</Heading>
      </Box>
    </Box>
  )
}
