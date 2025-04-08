const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
const friends = ['Maya', 'John']
  // Fragment es una forma de agrupar varios elementos sin crear un nodo extra en el DOM
return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App //No borrar, es el export por defecto y es necesario para que funcione el proyecto