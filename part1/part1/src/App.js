const Header = (props) => {
  return (
    <div>
      <p>
         {props.coursename}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part partname= {props.parts[0].name} exname = {props.parts[0].exercises} />
        <Part partname= {props.parts[1].name} exname = {props.parts[1].exercises} />
        <Part partname= {props.parts[2].name} exname = {props.parts[2].exercises} />
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
         {props.parts[0].exercises} + {props.parts[1].exercises} + {props.parts[2].exercises}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
      {props.partname}, {props.exname}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1> <Header coursename ={course.name} /> </h1>
      <p>
        <Content parts= {course.parts} />
      </p>
      <p><Total parts= {course.parts} /> </p>
    </div>
  )
}

export default App
