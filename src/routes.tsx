import { createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/RootPage'
import ListMoviesPage from './pages/ListMoviesPage'
import ErrorPage from './pages/ErrorPage'
import ShoppingCartDetail from './pages/ShoppingCartDetail'
import ShoppingFinish from './pages/ShoppingFinish'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ListMoviesPage/>
      },
      {
        path: '/shopping-cart',
        element: <ShoppingCartDetail/>
      },
      {
        path: '/shopping-finish',
        element: <ShoppingFinish/>
      }
    ]
  },
])

export default routes