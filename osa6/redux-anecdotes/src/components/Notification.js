import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
    const message = props.notification
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (message) return <div style={style}>{message}</div>
    return <div />
}

const mapStateToProps = state => {
    return {
        notification: state.notifications
    }
}

export default connect(mapStateToProps)(Notification)
