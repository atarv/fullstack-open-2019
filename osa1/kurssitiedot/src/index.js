import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return (
        <div>
            <p>Yhteensä {total} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));