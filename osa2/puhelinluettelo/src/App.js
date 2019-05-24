import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
                <button type="submit">lisää</button>
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

const Person = ({ person }) => {
    return (
        <li key={person.name}>
            {person.name} {person.number}
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
                <Person person={person} key={person.name} />
            ) : (
                undefined
            )
        )
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
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} on jo olemassa`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
        }
    }
    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
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
            <NamesList listNames={listNames} />
        </div>
    )
}

export default App
