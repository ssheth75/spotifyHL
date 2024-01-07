import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

function Stats() {
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

  /////// API Fetches ///////
  let accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch users top artists for short term
    fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopArtistsShort(data);
        console.log("userTopArtistsShort", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch users top artists for medium term
    fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopArtistsMedium(data);
        // Defualt when user loads page
        setCurrentDataTermArtists(data);
        console.log("userTopArtistsMedium", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch users top artists for long term
    fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopArtistsLong(data);
        console.log("userTopArtistsLong", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch users top tracks for short term
    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopTracksShort(data);
        console.log("userTopTracksShort", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch users top tracks for medium term
    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopTracksMedium(data);
        // Defualt when user loads page
        setCurrentDataTermTracks(data);
        console.log("userTopTracksMedium", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch users top tracks for long term
    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTopTracksLong(data);
        console.log("userTopTracksLong", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle time frame changes
  function handleTimeFrame(timeFrame) {
    if (timeFrame === "shortTerm") {
      setCurrentDataTermTracks(userTopTracksShort);
      setCurrentDataTermArtists(userTopArtistsShort);
    }
    if (timeFrame === "mediumTerm") {
      setCurrentDataTermTracks(userTopTracksMedium);
      setCurrentDataTermArtists(userTopArtistsMedium);
    }
    if (timeFrame === "longTerm") {
      setCurrentDataTermTracks(userTopTracksLong);
      setCurrentDataTermArtists(userTopArtistsLong);
    }
    setTimeFrame(timeFrame);
  }

  return (
    // you  removed flex here
    <div className="h-screen bg-customBlack font-custom">
      <div>
        <div
          style={{
            top: "223px",
            left: "50%",

            position: "absolute",
            transform: "translate(-50%, 0%)",
          }}
        >
          <div className="flex flex-row justify-center items-center text-white">
            <button
              className={
                "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
                (timeFrame === "shortTerm" ? " bg-white text-black" : "")
              }
              style={{ borderWidth: "1px", width: "100px" }}
              onClick={() => handleTimeFrame("shortTerm")}
            >
              1 Month
            </button>
            <button
              className={
                "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
                (timeFrame === "mediumTerm" ? " bg-white text-black" : "")
              }
              style={{ borderWidth: "1px", width: "100px" }}
              onClick={() => handleTimeFrame("mediumTerm")}
            >
              6 Months
            </button>
            <button
              className={
                "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
                (timeFrame === "longTerm" ? " bg-white text-black" : "")
              }
              style={{ borderWidth: "1px", width: "100px" }}
              onClick={() => handleTimeFrame("longTerm")}
            >
              All Time
            </button>
          </div>
        </div>

        {currentDataTermArtists &&
          currentDataTermArtists.items &&
          currentDataTermArtists.items.length > 0 && (
            <div>
              <div
                className="absolute text-white text-8xl flex"
                style={{ top: "74px", left: "574px" }}
              >
                Your Top Artists
              </div>
              <div
                className="text-white absolute "
                style={{ top: "325px", left: "86px" }}
              >
                <div className="font-reg text-xl">
                  {" "}
                  1 ) {currentDataTermArtists.items[0].name}
                </div>
              </div>

              <div
                className="absolute "
                style={{
                  top: "82px",
                  left: "82px",
                  width: "245px",
                  height: "241px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={currentDataTermArtists.items[0].images[0].url}
                    alt="Top Artist"
                  />
                </div>
              </div>

              <div
                className="text-white absolute "
                style={{ top: "650px", left: "86px" }}
              >
                <div className="font-reg text-xl">
                  {" "}
                  2 ) {currentDataTermArtists.items[1].name}
                </div>
              </div>

              <div
                className="absolute "
                style={{
                  top: "406px",
                  left: "82px",
                  width: "245px",
                  height: "241px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={currentDataTermArtists.items[1].images[0].url}
                    alt="Top Artist"
                  />
                </div>
              </div>

              <div
                className="text-white absolute "
                style={{ top: "975px", left: "86px" }}
              >
                <div className="font-reg text-xl">
                  {" "}
                  2 ) {currentDataTermArtists.items[2].name}
                </div>
              </div>

              <div
                className="absolute "
                style={{
                  top: "730px",
                  left: "82px",
                  width: "245px",
                  height: "241px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={currentDataTermArtists.items[2].images[0].url}
                    alt="Top Artist"
                  />
                </div>
              </div>

              <table
                className="text-white absolute bg-black text-center "
                style={{
                  top: "324px",
                  right: "350px",
                  left: "657px",
                  width: "570.3px",
                }}
              >
                <thead
                  className="border-customGray"
                  style={{ borderBottomWidth: "1px" }}
                >
                  <tr></tr>
                </thead>
                <tbody>
                  {currentDataTermArtists.items.map((row, index) => (
                    <tr
                      className="border-customGray pt-2"
                      style={{ borderBottomWidth: "1px" }}
                      key={row.id}
                    >
                      <td className="pl-5 font-light">{index + 1}</td>
                      <td className="flex flex-row p-2 ml-3 items-center ">
                        <div
                          className="mr-6 ml-8"
                          style={{
                            width: "74.5px",
                            height: "64.3px",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            src={row.images[0].url}
                          ></img>
                        </div>

                        {row.name}
                      </td>

                      <td className="pr-8 pl-5">
                        <a
                          href={row.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10"
                        >
                          <button className="">
                            {" "}
                            {/* display spotify font awesome icon here */}
                            <FontAwesomeIcon
                              icon={faSpotify}
                              className="text-white w-6 h-6"
                            />
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}

export default Stats;
