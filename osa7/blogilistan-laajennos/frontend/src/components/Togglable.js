import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

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
                <Button onClick={toggelVisibility}>{props.buttonText}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button animated="fade" onClick={toggelVisibility}>
                    <Button.Content hidden>Piilota</Button.Content>
                    <Button.Content visible>
                        <Icon name="hide" />
                    </Button.Content>
                </Button>
            </div>
        </div>
    )
}

export default Togglable
