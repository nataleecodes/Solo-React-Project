import React from 'react';

const Wine = (props) => {
    if (props.suggestion === null) {
        return null;
    }
    return (
        <div>
            <p>You should bring {props.suggestion}</p>
        </div>
    )
}

export default Wine;