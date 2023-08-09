import { useEffect, useState } from 'react';
import { addPersons, getPersons, deletePerson, updatePerson } from './API';
import './App.css';
const Filter = ({ search, handleSearch }) => {
  return (
    <>
      Search:
      <input
        value={search}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </>
  );
};

const Form = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Persons = ({ filtredPeople, handleDelete }) => {
  return (
    <>
      {filtredPeople.map((person) => {
        return (
          <div key={person.id}>
            <p>
              {person.name} {person.number}
            </p>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

const Notificatin = ({ message, status }) => {
  return <div className={status}>{message}</div>;
};

function App() {
  const [persons, setPersons] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPersons();
      setPersons(response);
    };

    fetchData();
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const exists = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (!newName || !newNumber) {
      alert('must add name and number');
    } else if (exists.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      try {
        const response = await addPersons(personObject, setMessage, setStatus);
        if (response && response.hasOwnProperty('name')) {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        }
      } catch {
        setNewName('');
        setNewNumber('');
      }
    } else {
      if (
        window.confirm(
          `${newName} already in phonebook, want to replace number ?`
        )
      )
        try {
          const Person = persons.find((n) => (n.name = newName));

          const response = await updatePerson(
            Person.id,
            {
              ...Person,
              number: newNumber,
            },
            setMessage,
            setStatus
          );

          if (response && response.hasOwnProperty('name')) {
            setPersons(
              persons.map(
                (person) => (person.name = newName ? response : person)
              )
            );
            setNewName('');
            setNewNumber('');
          }
        } catch {
          setNewName('');
          setNewNumber('');
        }
    }
  };

  const handleDelete = async (id) => {
    const name = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${name.name} ?`)) {
      await deletePerson(id, setMessage, setStatus);
      const newData = persons.filter((person) => person.id !== id);
      setPersons(newData);
    }
  };

  const filtredPeople =
    search === ''
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().startsWith(search.toLowerCase());
        });

  return (
    <div>
      <Notificatin message={message} status={status} />
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={setSearch} />
      <h2>Add New</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filtredPeople={filtredPeople} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
