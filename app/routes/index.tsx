import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="m-auto w-full py-5 px-10 flex items-center justify-center text-center">
      <h1>
        🚧 Landing page under construction 🚧
        <br />
        <br />
        But do check out all the{" "}
        <Link to="/playlists" className="underline text-stone-800">
          playlists
        </Link>
      </h1>
    </div>
  );
}
