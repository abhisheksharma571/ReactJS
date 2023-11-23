import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
    return (
        <div>
            <h1>Custom App !</h1>
        </div>
    )
}

// const ReactElement = {
//     type: 'a',
//     props: {
//         href: 'https://google.com',
//         target: '_blank'
//     },
//     children: 'Click me to visit google'
// }

const anotherElement = (
    <a href="http://google.com" target='_blank'>Visit Google</a>
)

const anotherUser = "chai aur react"
const reactElement = React.createElement(  //we have used render of react
    'a',                                            //tag
    {href: 'https://google.com', target: '_blank'},  //object
    'click me to visit google',                       //text
    anotherUser                                        //variable

)

ReactDOM.createRoot(document.getElementById('root')).render(
    // <App/>
    //  MyApp()   //we can write instead, but not suggested
    // <MyApp />

    // ReactElement   - syntax of ReactElement is not correct, someone other created render which not works for this element, we have to use render of react
    // anotherElement    //object
    reactElement
  
)
