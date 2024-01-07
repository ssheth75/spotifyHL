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
const REDIRECT_URI = process.env.NEXT_PUBLIC_REACT_APP_REDIRECT_URI;

async function getAccessToken(code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  console.log("accessToken:", access_token);
  return access_token;
}

async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", REDIRECT_URI);
  params.append("scope", "user-top-read user-follow-read");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

///////////////////////////////////////////////////////////////////////////////////////
export default function Home() {
  //const [accessToken, setAccessToken] = useState("");
  const [lines, setLines] = useState([]);
  const [loggedIn, setloggedIn] = useState(true);
  const [stats, showStats] = useState(false);

  // Redirect logic when the button is clicked

  // Function to handle the login process

  useEffect(() => {
    async function checkAuthentication() {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        setloggedIn(true);
        showStats(true);
      }
    }

    checkAuthentication();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  async function handleLogin() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow();
    } else {
      const accessToken = await getAccessToken(code);
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("isAuthenticated", true);
      setloggedIn(true);
      showStats(true);
    }
  }

  // grid line logic

  const cellSize = 80; // Adjust this value to set the size of each grid cell

  useEffect(() => {
    const updateGrid = () => {
      const containerHeight = document.body.clientHeight;
      const containerWidth = document.body.clientWidth;

      const horizontalLinesCount = Math.floor(containerHeight / cellSize);
      const verticalLinesCount = Math.floor(containerWidth / cellSize);

      const horizontalLines = [];
      for (let i = 1; i < horizontalLinesCount; i++) {
        horizontalLines.push(
          <div
            key={`horizontal-${i}`}
            className="absolute w-full h-px bg-customGray"
            style={{ top: `${(i * containerHeight) / horizontalLinesCount}px` }}
          />
        );
      }

      const verticalLines = [];
      for (let i = 1; i < verticalLinesCount; i++) {
        verticalLines.push(
          <div
            key={`vertical-${i}`}
            className="absolute w-px bg-customGray"
            style={{
              left: `${(i * containerWidth) / verticalLinesCount}px`,
              height: "100%", // Set the height to 100% to fill the container vertically
            }}
          />
        );
      }

      setLines([...horizontalLines, ...verticalLines]);
    };

    updateGrid(); // Initial setup

    window.addEventListener("resize", updateGrid);

    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, [cellSize]); // Include cellSize in the dependency array to recompute on cellSize change

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-customBlack font-reg font-bold"
      style={{ height: "200vh" }}
    >
      <div className="absolute inset-0 grid ">{lines}</div>
      {!loggedIn && (
        <div>
          <div className="absolute" style={{ left: "120px", top: "0px" }}>
            <h1 className="text-9xl text-green-400 font-extrabold">Topify</h1>
          </div>

          <div className="relative flex flex-col justify-center m-4 items-center">
            <button
              className="bg-green-400 p-3 m-5 rounded w-50"
              onClick={handleLogin}
            >
              <h2 className="text-4xl text-black font-extrabold ">Login</h2>
            </button>
          </div>
        </div>
      )}
      {stats && <Stats></Stats>}
    </div>
  );
}
