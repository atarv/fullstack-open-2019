import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Notification = ({ message }) => {
    if (!message) return null
    const type = !message.type ? 'success' : message.type
    return <div className={type}>{message.text}</div>
}

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

const Person = ({ person, handleDelete }) => {
    return (
        <li key={person.id}>
            {person.name} {person.number}
            <button key={'b' + person.id} onClick={() => handleDelete(person)}>
                poista
            </button>
        </li>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [searchString, setSearchString] = useState('')
    const [message, setMessage] = useState(undefined)
    const listNames = () => {
        return persons.map(person =>
            person.name.toLowerCase().includes(searchString.toLowerCase()) ? (
                <Person person={person} key={person.id} handleDelete={handleDelete} />
            ) : (
                undefined
            )
        )
    }
    const handleDelete = person => {
        if (!window.confirm(`Poistetaanko ${person.name}?`)) return undefined
        personService
            .remove(person.id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== person.id))
            })
            .then(() => setMessage({ text: `Poistettiin ${person.name}`, type: 'success' }))
            .catch(() => {
                setMessage({ text: `${person.name} oli jo poistettu palvelimelta`, type: 'error' })
                setPersons(persons.filter(p => p.id !== person.id))
            })
        setTimeout(() => setMessage(null), 5000)
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
        const existingPerson = persons.find(p => p.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} on jo luettelossa. Korvataanko numero uudella?`)) {
                newPerson.id = existingPerson.id
                personService
                    .replace(newPerson)
                    .then(() => {
                        // etsitään vanha
                        const existingIndex = persons.findIndex(p => p === existingPerson)
                        // luodaan kopio listasta, koska React
                        const altered = persons.concat()
                        // vaihdetaan kopiossa uusi alkio vanhan tilalle
                        altered[existingIndex] = newPerson
                        setPersons(altered)
                    })
                    .then(() =>
                        setMessage({
                            text: `Päivitettiin henkilön ${newPerson.name} numeroksi ${
                                newPerson.number
                            }`,
                            type: 'success'
                        })
                    )
                    .catch(setMessage({ text: `Päivittäminen epäonnistui`, type: 'error' }))
                setTimeout(() => setMessage(null), 5000)
            }
        } else {
            personService
                .post(newPerson)
                .then(response => setPersons(persons.concat(response)))
                .then(() => setMessage({ text: `Lisättiin ${newPerson.name}`, type: 'success' }))
                .catch(err => {
                    console.log(err.response.data)
                    setMessage({ text: `Lisääminen epäonnistui`, type: 'error' })
                })
            setTimeout(() => setMessage(null), 5000)
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
            <Notification message={message} />
            <Filter filterNames={filterNames} />
            <h2>Lisää uusi</h2>
            <Form handleNimi={handleNimi} handleNumero={handleNumero} handleSubmit={handleSubmit} />
            <h2>Numerot</h2>
            <NamesList listNames={listNames} handleDelete={handleDelete} />
        </div>
    )
}

export default App
