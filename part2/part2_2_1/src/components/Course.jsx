const Course = ({ name, parts }) => {
  return(
    <>
    <Header name={name} />
    <Content parts={parts} />
    </>
    )
}

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <p><b>total of {total(parts)} exercises</b></p>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>{name} {exercises}</p>
  )
}

const total = (parts) => {
  return parts.reduce((sum, part) =>{
    return sum + part.exercises
  }, 0);
}

export default Course;