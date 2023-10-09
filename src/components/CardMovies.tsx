import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Tag,
  HStack
} from '@chakra-ui/react'

type CardMoviesProps = {
  title: string
  year: string
  poster: string
  type: string
  onOpenModal: () => void
  selectedMovie: (title: string) => void
}

export default function CardMovies({ title, year, poster, type, onOpenModal, selectedMovie }: CardMoviesProps) {

  const handleAddToCart = (): void => {
    selectedMovie(title)
    onOpenModal()
  }

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={poster}
          alt={title}
          objectFit={'cover'}
          borderRadius={'lg'}
          boxSize={'sm'}
        />
        <Stack mt={2}>
          <Heading
            size='sm'
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
          >
            {title}
          </Heading>
        </Stack>
        <HStack spacing={4} mt={4}>
          <Tag>Type: {type}</Tag>
          <Tag>Year: {year}</Tag>
        </HStack>
      </CardBody>
      <Divider color={'gray.300'} />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='ghost' colorScheme='blue' onClick={handleAddToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
