import type { Episode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import twokfive from "~/res/data/2005.json";
import twoksix from "~/res/data/2006.json";
import twokseven from "~/res/data/2007.json";
import twokeight from "~/res/data/2008.json";
import twoknine from "~/res/data/2009.json";
import twokten from "~/res/data/2010.json";
import twokeleven from "~/res/data/2011.json";
import twoktwelve from "~/res/data/2012.json";
import twokthirteen from "~/res/data/2013.json";
import twokfourthteen from "~/res/data/2014.json";
import twokfiftheen from "~/res/data/2015.json";
import twoksixteen from "~/res/data/2016.json";
import twokseventeen from "~/res/data/2017.json";
import twokeighteen from "~/res/data/2018.json";
import twoknineteen from "~/res/data/2019.json";
import twoktwenty from "~/res/data/2020.json";
import twoktwentyone from "~/res/data/2021.json";

const AllYears = {
  "2005": twokfive,
  "2006": twoksix,
  "2007": twokseven,
  "2008": twokeight,
  "2009": twoknine,
  "2010": twokten,
  "2011": twokeleven,
  "2012": twoktwelve,
  "2013": twokthirteen,
  "2014": twokfourthteen,
  "2015": twokfiftheen,
  "2016": twoksixteen,
  "2017": twokseventeen,
  "2018": twokeighteen,
  "2019": twoknineteen,
  "2020": twoktwenty,
  "2021": twoktwentyone,
};

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getYears().map(async (year) => {
      await Promise.all(
        year.episodes.map((episode) => {
          return db.episode.create({
            data: {
              ...episode,
              yearAired: parseInt(year.year),
            },
          });
        })
      );
    })
  );
}

seed();

function getYears() {
  const years = Object.keys(AllYears);

  return years.map((year) => ({
    year,
    episodes: (AllYears as any)[year] as Omit<Episode, "yearAired">[],
  }));
}
