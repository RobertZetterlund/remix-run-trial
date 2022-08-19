import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../utils/db.server";
import SpotifyLogo from "../../res/images/spotify.svg";
import SRLogo from "../../res/images/SR.svg";

const EpisodeLoaderDataSelections: (keyof Episode)[] = [
  "title",
  "playlistId",
  "imageurl",
  "date",
  "episodeUrl",
];

const select = EpisodeLoaderDataSelections.reduce(
  (acc, curr) => ({ [curr]: true, ...acc }),
  {} as { [key in keyof Episode]: boolean }
);

type LoaderData = {
  episodes: Pick<Episode, typeof EpisodeLoaderDataSelections[number]>[];
  year: number;
};

export const loader: LoaderFunction = async ({ params }) => {
  const year = params.year ? parseInt(params.year) : NaN;

  if (isNaN(year) || year < 2005 || year > 2021) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const episodes = await db.episode.findMany({
    where: { yearAired: year },
    select,
  });

  const sortedEpisodes = episodes.sort((a, b) => a.date.localeCompare(b.date));

  return json({ episodes: sortedEpisodes, year });
};

export default function Playlists() {
  const { episodes, year } = useLoaderData<LoaderData>();

  return (
    <div className="mb-auto w-full py-5 px-10">
      <h1>{year}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
        {episodes.map(({ title, playlistId, imageurl, date, episodeUrl }) => (
          <li
            className="w-full rounded overflow-hidden shadow-lg"
            key={playlistId}
          >
            <div className="group relative">
              <img
                src={imageurl}
                className="w-full aspect-square"
                alt={`${title} wearing a midsommarkrans`}
                loading="lazy"
              />
              <div className="absolute top-0 left-0 w-full h-0 flex flex-row justify-between items-end p-2 bg-gray-700 bg-opacity-0	group-hover:h-full group-hover:bg-opacity-50 duration-500">
                <a
                  href={`https://open.spotify.com/playlist/${playlistId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:-translate-y-1 duration-200"
                >
                  <img
                    src={SpotifyLogo}
                    alt="Spotify Logo"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 duration-500"
                  />
                </a>
                <a
                  href={episodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:-translate-y-1 duration-200"
                >
                  <img
                    src={SRLogo}
                    alt="Sveriges Radio Logo"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 duration-500"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col px-2 py-1">
              <a
                href={`https://open.spotify.com/playlist/${playlistId}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <span className="font-bold text-xl text-stone-800">
                  {title}
                </span>
              </a>
              <span className="text-xs text-stone-600">{date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          SR started tracking the music in their API 2005, so I can't help you
          with whatever this is ---{">"} {params.year}.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  const { year } = useParams();
  return (
    <div className="error-container">{`There was an error loading year ${year}. Sorry.`}</div>
  );
}
