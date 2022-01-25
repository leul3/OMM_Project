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
      topText: '', topBold: '', topSize: 100, topFont: 'Menlo', topColor: '%23000000', topX: 0, topY: 0,
      bottomText: '', bottomBold: '', bottomSize: 100, bottomFont: 'Menlo', bottomColor: '%23000000', bottomX: 0, bottomY: 0,
      text3: '', bold3: '', size3: 100, font3: 'Menlo', color3: '%23000000', x3: 0, y3: 0,
      text4: '', bold4: '', size4: 100, font4: 'Menlo', color4: '%23000000', x4: 0, y4: 0,
      text5: '', bold5: '', size5: 100, font5: 'Menlo', color5: '%23000000', x5: 0, y5: 0,
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
    this.setState({selectedBaseImage: meme})
  }

  memeURL = () => {
    var meme: Meme = this.state.selectedBaseImage!
    if(!meme){
      return null
    }
    const url = new URL(`${MEME_API_BASE_URL}/memes/${meme['name']}`);
    const params: {[index: string]: string} = {
      text: this.state.caption.topText,
      bold: this.state.caption.topBold,
      size: this.state.caption.topSize.toString(),
      font: this.state.caption.topFont,
      color: this.state.caption.topColor,
      x: this.state.caption.topX.toString(),
      y: this.state.caption.topY.toString(),

      text2: this.state.caption.bottomText,
      bold2: this.state.caption.bottomBold,
      size2: this.state.caption.bottomSize.toString(),
      font2: this.state.caption.bottomFont,
      color2: this.state.caption.bottomColor,
      x2: this.state.caption.bottomX.toString(),
      y2: this.state.caption.bottomY.toString(),
      
      text3: this.state.caption.text3,
      bold3: this.state.caption.bold3,
      size3: this.state.caption.size3.toString(),
      font3: this.state.caption.font3,
      color3: this.state.caption.color3,
      x3: this.state.caption.x3.toString(),
      y3: this.state.caption.y3.toString(),
      
      text4: this.state.caption.text4,
      bold4: this.state.caption.bold4,
      size4: this.state.caption.size4.toString(),
      font4: this.state.caption.font4,
      color4: this.state.caption.color4,
      x4: this.state.caption.x4.toString(),
      y4: this.state.caption.y4.toString(),
      
      text5: this.state.caption.text5,
      bold5: this.state.caption.bold5,
      size5: this.state.caption.size5.toString(),
      font5: this.state.caption.font5,
      color5: this.state.caption.color5,
      x5: this.state.caption.x5.toString(),
      y5: this.state.caption.y5.toString(),
    }
    for (let key in params){
      url.searchParams.append(key, params[key])
    }
    console.log(url);
    return url
  }

  captionChanged = (e: any) => {
    this.setState({
      ...this.state,
      caption: {
        ...this.state.caption,
        [e.target.name]: e.target.value,
      },
    })
  }

  captionBoldChanged = (e: any) => {
    this.setState({
      ...this.state,
      caption: {
        ...this.state.caption,
        [e.target.name]: e.target.checked,
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
        <div className="styles">
          <input name="topBold" value={this.state.caption.topBold} onChange={this.captionBoldChanged} type="checkbox"/>
          <label>Bold</label>
          <input name="bottomBold" value={this.state.caption.topBold} onChange={this.captionBoldChanged} type="checkbox"/>
          <label>Bold</label>
        </div>
        <div className="sizes">
          <input name="topSize" value={this.state.caption.topSize} onChange={this.captionChanged} type="number" placeholder="Upper Size"/>
          <input name="bottomSize" value={this.state.caption.bottomSize} onChange={this.captionChanged} type="number" placeholder="Lower Size"/>
        </div>
        <div className="fonts">
          <select name="topFont" onChange={this.captionChanged}>
            <option value="Menlo">Menlo</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
          </select>
          <select name="bottomFont" onChange={this.captionChanged}>
            <option value="Menlo">Menlo</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
          </select>
        </div>
        <div className="colors">
          <input name="topColor" value={this.state.caption.topColor} onChange={this.captionChanged} type="color"/>
          <input name="bottomColor" value={this.state.caption.bottomColor} onChange={this.captionChanged} type="color"/>
        </div>
        <div className="positions">
          <input name="topX" value={this.state.caption.topX} onChange={this.captionChanged} type="number" placeholder="Position X"/>
          <input name="topY" value={this.state.caption.topY} onChange={this.captionChanged} type="number" placeholder="Position Y"/>
          <input name="bottomX" value={this.state.caption.bottomX} onChange={this.captionChanged} type="number" placeholder="Position X"/>
          <input name="bottomY" value={this.state.caption.bottomY} onChange={this.captionChanged} type="number" placeholder="Position Y"/>
        </div>
        <div className="extraParams">
          <div className="texts">
            <input name="text3" value={this.state.caption.text3} onChange={this.captionChanged} type="text" placeholder="Text 3"/>
            <input name="text4" value={this.state.caption.text4} onChange={this.captionChanged} type="text" placeholder="Text 4"/>
            <input name="text5" value={this.state.caption.text5} onChange={this.captionChanged} type="text" placeholder="Text 5"/>
          </div>
          <div className="styles">
            <input name="bold3" value={this.state.caption.bold3} onChange={this.captionBoldChanged} type="checkbox"/>
            <label>Bold</label>
            <input name="bold4" value={this.state.caption.bold4} onChange={this.captionBoldChanged} type="checkbox"/>
            <label>Bold</label>
            <input name="bold5" value={this.state.caption.bold5} onChange={this.captionBoldChanged} type="checkbox"/>
            <label>Bold</label>
          </div>
          <div className="sizes">
            <input name="size3" value={this.state.caption.size3} onChange={this.captionChanged} type="number" placeholder="Size 3"/>
            <input name="size4" value={this.state.caption.size4} onChange={this.captionChanged} type="number" placeholder="Size 4"/>
            <input name="size5" value={this.state.caption.size5} onChange={this.captionChanged} type="number" placeholder="Size 5"/>
          </div>
          <div className="fonts">
            <select name="font3" onChange={this.captionChanged}>
              <option value="Menlo">Menlo</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="serif">serif</option>
              <option value="sans-serif">sans-serif</option>
            </select>
            <select name="font4" onChange={this.captionChanged}>
              <option value="Menlo">Menlo</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="serif">serif</option>
              <option value="sans-serif">sans-serif</option>
            </select>
            <select name="font5" onChange={this.captionChanged}>
              <option value="Menlo">Menlo</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="serif">serif</option>
              <option value="sans-serif">sans-serif</option>
            </select>
          </div>
          <div className="colors">
            <input name="color3" value={this.state.caption.color3} onChange={this.captionChanged} type="color"/>
            <input name="color4" value={this.state.caption.color4} onChange={this.captionChanged} type="color"/>
            <input name="color5" value={this.state.caption.color5} onChange={this.captionChanged} type="color"/>
          </div>
          <div className="positions">
            <input name="x3" value={this.state.caption.x3} onChange={this.captionChanged} type="number"/>
            <input name="y3" value={this.state.caption.y3} onChange={this.captionChanged} type="number"/>
            <input name="x4" value={this.state.caption.x4} onChange={this.captionChanged} type="number"/>
            <input name="y4" value={this.state.caption.y4} onChange={this.captionChanged} type="number"/>
            <input name="x5" value={this.state.caption.x5} onChange={this.captionChanged} type="number"/>
            <input name="y5" value={this.state.caption.y5} onChange={this.captionChanged} type="number"/>
          </div>
        </div>
      </div>
    </div>);
  }
};
