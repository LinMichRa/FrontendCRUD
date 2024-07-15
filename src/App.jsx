import { useState } from 'react';
import './App.css';
import People from './components/People';

function App() {

  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Pepe",
      role: "Frontend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar4.png"
    },
    {
      id: 2,
      name: "Santiago",
      role: "Backend Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar5.png"
    },
    {
      id: 3,
      name: "Juan",
      role: "FullStack Developer",
      img:"https://bootdey.com/img/Content/avatar/avatar2.png"
    },
  ]);
  
  return (
    <>
      <div className='App'>
        <div className='container'>
          <People persons ={persons} setPersons={setPersons}/>
        </div>
      </div>
    </>
  )
}

export default App
