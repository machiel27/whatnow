import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    return (
        <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p> If this page doesn't load, please refresh the browser tab. The Database might still be waking up. :)</p>
        </div>
    );
};

export default Spinner;
