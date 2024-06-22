import './App.css'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import { useDispatch } from 'react-redux'
import { setLogin } from './redux/Auth/authSlice'
import { setAuthToken } from './utils/constants'

function App() {
const token = JSON.parse(localStorage.getItem('token'))
const dispatch = useDispatch()

useEffect(() => {
  if(token){
    setAuthToken(token)
    dispatch(setLogin(token))
   }
}, [])

  return (
    <div className="App">
        <Layout />
    </div>
  )
}

export default App
