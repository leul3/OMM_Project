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
  comment: string
}
  
export default class Memes extends React.Component<{}, MemesState> {

  state = {
    selectedBaseImage: undefined,
    selectedBaseImageId: undefined,
    memes: [],
    comment: ''
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

  captionChanged = (e: any) => {
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  submitComment = async () => {
    await fetch(`/memes/${this.state.selectedBaseImage!['name']}/comment`, {
      method: 'post',
      body: JSON.stringify({
        user: 'User1',
        comment: this.state.comment
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    await fetch(`/memes`)
      .then(response => response.json())
      .then(memes => {
        this.setState({
          memes: memes
        })
      })
      .catch(error => console.log(error))

      console.log('bla');

      this.setState({comment: ''})
  }

  submitVote = async (vote: boolean) => {
    await fetch(`/memes/${this.state.selectedBaseImage!['name']}/vote`, {
      method: 'post',
      body: JSON.stringify({
        vote: vote
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    await fetch(`/memes`)
      .then(response => response.json())
      .then(memes => {
        this.setState({
          memes: memes
        })
      })
      .catch(error => console.log(error))

      this.setState({selectedBaseImage: this.state.memes[this.state.selectedBaseImageId!]})
  }

  render() {
    let imageResult = (<h3>No Meme Selected</h3>)
    let descriptionResult = (<p></p>)
    let url = this.memeURL();
    if (url) {
      imageResult = (
        <div>
          <img src={url.toString()} alt="selected" title={this.state.selectedBaseImage!['name']}/>
          
        </div>
      )
      descriptionResult = (
        <div>
          <h2>{this.state.selectedBaseImage!['name']}</h2>
          <h3>User:</h3>
          <p>{this.state.selectedBaseImage!['user']}</p>
          <h3>Score:</h3>
          <p>{this.state.selectedBaseImage!['score']}</p>
          <h3>Comments:</h3>
          {(this.state.selectedBaseImage!['comments'] as []).map((comment) => {
            return(
              <div>
                <h5>{comment['date']} - {comment['user']}</h5>
                <p>{comment['comment']}</p>
              </div>
            )
          })}
        </div>
      )
    }

    let buttons = (<Link to={"/"}><button>Go back to the main menu</button></Link>)
    let vote = (<p></p>)
    if (this.state.selectedBaseImage != undefined) {
      buttons = (
        <div>
          <Link to={"/"}><button>Go back to the main menu</button></Link>
          <button onClick={this.storeMemeLocally}>Store the meme locally</button>
          <input name="comment" value={this.state.comment} onChange={this.captionChanged} type="text" placeholder="comment me"/>
          <button onClick={this.submitComment}>Submit comment</button>
        </div>
      )

      vote = (
        <>
          <button onClick={() => {this.submitVote(false)}}>Vote -1</button>
          <button onClick={() => {this.submitVote(true)}}>Vote +1</button>
        </>
      )
    }

    var i:number = -1;
    return (<div className="mememuc">
      <ul className="meme-list">
        {
          this.state.memes.map((meme) => {
            i++;
            return (
              <li key={`${MEME_API_BASE_URL}/memes/${meme['name']}`} onClick={() => {this.selectBaseImage(meme, i)}}>
                <img src={`${MEME_API_BASE_URL}/memes/${meme['name']}`} alt="lists"/>
              </li>
            )
          })
        }
      </ul>
      <div className="results">
        {imageResult}
      </div>
      <div className="params">
        {buttons}
        <div className="vote">
          {vote}
        </div>
        <div className="navigation">
          <button onClick={() => {this.navigate('previous')}}>Previous</button>
          <button onClick={() => {this.navigate('random')}}>Random</button>
          <button onClick={() => {this.navigate('next')}}>Next</button>
        </div>
        <div className="description">
          {descriptionResult}
        </div>
      </div>
    </div>);
  }
};