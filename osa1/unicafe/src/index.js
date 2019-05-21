import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const Statistics = ({ hyva, neutraali, huono }) => {
    const yhteensa = hyva + neutraali + huono
    const keskiarvo = (hyva + (-1 * huono)) / yhteensa
    const positiivisia = hyva / yhteensa
    if (yhteensa <= 0)
        return (<div><p>Ei yhtään palautetta annettu</p></div>)
    else
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text="Hyvä" value={hyva} />
                        <Statistic text="Neutraali" value={neutraali} />
                        <Statistic text="Huono" value={huono} />
                        <Statistic text="Yhteensä" value={yhteensa} />
                        <Statistic text="Keskiarvo" value={keskiarvo} />
                        <Statistic text="Positiivisia" value={positiivisia} />
                    </tbody>
                </table>
            </div>
        )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={() => setGood(good + 1)} text="hyvä" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
            <Button handleClick={() => setBad(bad + 1)} text="huono" />
            <h1>Statistiikka</h1>
            <Statistics hyva={good} neutraali={neutral} huono={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));