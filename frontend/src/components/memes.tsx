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
  selectedBaseImageId?: number
  memes: Meme[]
}
  
export default class Memes extends React.Component<{}, MemesState> {

  state = {
    selectedBaseImage: undefined,
    selectedBaseImageId: undefined,
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

  selectBaseImage = (meme: Meme, id: number) => {
    this.setState({selectedBaseImage: meme})
    this.setState({selectedBaseImageId: id})
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

  navigate = (movement: string) => {
    var memeId: number = 0;
    if (movement == 'next') {
      if (this.state.selectedBaseImageId! < this.state.memes.length-1){
        memeId = this.state.selectedBaseImageId! + 1;
      }
      else {
        memeId = 0;
      }
    }
    else if (movement == 'previous') {
      if (this.state.selectedBaseImageId! > 0){
        memeId = this.state.selectedBaseImageId! - 1;
      }
      else {
        memeId = this.state.memes.length-1;
      }
    }
    else if (movement == 'random') {
      memeId = Math.floor(Math.random() * this.state.memes.length);
    }

    this.selectBaseImage(this.state.memes[memeId], memeId);
  }

  render() {
    let results = (<h3>No Meme Selected</h3>)
    let url = this.memeURL();
    if (url) {
      results = (
        <div>
          <h3>{this.state.selectedBaseImage!['name']}</h3>
          <img src={url.toString()} alt="selected" title={this.state.selectedBaseImage!['name']}/>
        </div>
      )
    }

    let buttons = (<Link to={"/"}><button>Go back to the main menu</button></Link>)
    if (this.state.selectedBaseImage != undefined) {
      buttons = (
        <div>
          <button onClick={this.storeMemeLocally}>Store locally</button>
          <Link to={"/"}><button>Go back to the main menu</button></Link>
        </div>
      )
    }

    var i:number = 0;
    return (<div className="mememuc">
      <ul className="meme-list">
        {
          this.state.memes.map((meme) => {
            return (
              <li key={`${MEME_API_BASE_URL}/memes/${meme['name']}`} onClick={() => {this.selectBaseImage(meme, i)}}>
                <img src={`${MEME_API_BASE_URL}/memes/${meme['name']}`} alt="lists"/>
              </li>
            )
            i++;
          })
        }
      </ul>
      <div className="results">
        {results}
      </div>
      <div className="params">
        {buttons}
        <div className="navigation">
          <button onClick={() => {this.navigate('next')}}>Next</button>
          <button onClick={() => {this.navigate('previous')}}>Previous</button>
          <button onClick={() => {this.navigate('random')}}>Random</button>
        </div>
      </div>
    </div>);
  }
};