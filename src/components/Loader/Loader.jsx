import {PulseLoader} from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <PulseLoader color="rgba(13, 128, 216)" />
    </div>
  );
}

export default Loader;
