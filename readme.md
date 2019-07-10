# Calendar Modal Task

## Project Brief
Given mock data for available delivery dates, create a component that displays the currently selected delivery date and allows the user to select an alternative date in a calendar modal.

### Timeframe
2 days

## Technologies used

* React
* JavaScript (ES6)
* Webpack
* SCSS
* HTML5
* Git/Github

## Installation
https://github.com/Dextorr/calendar-modal-task

1. Clone or download the repository
2. Install dependencies with `yarn` in Terminal
3. Run the webpack dev server with `yarn serve` in Terminal
4. A browser window should open on `http://localhost:8000`

## Overview
![Screenshot Delivery Selection](https://user-images.githubusercontent.com/44480965/60964596-9fa6fe80-a30b-11e9-8edc-52587fcae6fb.png)

When the app opens, you will see the above view. This shows your currently selected delivery date and the date's number shows up in a small calendar icon to the left. Clicking on 'change' will open the calendar modal.

![Screenshot Calendar Modal](https://user-images.githubusercontent.com/44480965/60964749-0debc100-a30c-11e9-87b0-f3b0b34a9345.png)

This modal shows your currently selected delivery date highlighted in red, as well as available delivery dates for a 2-week period. Clicking on the 'GOT IT' button or the grey background of the modal will close the modal. Clicking on any of the available (non-grey) delivery dates will change your currently selected date.

![Screenshot New Date Selected](https://user-images.githubusercontent.com/44480965/60965590-193fec00-a30e-11e9-8e98-776cf329856a.png)

Closing the modal after selecting a new date will have updated the display of your currently selected delivery date.

![Screenshot 2019-07-10 at 12 29 36](https://user-images.githubusercontent.com/44480965/60965713-67ed8600-a30e-11e9-9f6a-81231d357b57.png)

## Process

#### App
I began by creating a React app that would conditionally display two different components, the delivery date display component with a button that triggers the render of the second component, the calendar modal.

This is achieved by the button's click handler, `handleModal` flipping a boolean, `modal`, stored in the main app component's state.

```javascript
handleModal(e){
  // Prevent change 'a' tag from refreshing the page
  if(e) e.preventDefault()
  this.setState({ modal: !this.state.modal })
}
```
This way only when `this.state.modal` is `true` will the `Modal` component render. This function is also passed to the `Modal` component and is invoked on click of the modal's background or the 'GOT IT' button on the modal.

For date selection, the data below was provided.

```javascript
dates: [
  {
    date: '2019-05-27',
    is_deliverable: true
  },
  {
    date: '2019-05-28',
    is_deliverable: false
  },
  {
    date: '2019-05-29',
    is_deliverable: true
  },
  {
    date: '2019-05-30',
    is_deliverable: true
  },
  {
    date: '2019-05-31',
    is_deliverable: false
  },
  {
    date: '2019-06-01',
    is_deliverable: false
  },
  {
    date: '2019-06-02',
    is_deliverable: true
  },
  {
    date: '2019-06-03',
    is_deliverable: true
  },
  {
    date: '2019-06-04',
    is_deliverable: false
  },
  {
    date: '2019-06-05',
    is_deliverable: true
  },
  {
    date: '2019-06-06',
    is_deliverable: true
  },
  {
    date: '2019-06-07',
    is_deliverable: false
  },
  {
    date: '2019-06-08',
    is_deliverable: false
  },
  {
    date: '2019-06-09',
    is_deliverable: true
  }
]
}
```

Using this data I set the initial value of the current delivery date in state as the first available delivery date in the 2-week period. I achieved this by filtering the array of dates by their `is_deliverable` property and selecting the first object in the filtered array. This way, even if the first one or two dates in a given period are not deliverable dates, the selected date will default to the first deliverable one.

```javascript
componentDidMount(){
  // Convert dates from strings to Date objects
  const dates = data.dates.map(date => {
    return {
      ...date,
      date: new Date(date.date)
    }
  })

  // Set selectedDate to be first deliverable date
  const selectedDate = data.dates.filter(date => date.is_deliverable)[0]
  selectedDate.date = new Date(selectedDate.date)
  this.setState({ dates, selectedDate })
}
```

I converted the date strings into JavaScript `Date` objects so that they were workable within the app. The currently selected date is passed to both components in props so that they can display the currently selected date.

### Modal

The `Modal` component is required to display the month(s) in its header and to animate into view.

```javascript
componentDidMount(){
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const currentMonths = []

  this.props.dates.forEach(date => {
    const currentMonth = months[date.date.getMonth()]
    if(!currentMonths.includes(currentMonth)) currentMonths.push(currentMonth)
  })

  // Timeout to ensure that the modal animation starts after the component is rendered initially
  setTimeout(() => this.setState({ displayed: true, currentMonths }), 1)
}
```

I achieved this by having the modal's scale and opacity set to 0 with SCSS initially and then transition to 1 for both values from there when the `displayed` property in the modal's state is `true`. I put the `setState` on a timeout of 1ms to ensure that the animation wouldn't trigger until the component was first rendered invisible, otherwise it just pops in to view without the transition.

The months I got to display by pushing months included in the given date range into an empty array, `currentMonths`, without duplicates. This yields an array of either 1 or 2 strings depending on where the range of dates fall. The header string is generated by `currentMonths.join('/')`, giving either the one month alone or two months separated by a `/`, as a string.

Considering that the range of dates may not always fall on a Monday, I rendered the day labels of the calendar according to the data provided.

```javascript
<div className="days">
  {this.props.dates.map((date, i) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    if (i<=6)return <p key={i}>{days[date.date.getDay()]}</p>
  })}
</div>
```

This creates 7 `<p>` tags according to the first 7 entries with the appropriate day initial using the JavaScript `Date.getDay()` method.


For the actual calendar, I created a div for each date in the data provided, they get a class of disabled if they are not deliverable dates and only get the click handler `onClick` if they are deliverable dates. The currently selected date from main app state gets a class of selected.

```javascript
<div className="dates">
  {this.props.dates.map((date, i) => {
    return <div
      key={i}
      className={`${
        date.is_deliverable ?
          '':'disabled'} ${
        date.date.getTime() === this.props.selected.date.getTime() ?
          'selected':''}`}
      data-date={date.date}
      // Only deliverable dates are clickable
      onClick={date.is_deliverable ? this.props.handleDate:null}
    >
      <span className="date-num">
        {date.date.getDate()}
      </span>
    </div>
  }
  )}
</div>
```

When a new date is clicked on, it replaces the currently selected date in main app state with the function below.

```javascript
handleDate({ target }){
  const selectedDate = {
    ...this.state.selectedDate,
    date: new Date(target.dataset.date)
  }
  this.setState({ selectedDate })
}
```

Utilising the `data-date` attribute from the calendar cell that was clicked on, the new date is set, which updates the renders of both `Delivery` and `Modal` components.

## Wins

I think I did a fair job of considering how the components would work given variations of the provided dataset rather than just making sure it worked with the specific data given and emulating the layout of the task brief exactly. I was quite pleased that my solutions worked out.

I set out to finish this task without using a CSS framework or animation libraries and minimal third-party packages and am happy with how it turned out.

## Challenges

I think I may have over-engineered some of my solutions and given more time I'd have put more consideration into refactoring and experimenting with some more elegant solutions, rather than just using what I was quite certain would work.

For example, using a 1ms timeout in the `Modal` component's `componentDidMount()` doesn't feel like a very elegant way to get the animation for the modal to work correctly and I would love to find a better solution to this.

I'd have also liked to spend some time on ensuring responsive layouts, but I was far more focused on the functionality.
