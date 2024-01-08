export function ArtistTimeFrame(props) {
  // Access the passed state variable 'count' through props
  return (
    <div className="flex flex-row justify-center items-center text-white mb-10">
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "shortTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleArtistTimeFrame("shortTerm")}
      >
        1 Month
      </button>
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "mediumTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleArtistTimeFrame("mediumTerm")}
      >
        6 Months
      </button>
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "longTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleArtistTimeFrame("longTerm")}
      >
        All Time
      </button>
    </div>
  );
}

export function TrackTimeFrame(props) {
  // Access the passed state variable 'count' through props
  return (
    <div className="flex flex-row justify-center items-center text-white mb-10">
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "shortTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleTrackTimeFrame("shortTerm")}
      >
        1 Month
      </button>
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "mediumTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleTrackTimeFrame("mediumTerm")}
      >
        6 Months
      </button>
      <button
        className={
          "border-white p-2 transition duration-300 transform hover:scale-105 font-reg bg-customBlack" +
          (props.timeFrame === "longTerm" ? " bg-white text-black" : "")
        }
        style={{ borderWidth: "1px", width: "100px" }}
        onClick={() => props.handleTrackTimeFrame("longTerm")}
      >
        All Time
      </button>
    </div>
  );
}
