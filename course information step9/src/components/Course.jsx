const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.part.name} {props.part.exercises}
      </div>
    )
  }
  
  const Content = ({course}) => {
      return (
      <div>
        {course.parts.map((course) => {
          return <Part key={course.name} part={course}/>;
        })}
      </div>
    )
  }
  
  
  const Course = ({courses}) => {
  
      return (
  
        courses.map((course) => {
          return (
            <div key={course.id}>
              <Header course={course}/>
              <Content course={course}/>
              <Sum course={course}/>
            </div>
          )
        })
  
      )
      
  }
  
  
  const Sum = ({course}) => {
  
    const sum = course.parts.reduce((acc, cur) => {
      acc += cur.exercises;
      return acc
    }, 0)
  
    return (
      <h2>
        total of {sum} exercises
      </h2>
    )
  }

  
  export default Course;