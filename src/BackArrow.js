import React from 'react';
import { Link } from 'react-router-dom';

function BackArrow() {
  return (
    <div className="mb-3">
      <Link to="/" className="btn btn-light">
        <span className="material-icons">arrow_back</span>
      </Link>
    </div>
  );
}

export default BackArrow;
