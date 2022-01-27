import React from "react";
import { useParams } from "react-router-dom";

var MEME_API_BASE_URL = 'http://localhost:5555';
  
const Meme = () => {
  let params = useParams().memeId;
  let url = new URL(`${MEME_API_BASE_URL}/memes/${params}`);
  return <img src={url.toString()} alt="meme"/>
};
  
export default Meme;