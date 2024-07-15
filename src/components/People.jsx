import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Person from './Person';

const People = ({persons}) => {

  const [editingId, setEditingId] = useState(null);
  const [editedPerson, setEditedPerson] = useState({
    name:'',
    role:'',
    img:''
  });

  //Metodo para capturar los datos desde el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  //Metodo para editar los datos de una persona
  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return(
              <div key={person.id}>
                <Person
                  id={person.id}
                  name={person.name}
                  img={person.img}
                  role={person.role}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/*Renderiza el formulario para crear o editar los datos de una persona* */}
      <div className='container mt-4 row p-2'>
        <h2 className='text-center my-4'>Crear nuevo empleado</h2>
        <form className='border border-dark rounded p-4'>
          <div className="mb-3">
            <label className='form-label'>Nombres</label>
            <input type="text" name='name' className="form-control" value={editedPerson.name}
            onChange={handleChange} aria-describedby="nombre"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="text" name='rol' className="form-control" value={editedPerson.role} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input type="text" name='img' className="form-control" value={editedPerson.img} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
  )
}

export default People

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}



