import React, { useEffect, useState } from 'react';

function TestBackendConnection() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/read');
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return null; // or display a different message
    }

    return (
        <div>
            <h2>Data Source Output</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <div>ID: {item.id}</div>
                        {/* Access the 'text' property of the 'name' object */}
                        <div>Name: {item.name[0].text}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestBackendConnection;
