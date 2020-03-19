import React from "react";
import {Link} from "react-router-dom";

export default class MusicPrototype extends React.Component {
    componentDidMount() {
        let searchTitle = this.props.match.params.latestTitleSearch;
        console.log(this.props.match.params);
        if(searchTitle === undefined) {
            searchTitle = 'skyfall';
            this.props.history.push(`prototype/${searchTitle}`)
        }
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTitle}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "9984d671c1msh45c86ae9a835934p140e6djsnc3b65bcd54d0"
            }
        }).then(response => response.json())
            .then(results => this.setState({
                musics: results.data,
                titleSearch: searchTitle
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.latestTitleSearch !== this.props.match.params.latestTitleSearch) {
            this.findMusicByTitle(this.props.match.params.latestTitleSearch)
        }
    }

    findMusicByTitle = (title) =>
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${title}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "9984d671c1msh45c86ae9a835934p140e6djsnc3b65bcd54d0"
            }
        }).then(response => response.json())
            .then(results => this.setState({
                musics: results.data
            }));

    state = {
        musics: [],
        titleSearch: ''
    }
    render() {
        return(
            <div>
                <h1>Deezer Client ({this.props.match.params.latestTitleSearch})</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input
                            onChange={e => this.setState({
                                titleSearch: e.target.value
                            })}
                            value={this.state.titleSearch}
                            className={`form-control`}/>

                        <button
                            onClick={() => this.props.history.push(this.state.titleSearch)}
                            className={`btn btn-primary btn-block`}>
                            Search Music
                        </button>
                    </li>
                    {
                        this.state.musics && this.state.musics.map(music =>
                            <li key={music.id}
                                className="list-group-item">
                                <Link to={`/prototype/musics/${music.album.id}`}>
                                    {music.title}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
