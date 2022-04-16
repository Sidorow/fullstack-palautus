const Course = (props) => {
    return (
      <div>
      <h1> <Header coursename ={props.course.name} /> </h1>
          <Content parts= {props.course.parts} />
          <Total parts= {props.course.parts} />
      </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
           {props.coursename}
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
        <li
          key={part.name}>
            <Part partname={part.name} exname={part.exercises}/>
        </li>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.map(exercise => exercise.exercises).reduce((prev, curr) => prev + curr, 0)
    return (
      <div>
           Total: {sum} exercises
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.partname}, {props.exname}
      </div>
    )
  }

export default Course