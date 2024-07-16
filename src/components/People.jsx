import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Person from './Person';

const People = ({persons,setPersons}) => {

  //Estado para identificar a la persona que se está editando
  const [editingId, setEditingId] = useState(null);

  //Estado para guardar la persona eliminada
  const [personToDelete, setPersonToDelete] =useState(null);

  //Estado para la persona que se editó
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  });

  //Estado para establecer si se está editando o no
  const[isEditing, setIsEditing] =useState(false);

  //Metodo para capturar los datos desde el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  //Metodo para crear nuevo empleado
  const handleCreate = (e) => {

    //Prevenir que el navegador se actualice
    e.preventDefault();

    setPersons([...persons,{id: persons.length + 1, ...editedPerson}]);

    //Resetear la variable de estado de editedPerson
    setEditedPerson({name: '' , role: '' , img: '' });
  }

  //Metodo para editar los datos de una persona
  const handleEdit = (id, e) => {

    //Establecemos el Id de la persona a editar
    setEditingId(id);

    //Activar el estado de edición
    setIsEditing(true);

    //Buscar la persona a editar
    const personToEdit = persons.find(person => person.id === id);

    setEditedPerson({...personToEdit});
  }

  //Metodo para actualizar los datos modificados
  const handleSave = (e) => {

    //Prevenir que el navegador se actualice
    e.preventDefault();

    //Actualizar el estado de persons al guardar los datos modificados
    const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person)

    //Actualizar los datos para la persona en el array
    setPersons(updatedPersons);

    //Desactivar el estado de edición
    setIsEditing(false);

    //Resetear la variable de estado a null
    setEditingId(null);

    //Resetear la variable de estado editedPerson
    setEditedPerson({name: '' , role: '' , img: '' });
  }

  //Metodos para eliminar una persona del array
  //Obtener el id de la persona a eliminar del array
  const handleDelete = (id) => {
    setPersonToDelete(id);
  }

  const confirmDelete = () => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }

  const cancelDelete = () => {
    setPersonToDelete(null);
  }

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
                  handleEdit={() => handleEdit(person.id)}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/*Renderiza el formulario para crear o editar los datos de una persona* */}
      <div className='container mt-4 row p-2'>
        <h2 className='text-center my-4'>{isEditing?'Actualizar Empleado':'Crear Nuevo Empleado'}</h2>
        <form className='border border-dark rounded p-4'>
          <div className="mb-3">
            <label className='form-label'>Nombres</label>
            <input type="text" name='name' className="form-control" value={editedPerson.name}
            onChange={handleChange} aria-describedby="nombre"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="text" name='role' className="form-control" value={editedPerson.role} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input type="text" name='img' className="form-control" value={editedPerson.img} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={isEditing?handleSave : handleCreate}>
            {isEditing?'Modificar':'Crear'}</button>
        </form>
      </div>
      {/* Modal de confirmación de eliminación */}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default People

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}



