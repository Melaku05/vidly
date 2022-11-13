import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Movie Form {id}</h1>
            <button className="btn btn-primary" onClick={() => navigate('/movies')}>Save</button>
            </div>

    );
};

export default MovieForm;
