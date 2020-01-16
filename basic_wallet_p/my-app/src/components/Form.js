import React, { useState } from 'react';
import axios from 'axios';
import './form.scss';

const initialState = {
    id: ""
}

export default function Form({ filterChain, getCoins }) {
    const [state, setState] = useState(initialState)

    const handleChange = ({ target: { name, value } }) => setState({ [name]: value })

    const handleSubmit = e => {
        e.preventDefault()
        if (state.id.trim() === "") {
            alert("Must provide an ID to filter by")
        } else {
            console.log(state.id)
            filterChain(state.id)
            getCoins(state.id)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter the ID of the recipient to track</h2>
            <label htmlFor="id">ID:</label>
            <input type="text" value={state.id} onChange={handleChange} name="id" />
            <input type="submit" value="Filter By Id" />
        </form>
    )
}