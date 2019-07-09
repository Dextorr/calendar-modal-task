import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>Hello World!</h1>
        <h2 className="cooper">Cooper</h2>
        <h2 className="press-reg">GT Pressura Reg</h2>
        <h2 className="press-mon">GT Pressura Mono</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
