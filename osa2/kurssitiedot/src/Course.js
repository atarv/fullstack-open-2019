import React from 'react';
// import ReactDOM from 'react-dom';

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

const Content = ({parts}) => {
    const list = () => {
        return (
            parts.map(part => <Part part={part} />)
        )
    }
    return (
        <div>
            {list()}
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

const Course = ({ course }) => {
    return (
        <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course