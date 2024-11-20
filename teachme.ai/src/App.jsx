import { useState } from 'react'
import FileUpload from './components/fileUpload'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FileUpload/>
    </>
  )
}

export default App
