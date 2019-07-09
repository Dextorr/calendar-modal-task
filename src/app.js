import React from 'react'
import ReactDOM from 'react-dom'

import Delivery from './components/Delivery'

import './style.scss'

class App extends React.Component{
  constructor(){
    super()

    this.state = {
      today: null
    }
  }

  render(){
    return(
      <div>
        <Delivery />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
