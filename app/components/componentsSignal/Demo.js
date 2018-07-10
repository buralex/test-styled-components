import React from 'react'

import {
    withSignal,
    withSignalPropTypes,
    SignalTypes
} from 'redux-signal'

const Demo = ({ createSignal }) => {
    return (
        <div>
            <button
                onClick={() => {
                    console.log('dddd');
                    createSignal({
                        type: SignalTypes.OK,
                        title: 'hi',
                        message: 'Hello world'
                    })
                }}>
                Show ok
            </button>
        </div>
    )
}

Demo.propTypes = {
    ...withSignalPropTypes
}

export default withSignal(Demo)
