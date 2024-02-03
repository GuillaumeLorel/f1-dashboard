"use client";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import Header from "@/components/global/Header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeletonLoader from "@/components/global/TableSkeletonLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getDriversStanding from "./getDriversStanding";
import getConstructorsStanding from "./getConstructorsStanding";
import getRaceSchedule from "./getRaceSchedule";
import Link from "next/link";

export default function Dashboard() {
  const { season } = useSeason();
  const [driversStanding, setDriversStanding] = useState([]);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [raceSchedule, setRaceSchedule] = useState([]);
  const [loadingDriversStanding, setLoadingDriversStanding] = useState(false);
  const [loadingConstructorsStanding, setLoadingConstructorsStanding] =
    useState(false);
  const [loadingRaceSchedule, setLoadingRaceSchedule] = useState(false);

  let flatDriverStandings = driversStanding.flatMap(
    (season) => season.DriverStandings
  );
  let flatConstructorStandings = constructorsStanding.flatMap(
    (season) => season.ConstructorStandings
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingDriversStanding(true);
      try {
        const driversStanding = await getDriversStanding(season);
        setDriversStanding(driversStanding);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingDriversStanding(false);
      }
    };

    fetchData();
  }, [season]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingConstructorsStanding(true);
      try {
        const constructorsStanding = await getConstructorsStanding(season);
        setConstructorsStanding(constructorsStanding);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingConstructorsStanding(false);
      }
    };

    fetchData();
  }, [season]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRaceSchedule(true);
      try {
        const raceSchedule = await getRaceSchedule(season);
        setRaceSchedule(raceSchedule);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingRaceSchedule(false);
      }
    };

    fetchData();
  }, [season]);

  return (
    <main className="p-5 pb-0 max-h-[91vh] h-full overflow-hidden">
      <Header title="Dashboard" subtitle={``} />
      <div
        className="grid grid-cols-2 gap-4 h-[90%]"
        style={{
          gridTemplateRows: "min-content 1fr min-content",
        }}>
        <Card className="flex flex-col bg-primary-foreground">
          <Tabs
            defaultValue="drivers-standing"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="drivers-standing" className="w-fit mr-auto">
                Drivers Standing
              </TabsTrigger>
            </TabsList>
            <TabsContent value="drivers-standing" className="m-0">
              <ScrollArea className="flex-1 dashboard-drivers-standing">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10px]">Position</TableHead>
                      <TableHead className="w-[100px]">Driver</TableHead>
                      <TableHead className="w-[100px]">Constructor</TableHead>
                      <TableHead className="w-[100px]">Points</TableHead>
                      <TableHead className="w-[100px]">Wins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingDriversStanding ? (
                      <TableSkeletonLoader
                        loading={loadingDriversStanding}
                        number={15}
                        columnsConfig={[10, 150, 150, 20, 20]}
                      />
                    ) : (
                      flatDriverStandings.map((standing, index) => (
                        <TableRow key={index}>
                          <TableCell>{standing.position}</TableCell>
                          <TableCell>
                            <Link href={`/drivers/${standing.Driver.driverId}`}>
                              {standing.Driver.givenName}{" "}
                              {standing.Driver.familyName}
                            </Link>
                          </TableCell>
                          <TableCell>{standing.Constructors[0].name}</TableCell>
                          <TableCell>{standing.points}</TableCell>
                          <TableCell>{standing.wins}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="flex flex-col bg-primary-foreground">
          <Tabs
            defaultValue="constructors-standing"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger
                value="constructors-standing"
                className="w-fit mr-auto">
                Constructors Standing
              </TabsTrigger>
            </TabsList>
            <TabsContent value="constructors-standing" className="m-0">
              <ScrollArea className="flex-1 dashboard-constructors-standing">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10px]">Position</TableHead>
                      <TableHead className="w-[100px]">Constructor</TableHead>
                      <TableHead className="w-[100px]">Nationality</TableHead>
                      <TableHead className="w-[100px]">Points</TableHead>
                      <TableHead className="w-[100px]">Wins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingConstructorsStanding ? (
                      <TableSkeletonLoader
                        loading={loadingConstructorsStanding}
                        number={15}
                        columnsConfig={[10, 150, 150, 20, 20]}
                      />
                    ) : (
                      flatConstructorStandings.map((standing, index) => (
                        <TableRow key={index}>
                          <TableCell>{standing.position}</TableCell>
                          <TableCell>
                            <Link
                              href={`/constructors/${standing.Constructor.constructorId}`}>
                              {standing.Constructor.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {standing.Constructor.nationality}
                          </TableCell>
                          <TableCell>{standing.points}</TableCell>
                          <TableCell>{standing.wins}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="flex flex-col bg-primary-foreground col-span-2">
          <Tabs
            defaultValue="races-schedule"
            className="flex flex-col justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="races-schedule" className="w-fit mr-auto">
                Race Schedule
              </TabsTrigger>
            </TabsList>
            <TabsContent value="races-schedule" className="m-0">
              <ScrollArea className="flex-1 dashboard-races-schedule">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10px]">Round</TableHead>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead className="w-[100px]">Hour</TableHead>
                      <TableHead className="w-[100px]">Circuit</TableHead>
                      <TableHead className="w-[100px]">Country</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingRaceSchedule ? (
                      <TableSkeletonLoader
                        loading={loadingRaceSchedule}
                        number={15}
                        columnsConfig={[10, 150, 150, 150, 150, 150]}
                      />
                    ) : (
                      raceSchedule.map((race, index) => (
                        <TableRow key={index}>
                          <TableCell>{race.round}</TableCell>
                          <TableCell>{race.raceName}</TableCell>
                          <TableCell>{race.date}</TableCell>
                          <TableCell>{race.time}</TableCell>
                          <TableCell>
                            <Link href={`/circuits/${race.Circuit.circuitId}`}>
                              {race.Circuit.circuitName}{" "}
                            </Link>
                          </TableCell>
                          <TableCell>{race.Circuit.Location.country}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
