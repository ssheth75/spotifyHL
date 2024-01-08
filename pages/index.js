import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import Stats from "../components/stats.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();

library.add(fas);

const CLIENT_ID = process.env.NEXT_PUBLIC_REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_REACT_APP_CLIENT_SECRET;
const REDIRECT_URL_AFTER_LOGIN = process.env.NEXT_PUBLIC_REACT_APP_REDIRECT_URI;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const scopes = ["user-top-read"];
const SCOPES_URL_PARAM = scopes.join("%20");

const getParamsFormSpotifyAuth = (hash) => {
  const stringAfterHashTag = hash.substring(1);
  const paramsInUrl = stringAfterHashTag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

///////////////////////////////////////////////////////////////////////////////////////
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsFormSpotifyAuth(
        window.location.hash
      );
      console.log({ access_token });
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-customBlack font-reg text-white font-bold">
      {!loggedIn ? (
        <div className="h-screen w-screen bg-customBlack flex items-center justify-center">
          <button
            onClick={handleLogin}
            className="text-6xl transition duration-300 transform hover:scale-125"
          >
            Login with <span className="text-green-400">Spotify</span>{" "}
          </button>{" "}
        </div>
      ) : (
        <Stats />
      )}
    </div>
  );
}
