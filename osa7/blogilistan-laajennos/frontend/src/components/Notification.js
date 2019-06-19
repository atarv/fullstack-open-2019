import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Message } from 'semantic-ui-react'

const Notification = ({ message }) => {
    if (message === null) return <></>

    return message && <Message success>{message}</Message>
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
