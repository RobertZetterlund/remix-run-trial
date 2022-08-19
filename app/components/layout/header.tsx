import { Link } from "@remix-run/react";
import logo from "../../res/images/midsommarkrans.png";

export const Header = () => (
  <header>
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-emerald-600">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <span className="flex items-center">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Midsommarkrans" />
          <Link
            to={"."}
            className="self-center text-xl font-semibold whitespace-nowrap text-white"
          >
            Sommarprat-UI
          </Link>
        </span>
        <div className="flex items-center lg:order-2">
          <a
            href="/playlists"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-800"
          >
            All playlists
          </a>
        </div>
      </div>
    </nav>
  </header>
);
