"use client";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import Header from "@/components/global/Header";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "lucide-react";

const Infos = () => {
  return (
    <main className="p-5 pb-0 max-h-[91vh] h-full overflow-hidden">
      <Header title="Infos" subtitle={``} />
      <div
        className="grid grid-cols-2 gap-4 h-[90%]"
        style={{
          gridTemplateRows: "1fr 1fr",
        }}>
        <Card className="flex flex-col bg-primary-foreground">
          <Tabs
            defaultValue="drivers-standing"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="drivers-standing" className="w-fit mr-auto">
                <p>What&apos;s F1 Dashboard ?</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="drivers-standing" className="m-0">
              <p className="p-5">
                It&apos;s a web application that uses Formula 1 data from the
                Ergast API to display and share it. The idea is to make a wealth
                of information available to the general public. So you can get
                information on drivers, constructors and circuits. If
                you&apos;re a F1 fan like me, you&apos;ll love this project!
              </p>
              <p className="p-5 pt-0">
                PS: This is my first application using React and NextJS, so if
                you have any feedback, don&apos;t hesitate!
              </p>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="flex flex-col bg-primary-foreground">
          <Tabs
            defaultValue="releases-dates"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="releases-dates" className="w-fit mr-auto">
                Releases Dates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="releases-dates" className="m-0">
              <ScrollArea className="flex-1 p-5">
                <div>
                  <div className="flex items-baseline gap-4">
                    <h2 className="text-4xl font-bold">1.0</h2>
                    <span className=" opacity-70">02/02/2024</span>
                  </div>
                  <p className="mt-2">First public release</p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="flex flex-col bg-primary-foreground col-span-2">
          <Tabs
            defaultValue="special-thanks"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="special-thanks" className="w-fit mr-auto">
                Special Thanks
              </TabsTrigger>
            </TabsList>
            <TabsContent value="special-thanks" className="m-0">
              <ul className="p-5 pl-10 list-disc flex flex-col gap-4">
                <li>
                  <a
                    href="https://ergast.com/mrd/"
                    className=" underline"
                    target="__blank">
                    Ergast Developer API
                  </a>
                  <p className="mt-1">
                    The Ergast Developer API is an experimental web service
                    which provides a historical record of motor racing data for
                    non-commercial purposes. <br></br> The API provides data for
                    the Formula One series, from the beginning of the world
                    championships in 1950.
                  </p>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Main_Page"
                    className=" underline"
                    target="__blank">
                    Wikipedia API
                  </a>
                  <p className="mt-1">
                    Everyone knows Wikipedia. In my application, I used its API,
                    mainly to retrieve images to reinforce the Ergast API data.
                  </p>
                </li>
                <li>
                  <a
                    href="https://ui.shadcn.com/"
                    className=" underline"
                    target="__blank">
                    Shadcn/ui
                  </a>
                  <p className="mt-1">
                    Shadcn is a beautiful collection of open-source components
                    and templates for Tailwind CSS. I used it to style my
                    application.
                  </p>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
};

export default Infos;
