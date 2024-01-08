import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { headers } from "@/next.config";
import { ArtistTimeFrame, TrackTimeFrame } from "./timeFrame";
import { ArtistTable } from "./artistTable";
import { TrackTable } from "./trackTable";

function Stats(props) {
  const [timeFrame, setTimeFrame] = useState("mediumTerm");
  //// API data states ////

  // Short Term
  const [userTopTracksShort, setUserTopTracksShort] = useState();
  const [userTopArtistsShort, setUserTopArtistsShort] = useState([]);
  const [userTopGenresShort, setUserTopGenresShort] = useState([]);

  // Medium Term
  const [userTopTracksMedium, setUserTopTracksMedium] = useState([]);
  const [userTopArtistsMedium, setUserTopArtistsMedium] = useState([]);
  const [userTopGenresMedium, setUserTopGenresMedium] = useState([]);

  // Long Term
  const [userTopTracksLong, setUserTopTracksLong] = useState([]);
  const [userTopArtistsLong, setUserTopArtistsLong] = useState([]);
  const [userTopGenresLong, setUserTopGenresLong] = useState([]);

  // To keep track of which time frame and data is currently being displayed
  const [currentDataTermTracks, setCurrentDataTermTracks] = useState();
  const [currentDataTermArtists, setCurrentDataTermArtists] = useState();

  const [numArtists, setNumArtists] = useState(10);
  const [artistButtonText, setArtistButtonText] = useState("View More");
  const [numTracks, setNumTracks] = useState(10);
  const [trackButtonText, setTrackButtonText] = useState("View More");

  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [showGetData, setShowGetData] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const shortArtistEP =
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20";
  const mediumArtistEP =
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20";
  const longArtistEP =
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20";

  const shortTrackEP =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20";
  const mediumTrackEP =
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20";
  const longTrackEP =
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20";

  const handleGetData = () => {
    setShowGetData(false);
    console.log("token", token);

    //// Short Term Artists ////
    axios
      .get(shortArtistEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopArtistsShort(response.data);

        console.log("Short term artists", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //// Medium Term Artists ////
    axios
      .get(mediumArtistEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopArtistsMedium(response.data);
        setCurrentDataTermArtists(response.data);

        console.log("Medium term artists", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //// Long Term Artists ////
    axios
      .get(longArtistEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopArtistsLong(response.data);

        console.log("Long term artists", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //// Short Term Tracks ////
    axios
      .get(shortTrackEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopTracksShort(response.data);

        console.log("Short term tracks", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //// Medium Term Tracks ////
    axios
      .get(mediumTrackEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopTracksMedium(response.data);
        setCurrentDataTermTracks(response.data);

        console.log("Medium term tracks", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //// Long Term Tracks ////
    axios
      .get(longTrackEP, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        setUserTopTracksLong(response.data);

        console.log("Long term tracks", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle time frame changes
  function handleArtistTimeFrame(timeFrame) {
    if (timeFrame === "shortTerm") {
      setCurrentDataTermArtists(userTopArtistsShort);
    }
    if (timeFrame === "mediumTerm") {
      setCurrentDataTermArtists(userTopArtistsMedium);
    }
    if (timeFrame === "longTerm") {
      setCurrentDataTermArtists(userTopArtistsLong);
    }
    setTimeFrame(timeFrame);
  }

  function handleTrackTimeFrame(timeFrame) {
    if (timeFrame === "shortTerm") {
      setCurrentDataTermTracks(userTopTracksShort);
    }
    if (timeFrame === "mediumTerm") {
      setCurrentDataTermTracks(userTopTracksMedium);
    }
    if (timeFrame === "longTerm") {
      setCurrentDataTermTracks(userTopTracksLong);
    }
    setTimeFrame(timeFrame);
  }

  // Handle view more/less buttons
  function handleNumViewArtists() {
    if (numArtists === 10) {
      setNumArtists(20);
      setArtistButtonText("View Less");
    } else if (numArtists === 20) {
      setNumArtists(10);
      setArtistButtonText("View More");
    }
  }

  function handleNumViewTracks() {
    if (numTracks === 10) {
      setNumTracks(20);
      setTrackButtonText("View Less");
    } else if (numTracks === 20) {
      setNumTracks(10);
      setTrackButtonText("View More");
    }
  }

  function handleLogout() {
    localStorage.clear();
    props.setLoggedIn(false);

  }

  return (
    // you  removed flex here
    <div className=" flex flex-col bg-customBlack font-custom">
      {showGetData && (
        <div className="h-screen w-screen bg-customBlack flex items-center justify-center">
          <button
            onClick={handleGetData}
            className="text-6xl transition duration-300 transform hover:scale-125"
          >
            Get Your <span className="text-green-400 ">Topify</span>
          </button>
        </div>
      )}
      {currentDataTermArtists &&
        currentDataTermArtists.items &&
        currentDataTermArtists.items.length > 0 &&
        currentDataTermTracks &&
        currentDataTermTracks.items &&
        currentDataTermTracks.items.length > 0 && (
          <div className="flex flex-col items-center justify center ">
            <div style={{ position: "absolute", right: "15px", top: "15px" }}>
              <button
                className="w-20 h-10 transition duration-300 transform hover:scale-105"
                style={{ borderColor: "white", borderWidth: "1px" }}
                onClick={handleLogout}
              >
                {" "}
                Logout{" "}
              </button>
            </div>

            {/* Artists */}
            <div className=" text-white text-8xl flex mt-20 mb-20">
              Your Top Artists
            </div>

            <ArtistTimeFrame
              handleArtistTimeFrame={handleArtistTimeFrame}
              timeFrame={timeFrame}
            />
            <ArtistTable
              currentDataTermArtists={currentDataTermArtists}
              numArtists={numArtists}
            />

            <button
              className="w-32 font-reg h-10 border-white mt-10 transition duration-300 transform hover:scale-105"
              style={{ borderWidth: "1px" }}
              onClick={handleNumViewArtists}
            >
              {artistButtonText}
            </button>

            {/* Tracks */}
            <div className=" text-white text-8xl flex mt-32 mb-20">
              Your Top Tracks
            </div>

            <TrackTimeFrame
              handleTrackTimeFrame={handleTrackTimeFrame}
              timeFrame={timeFrame}
            />
            <TrackTable
              currentDataTermTracks={currentDataTermTracks}
              numTracks={numTracks}
            />
            <button
              className="w-32 font-reg h-10 border-white mt-10 mb-20 transition duration-300 transform hover:scale-105"
              style={{ borderWidth: "1px" }}
              onClick={handleNumViewTracks}
            >
              {trackButtonText}
            </button>
          </div>
        )}
    </div>
  );
}

export default Stats;
