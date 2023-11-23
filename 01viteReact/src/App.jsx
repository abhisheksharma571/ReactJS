import Chai from "./chai"
function App() {
  const username ="chai aur code"
  return (     //can return only one element, so we have to write all in a fragment(empty tag)
    <>
    <Chai/>
    <h1>Chai aur react {username}</h1>   //variable used in the curly braces - evaluated expression
    <p>Test para</p>
    </>
  )
}

export default App
