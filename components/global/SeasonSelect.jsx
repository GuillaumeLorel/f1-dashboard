"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SeasonSelect = ({ season, setSeason }) => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedSeasons = [];
      let offset = 0;
      const limit = 1000; // Maximum selon la documentation de l'API

      try {
        let moreData = true;

        while (moreData) {
          const response = await fetch(
            `https://ergast.com/api/f1/seasons.json?limit=${limit}&offset=${offset}`
          );
          const data = await response.json();
          const newSeasons = data.MRData.SeasonTable.Seasons.map(
            (s) => s.season
          );

          if (newSeasons.length === 0) {
            moreData = false;
          } else {
            fetchedSeasons = [...fetchedSeasons, ...newSeasons];
            offset += limit;
          }
        }

        // Trier les saisons en ordre décroissant
        fetchedSeasons.sort((a, b) => b - a);

        setSeasons(fetchedSeasons);

        // Mettre à jour setSeason avec l'année la plus récente
        const mostRecentSeason = fetchedSeasons[0];
        setSeason(mostRecentSeason);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center">
      Season : &nbsp;
      <Select value={season} onValueChange={(value) => setSeason(value)}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="2024" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <ScrollArea className="h-[200px] border-0">
            <SelectGroup>
              {seasons.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeasonSelect;
