import React from 'react';
import { BallTriangle } from 'react-loader-spinner'


const Spinner = () => {
    return (
        <div className="mt-5 d-flex justify-content-center">
            <BallTriangle color="#28a745" height={100} width={100} />
        </div>
    );
};

export default Spinner;