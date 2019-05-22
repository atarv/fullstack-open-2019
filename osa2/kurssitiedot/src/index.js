import React from 'react';
import ReactDOM from 'react-dom';
import Course from './Course'

const App = () => {
    const courses = [{
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
    },
    {
        name: 'Node.js',
        parts: [
            {
                name: 'Routing',
                exercises: 3
            },
            {
                name: 'Middlewaret',
                exercises: 7
            }
        ]
    }
]

    const listCourses = () => {
        return (
            courses.map(course => <Course course={course} />)
        )
    }

    return (
        <div>
            {listCourses()}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));