const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const SongContainer = (props) => {

    const [songs, setSongs] = useState(props.songs);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const loadSongsFromServer = async () => {
            console.log('loading songs . . .');
            const response = await fetch('/getSongs');
            const data = await response.json();
            setSongs(data);
        }
        loadSongsFromServer();
    }, [reload]);




    if (songs.length === 0) {
        return (
            <><h3>No songs yet..</h3></>
        );
    }

    const songList = songs.map((song) => {
        return (
            <div key={song.title}>
                <h2><i>{song.title}</i> - {song.artist}</h2>
            </div>
        );
    });

    return (
        <div>
            <h1>My Fav Songs!</h1>
            <button onClick={()=>setReload(!reload)}>Reload Songs</button>
            {songList}
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<SongContainer songs={[]} />);
}

window.onload = init;
