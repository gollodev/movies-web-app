import { ChangeEvent, useState, useEffect } from 'react'
import {
  Grid,
  GridItem,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Heading,
  InputRightElement,
  IconButton,
  Spinner,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  Divider,
  VStack,
  Alert,
  AlertIcon
 } from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'
import { CartState, type Movie } from '../types/movies'
import { getSearchedMovies } from '../services/getSearchedMovies'
import CardMovies from '../components/CardMovies'
import { typeMovie } from '../constants'

export default function ListMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTitle, setSearchTitle] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMovieNotFound, setIsMovieNotFound] = useState<boolean>(false)
  const [showProgress, setShowProgress] = useState<boolean>(false)
  const [typeMovieSelected, setTypeMovieSelected] = useState<string>('')
  const [dateRent, setDateRent] = useState<string>('')
  const [quantityRent, setQuantityRent] = useState<string>('')
  const [quantityPurchase, setQuantityPurchase] = useState<string>('')
  const [selectedMovie, setSelectedMovie] = useState<string>('')
  const [cartState, setCartState] = useState<CartState[]>([])
  const [showError, setShowError] = useState<boolean>(false)

  const handleSearchMovie = async (): Promise<void> => {
    try {
      const searchedMovies = await getSearchedMovies(searchTitle.trim().toLocaleLowerCase());
      setShowProgress(true)
      if (searchedMovies.Response === 'True') {
        setIsMovieNotFound(false)
        setShowProgress(false)
        setMovies(searchedMovies.Search)
      } else {
        setIsMovieNotFound(true)
      }
    } catch (error) {
      if (error) setShowError(true)
      else setShowError(false)
    }
  }

  const handleOnCloseModal = (): void => {
    setDateRent('')
    setQuantityRent('')
    setQuantityPurchase('')
    onClose()
  }

  const handleAddToCart = (): void => {
    if (typeMovieSelected === typeMovie.RENT) {
      const rentToSave: CartState = {
        movie: selectedMovie,
        type: typeMovie.RENT,
        date: dateRent,
        quantity: Number(quantityRent)
      }
      setCartState([...cartState, rentToSave])
      setDateRent('')
      setQuantityRent('')
      onClose()
    } else if (typeMovieSelected === typeMovie.PURCHASE) {
      const purchaseToSave: CartState = {
        movie: selectedMovie,
        type: typeMovie.PURCHASE,
        quantity: Number(quantityPurchase)
      }
      setCartState([...cartState, purchaseToSave])
      setQuantityPurchase('')
      onClose()
    }
  }

  useEffect(() => {
    localStorage.setItem('cartOrders', JSON.stringify(cartState))
  }, [cartState])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl as={'fieldset'}>
                <FormLabel as={'legend'}>
                  Rent or Purchase?
                </FormLabel>
                <RadioGroup value={typeMovieSelected} onChange={setTypeMovieSelected}>
                  <HStack spacing={'24px'}>
                    <Radio value={typeMovie.RENT}>Rent</Radio>
                    <Radio value={typeMovie.PURCHASE}>Purchase</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
            <Divider mt={4} mb={4}/>
            <Box>
              {typeMovieSelected === typeMovie.RENT && (
                <Box>
                  <FormControl as={'fieldset'}>
                    <FormLabel as={'legend'}>
                      Add to Rent
                    </FormLabel>
                    <VStack alignItems={'stretch'}>
                      <Box>
                        <Input
                          type={'date'}
                          name={'date_rent'}
                          placeholder={'Date'}
                          value={dateRent}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setDateRent(e.target.value)}
                        />
                      </Box>
                      <Box>
                        <Input
                          inputMode={'numeric'}
                          type={'number'}
                          name={'quantity_rent'}
                          placeholder={'Quantity'}
                          value={quantityRent}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantityRent(e.target.value)}
                        />
                      </Box>
                    </VStack>
                  </FormControl>
                </Box>
              )}
              {typeMovieSelected === typeMovie.PURCHASE && (
                <Box>
                  <FormControl as={'fieldset'}>
                    <FormLabel as={'legend'}>
                      Add to Purchase
                    </FormLabel>
                    <VStack alignItems={'stretch'}>
                      <Box>
                        <Input
                          inputMode={'numeric'}
                          type={'number'}
                          name={'quantity_purchase'}
                          placeholder={'Quantity'}
                          value={quantityPurchase}
                          onChange={(e) => setQuantityPurchase(e.target.value)}
                        />
                      </Box>
                    </VStack>
                  </FormControl>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={handleOnCloseModal}>
              Close
            </Button>
            <Button colorScheme={'blue'} onClick={handleAddToCart}>Add to cart</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack mt={8}>
        <InputGroup>
          <InputLeftElement pointerEvents={'none'}>
            <Search2Icon color={'gray.300'} boxSize={6} height={'-webkit-fill-available'}/>
          </InputLeftElement>
          <Input name={'title'} placeholder={'Search movie by title'} size='lg' value={searchTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTitle(e.target.value)} />
          {searchTitle && (
          <InputRightElement width="3rem" height={'-webkit-fill-available'}>
            <IconButton
              aria-label="Clear Search"
              icon={<CloseIcon />}
              onClick={() => setSearchTitle('')}
            />
          </InputRightElement>
        )}
        </InputGroup>
        <Button onClick={handleSearchMovie} size={'lg'}>Search</Button>
      </HStack>
      <Box mt={8} display={'flex'} justifyContent={'center'}>
        {(movies?.length <= 0 && !isMovieNotFound && !showError) && (
          <Heading size={'xl'} color={'gray.300'}>Search a Movie!</Heading>
        )}
        {(isMovieNotFound && movies?.length <= 0) && (
          <Alert status='info'>
            <AlertIcon />
            Movie not found!
          </Alert>
        )}
        {(showProgress && !isMovieNotFound) && (
          <Spinner
            thickness={'4px'}
            speed={'0.65s'}
            emptyColor={'gray.300'}
            color={'blue.700'}
            size={'md'}
          />
        )}
        {(showError && !isMovieNotFound && movies?.length <= 0) && (
          <Alert status='error'>
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
        <Grid templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={8}>
          {(movies?.length > 0 && !isMovieNotFound && !showProgress) && (
            movies?.map((movie: Movie): JSX.Element => (
              <GridItem key={movie.imdbID}>
                <CardMovies
                    title={movie.Title}
                    poster={movie.Poster}
                    type={movie.Type}
                    year={movie.Year}
                    onOpenModal={onOpen}
                    selectedMovie={setSelectedMovie}
                  />
              </GridItem>
            )
          ))}
        </Grid>
      </Box>
    </>
  )
}
