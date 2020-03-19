import React from "react";

export default class MusicDetails extends React.Component {
    componentDidMount() {
        const album_id = this.props.match.params.album_id;
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${album_id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "9984d671c1msh45c86ae9a835934p140e6djsnc3b65bcd54d0"
            }
        }).then(response => response.json())
            .then(album => this.setState({
                album: album
            }))
    }

    state = {
        album: {}
    };
    render() {
        console.log(this.state.album)
        return(
            <div>
                {this.state.album &&
                    <div>
                        <h1>Music Details: </h1>
                        <h2>Album: {this.state.album.title}</h2>
                        <h2>Artist: {this.state.album.artist && this.state.album.artist.name}</h2>
                        <h2>Genres: {this.state.album.genres && this.state.album.genres.data.map(genre =>
                        <p key={genre.id}>{genre.name}</p>)}</h2>
                        <br/>
                        <h2>Cover:</h2>
                        <img src={this.state.album.cover}/>
                    </div>
                }
            </div>
        )
    }
}
