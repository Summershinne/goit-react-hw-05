import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState("");
    
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }
        onSubmit(query);
        setQuery("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                value={query}
                placeholder="Search movies"
                name="search"
                required
                autoFocus
            />
            <button type="submit">
                Search
            </button>
            <Toaster />
        </form>
    );
};