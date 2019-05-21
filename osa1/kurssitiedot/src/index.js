import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.count}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} count={props.excercises[0]} />
            <Part part={props.parts[1]} count={props.excercises[1]} />
            <Part part={props.parts[2]} count={props.excercises[2]} />
        </div>
    )
}

const Total = (props) => {
    const total = props.exercises.reduce((acc, cur) => acc + cur)
    return (
        <div>
            <p>Yhteensä {total} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys';
    const part1 = 'Reactin perusteet';
    const exercises1 = 10;
    const part2 = 'Tiedonvälitys propseilla';
    const exercises2 = 7;
    const part3 = 'Komponenttien tila';
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} excercises={[exercises1, exercises2, exercises3]} />
            <Total exercises={[exercises1, exercises2, exercises3]} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));