import React from 'react'
import ReactDOM from 'react-dom'

import Delivery from './components/Delivery'
import data from './assets/data/dates'

import './style.scss'

class App extends React.Component{
  constructor(){
    super()

    this.state = {
      selectedDate: null
    }
  }

  componentDidMount(){
    const dates = data.dates.map(date => {
      return {
        ...date,
        date: new Date(date.date)
      }
    })
    const selectedDate = data.dates.filter(date => date.is_deliverable)[0]
    selectedDate.date = new Date(selectedDate.date)
    this.setState({ dates, selectedDate })
  }

  render(){
    if (!this.state.selectedDate) return null
    return(
      <div>
        <Delivery selected={this.state.selectedDate} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
