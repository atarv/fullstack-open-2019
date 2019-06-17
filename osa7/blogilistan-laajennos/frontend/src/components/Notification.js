import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = ({ message }) => {
    if (message === null) return <></>

    return <div>{message}</div>
}

const mapStateToProps = state => {
    return {
        message: state.notification
    }
}

const mapDispatchToProps = {
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification)
