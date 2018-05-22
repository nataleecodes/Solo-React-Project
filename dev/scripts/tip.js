import React from 'react';

const Tip = (props) => {
    if (props.tip === null) {
        return null;
    }
    return (
        <div>
            <p className="snark"><em>{props.tip}</em></p>
        </div>
    )
}

export default Tip;