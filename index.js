/* Full-stack open 2019 Osa 3 puhelinluettelo */
const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '045-1236543'
    },
    {
        id: 2,
        name: 'Arto Järvinen',
        number: '041-21423123'
    },
    {
        id: 3,
        name: 'Lea Kutvonen',
        number: '040-04323234'
    },
    {
        id: 4,
        name: 'Martti Tienari',
        number: '09-784232'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        return res.status(404).end()
    }
    res.json(person)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.charset = 'UTF-8'
    res.send(`<p>Puhelinluettelossa on ${persons.length} nimeä</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
