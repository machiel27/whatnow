import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    return (
        <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
    );
};

export default Spinner;
