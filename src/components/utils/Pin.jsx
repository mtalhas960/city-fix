import React from 'react'

const Pin = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill={color}>
            <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
        </svg>
    )
}

export default Pin