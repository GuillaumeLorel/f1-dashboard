"use client";

import { ModeToggle } from "../ModeToggle";
import Image from "next/image";
import f1 from "../../public/f1.png";
import SeasonSelect from "./SeasonSelect";
import { useState } from "react";
import { useSeason } from "../SeasonContext";

const Topbar = () => {
  const { season, setSeason } = useSeason();

  return (
    <div className="p-5 border-b border-b-[var(--separator)] flex justify-between items-center">
      <Image src={f1} />
      <div className="flex gap-2">
        <SeasonSelect season={season} setSeason={setSeason} />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Topbar;
