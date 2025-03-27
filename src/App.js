import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [matches, setMatches] = useState([]);  // Initialize as empty array
    const [loading, setLoading] = useState(true);  // To track loading state

    useEffect(() => {
        axios.get("http://localhost:5001/livescores")  // Backend URL
            .then(response => {
                setMatches(response.data.response || []);  // Set matches to an empty array if data is undefined
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching live scores:", error);
                setLoading(false);  // Set loading to false even if there's an error
            });
    }, []);

    if (loading) {
        return <div>Loading live scores...</div>;  // Show loading message while data is being fetched
    }

    return (
        <div>
            <h1>Live Football Scores</h1>
            {matches.length === 0 ? (
                <p>No matches available at the moment.</p>  // Message if no matches are available
            ) : (
                <ul>
                    {matches.map(match => (
                        <li key={match.fixture.id}>
                            {match.teams.home.name} vs {match.teams.away.name} - {match.fixture.status.short}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
