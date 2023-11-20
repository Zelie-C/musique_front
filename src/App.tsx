import './index.css'
import AddSong from './routes/AddSong'
import Connexion from "./routes/Connexion"
import Home from './routes/Home'
import Update from './routes/Update'

function App() {


  return (
    <>
     <Connexion />
     <Home />
     <AddSong />
     <Update />
    </>
  )
}

export default App
