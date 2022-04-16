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

const Course = (props) => {
  console.log(props)
  return (
    <>
    <h1> <Header coursename ={props.name} /> </h1>
      <p>
        <Content parts= {props.parts} />
      </p>
      <p><Total parts= {props.parts} /> </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
