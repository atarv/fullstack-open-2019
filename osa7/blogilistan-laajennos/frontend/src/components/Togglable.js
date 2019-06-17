import React, { useState } from 'react'

const Togglable = props => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggelVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggelVisibility}>{props.buttonText}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggelVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable
