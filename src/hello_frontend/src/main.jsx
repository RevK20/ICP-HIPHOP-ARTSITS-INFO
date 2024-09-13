// App.js
import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as hipHopBackendIDL } from "./declarations/hiphop_backend"; // Import the IDL of your canister
import { Principal } from "@dfinity/principal";

// Setup the agent to communicate with the backend
const agent = new HttpAgent();
const canisterId = "YOUR_CANISTER_ID_HERE";
const hipHopBackend = Actor.createActor(hipHopBackendIDL, { agent, canisterId });

function App() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistList = await hipHopBackend.getArtists();
                setArtists(artistList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching artists:", error);
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    return (
        <div className="App">
            <header>
                <h1>Hip-Hop Artists Database</h1>
            </header>
            
            {loading ? (
                <p>Loading artists...</p>
            ) : (
                <div className="artist-list">
                    <ul>
                        {artists.map((artist, index) => (
                            <li key={index} className="artist-item">
                                <h2>{artist.name}</h2>
                                <p><strong>Genre:</strong> {artist.genre}</p>
                                <p><strong>Albums:</strong> {artist.albums.join(", ")}</p>
                                <p><strong>Bio:</strong> {artist.bio}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <footer>
                <p>Powered by ICP & Mokoto</p>
            </footer>
        </div>
    );
}

export default App;
