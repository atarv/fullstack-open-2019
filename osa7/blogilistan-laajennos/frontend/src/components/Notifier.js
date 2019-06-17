import React from 'react'

const Notifier = props => {
    const message = props.message
    if (message === null) return <></>

    return <div>{message}</div>
}

export default Notifier
