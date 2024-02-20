import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import PokedexPage from './components/pages/PokedexPage'
import PokedIdPage from './components/pages/PokeIdPage'
import ProtectedRoutes from './components/pages/ProtectedRoutes'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route element={<ProtectedRoutes />}>
          <Route path='pokedex' element={<PokedexPage/>}/>
          <Route path='pokedex/:id' element={<PokedIdPage/>}/>
        </Route>
      </Routes>

    </>
  )
}

export default App
