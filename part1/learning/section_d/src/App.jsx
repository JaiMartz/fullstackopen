

import {useState} from 'react'
/*
Un estado mas complejo
Si necesitamos un estado mas complejo, usamso useState para crear "partes" de estado separadas

Creamos dos partes de estado para la aplicacion llamada left y right

Podemos guardar el recuento de clics de los botones left y right en un solo objeto

*/
const App = () => {


  /*
  //Manejo de estado con objetos
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

Manejo de estado con objetos
  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }
    */

  //Lo mismo que arriba pero con object spread
  /*
  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks)
    }

    */
   /*
// aun mas simplificado
 const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
 const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})

*/

  //Manejo de arrays
const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
const [allClicks, setAll] = useState([])
const [total, setTotal] = useState(0)

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      Button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

//Manejo de arrays
//tener en cuenta que el estado no se actualiza inmediatamente, 
// por lo que si queremos actualizar el total, debemos hacerlo despues de actualizar left o right, y no antes
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  const updateLeft = left + 1
  setLeft(updateLeft)
  setTotal(updateLeft + right)
}

const handleRightClick = () => {
  setAll(allClicks.concat('R'))
  const updateRight = right + 1
  setRight(updateRight)
  setTotal(left + updateRight)
}

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App
