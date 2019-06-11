import React from 'react'
import {} from '../reducers/notificationReducer'

const Notification = props => {
    const message = props.store.getState().notification
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (message) return <div style={style}>{message}</div>
    return <div />
}

export default Notification
