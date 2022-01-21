import React from 'react';
import './mememuc.css';

var MEME_API_BASE_URL = 'http://localhost:5555';

interface Meme {
  _id: number;
  name: string;
  link: string;
}

interface Caption {
  topText: string
  topX: number
  topY: number
  bottomText: string
  bottomX: number
  bottomY: number
}

interface OmmMemeMUCState {
  selectedBaseImage?: Meme
  memes: Meme[]
  caption: Caption
}
  
export default class OmmMemeMUC extends React.Component<{}, OmmMemeMUCState> {

  state = {
    selectedBaseImage: undefined,
    memes: [],
    caption: {
      topText: '', topX: 0, topY: 0,
      bottomText: '', bottomX: 0, bottomY: 0,
    }
  }

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
    // TODO: update the component's state, to apply the user's base image selection
    this.setState({selectedBaseImage: meme})
  }

  memeURL = () => {
    // The Meme API is able to render captions of your choice onto a base image.
    // You simply have to pass your captions as GET parameters, e.g.:
    //http://mememuc.medien.ifi.lmu.de:3000/memes/doge?text=Such+beautiful+code&x=0&y=0&text2=Wow&x2=0&y2=0

    // TODO This method should return an URL for the Meme api, parameterized with the captions that are currently entered in the text fields
    // - access the Caption object, saved in the component's state
    // - build an URL and return it

    var meme: Meme = this.state.selectedBaseImage!
    if(!meme){
      return null
    }
    const url = new URL(`${MEME_API_BASE_URL}/memes/${meme['name']}`);
    console.log(url);
    const params: {[index: string]: string} = {
      text: this.state.caption.topText,
      x: this.state.caption.topX.toString(),
      y: this.state.caption.topY.toString(),
      text2: this.state.caption.bottomText,
      x2: this.state.caption.bottomX.toString(),
      y2: this.state.caption.bottomY.toString(),
    }
    for (let key in params){
      url.searchParams.append(key, params[key])
    }
    return url
  }

  captionChanged = (e: any) => {
    // The caption property contained in this component's state should always contain the values that user currently has entered
    // But this doesn't happen magically - one has to update the state whenever the user changes the input values

    // TODO Implement this listener method, which will be registered as onChange listener for the text inputs
    // - get the current input fields' values
    // - build an updated Caption object
    // - set it in the component's state
    this.setState({
      ...this.state,
      caption: {
        ...this.state.caption,
        [e.target.name]: e.target.value,
      },
    })
  }

  render() {
    let results = (<h3>No Meme Selected</h3>)
    let url = this.memeURL()
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
        <div className="texts">
          <input name="topText" value={this.state.caption.topText} onChange={this.captionChanged} type="text" placeholder="Upper Text"/>
          <input name="bottomText" value={this.state.caption.bottomText} onChange={this.captionChanged} type="text" placeholder="Lower Text"/>
        </div>
        <div className="positions">
          <input name="topX" value={this.state.caption.topX} onChange={this.captionChanged} type="number"/>
          <input name="topY" value={this.state.caption.topY} onChange={this.captionChanged} type="number"/>
          <input name="bottomX" value={this.state.caption.bottomX} onChange={this.captionChanged} type="number"/>
          <input name="bottomY" value={this.state.caption.bottomY} onChange={this.captionChanged} type="number"/>
        </div>
      </div>
    </div>);
  }
};
