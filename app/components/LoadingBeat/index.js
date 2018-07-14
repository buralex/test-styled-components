import React from 'react';

import { BeatLoader } from 'react-spinners';

const LoadingBeat = ({loading}) => (
    <div style={{height: 15}} className="text-center">
        <BeatLoader color="gray" loading={loading} />
    </div>
);

export default LoadingBeat;
