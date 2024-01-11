import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export function ArtistTable(props) {
  return (
    <table
      className="text-white bg-black text-center  "
      style={{
        width: "1000px",
      }}
    >
      <thead className="border-customGray" style={{ borderBottomWidth: "1px" }}>
        <tr></tr>
      </thead>
      <tbody>
        {props.currentDataTermArtists.items
          .slice(0, props.numArtists)
          .map((row, index) => (
            <tr
              className="border-customGray "
              style={{ borderWidth: "1px" }}
              key={row.id}
            >
              <td className="pl-5 font-light ">{index + 1}</td>
              <td className="flex flex-row p-2 ml-3 text-3xl items-center ">
                <div
                  className="mr-6 ml-8"
                  style={{
                    width: "74.5px",
                    height: "74.5px",
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
  );
}
