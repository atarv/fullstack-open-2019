import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Form = ({ handleNimi, handleNumero, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                nimi: <input onChange={handleNimi} />
            </div>
            <div>
                numero: <input onChange={handleNumero} />
            </div>
            <div>
                <button type='submit'>lisää</button>
            </div>
        </form>
    )
}

const Filter = ({ filterNames }) => {
    return (
        <div>
            Rajaa näytettävä <input onChange={filterNames} />
        </div>
    )
}

const NamesList = ({ listNames }) => {
    return <ul>{listNames()}</ul>
}

const Person = ({ person, handleDelete }) => {
    return (
        <li key={person.id}>
            {person.name} {person.number}
            <button key={'b' + person.id} onClick={() => handleDelete(person)}>poista</button>
        </li>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [searchString, setSearchString] = useState('')
    const listNames = () => {
        return persons.map(person =>
            person.name.toLowerCase().includes(searchString.toLowerCase()) ? (
                <Person person={person} key={person.id} handleDelete={handleDelete} />
            ) : (
                undefined
            )
        )
    }
    const handleDelete = person => {
        if (!window.confirm(`Poistetaanko ${person.name}?`))
            return undefined
        personService.remove(person.id).then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
        })
    }
    const handleNimi = event => {
        setNewName(event.target.value)
    }
    const handleNumero = event => {
        setNumber(event.target.value)
    }
    const filterNames = event => {
        setSearchString(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault()
        const newPerson = { name: newName, number: newNumber }
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} on jo olemassa`)
        } else {
            personService
                .post(newPerson)
                .then(response => setPersons(persons.concat(response.data)))
        }
    }
    const hook = () => {
        personService.getAll().then(persons => {
            setPersons(persons)
        })
    }

    useEffect(hook, [])

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Filter filterNames={filterNames} />
            <h2>Lisää uusi</h2>
            <Form handleNimi={handleNimi} handleNumero={handleNumero} handleSubmit={handleSubmit} />
            <h2>Numerot</h2>
            <NamesList listNames={listNames} handleDelete={handleDelete} />
        </div>
    )
}

export default App
