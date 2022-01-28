import React from "react";
import './memes.css';
import { Link } from "react-router-dom";

var MEME_API_BASE_URL = 'http://localhost:5555';

interface Meme {
  _id: number;
  name: string;
  link: string;
  user: string;
  __v: number
}

interface MemesState {
  selectedBaseImage?: Meme
  memes: Meme[]
}
  
export default class Memes extends React.Component<{}, MemesState> {

  state = {
    selectedBaseImage: undefined,
    memes: []
  }

  // initialize this.state.memes
  componentDidMount() {
    fetch(`/memes`)
      .then(response => response.json())
      .then(memes => {
        this.setState({
          memes: memes
        })
      })
      .catch(error => console.log(error))
  }

  selectBaseImage = (meme: Meme) => {
    this.setState({selectedBaseImage: meme})
  }

  memeURL = () => {
    var meme: Meme = this.state.selectedBaseImage!
    if(!meme){
      return null
    }
    const url = new URL(`${MEME_API_BASE_URL}/memes/${meme['name']}`);
    return url
  }

  storeMemeLocally = () => {
    let fetchUrl = `${this.memeURL()!.pathname}`;
    fetch(fetchUrl)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'meme.jpeg';
					a.click();
				});
		});
  }

  render() {
    let results = (<h3>No Meme Selected</h3>)
    let url = this.memeURL();
    if (url) {
      results = (<img src={url.toString()} alt="selected"/>)
    }

    return (<div className="mememuc">
      <ul className="meme-list">
        {
          this.state.memes.map((meme) => {

            return (
              <li key={`${MEME_API_BASE_URL}/memes/${meme['name']}`} onClick={() => {this.selectBaseImage(meme)}}>
                <img src={`${MEME_API_BASE_URL}/memes/${meme['name']}`} alt="lists"/>
              </li>
            )
          })
        }
      </ul>
      <div className="results">
        {results}
      </div>
      <div className="params">
          <button onClick={this.storeMemeLocally}>Store locally</button>
          <Link to={"/"}><button>Go back to the main menu</button></Link>
      </div>
    </div>);
  }
};