import React from 'react'

export const TextAlign = (props) => {
    return (
        <div style={{textAlign: props.value ? props.value : 'left', width: '100%'}}>
            {props.children}
        </div>
    )
}