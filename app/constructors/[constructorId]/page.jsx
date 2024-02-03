"use client";
import React from "react";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import getConstructor from "./getConstructor";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import getRaceResults from "./getRaceResults";
import getQualifyingResults from "./getQualifyingResults";
import getConstructorStanding from "./getConstructorStanding";
import TableSkeletonLoader from "@/components/global/TableSkeletonLoader";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Constructor({ params: { constructorId } }) {
  const [constructor, setConstructor] = useState(null);
  const { season, setSeason } = useSeason();
  const [raceResults, setRaceResults] = useState([]);
  const [qualifyingResults, setQualifyingResults] = useState([]);
  const [constructorStanding, setConstructorStanding] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRaceResults, setLoadingRaceResults] = useState(true);
  const [loadingQualifyingResults, setLoadingQualifyingResults] =
    useState(true);
  const [loadingConstrutorStanding, setLoadingConstructorStanding] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingConstructorStanding(true);
      try {
        const constructorStanding = await getConstructorStanding(constructorId);
        setConstructorStanding(constructorStanding);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingConstructorStanding(false);
      }
    };

    fetchData();
  }, [constructorId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const constructor = await getConstructor(null, constructorId);
        setConstructor(constructor);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [constructorId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRaceResults(true);
      try {
        const raceResults = await getRaceResults(season, constructorId);
        setRaceResults(raceResults);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingRaceResults(false);
      }
    };

    fetchData();
  }, [season]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingQualifyingResults(true);
      try {
        const qualifyingResults = await getQualifyingResults(
          season,
          constructorId
        );
        setQualifyingResults(qualifyingResults);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoadingQualifyingResults(false);
      }
    };

    fetchData();
  }, [season]);

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <main className="p-5 pb-0 h-full overflow-hidden">
      <div className="grid grid-cols-4">
        <div className="col-span-4 flex flex-col xl:flex-row items-stretch">
          <Card className="p-5 bg-primary-foreground mr-5 flex-1">
            <div className="flex items-start gap-5">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-2">
                  {constructor ? (
                    constructor.name
                  ) : (
                    <Skeleton className="w-[250px] h-[32px]" />
                  )}
                </h1>
                <p>
                  {constructor ? (
                    constructor.wikipediaInfo.summary.length > 10 ? (
                      truncateString(constructor.wikipediaInfo.summary, 350)
                    ) : (
                      "No summary found for this constructor"
                    )
                  ) : (
                    <Skeleton className="w-[250px] h-[32px]" />
                  )}
                </p>
                {constructor ? (
                  <Button asChild className="mt-4 w-fit">
                    <Link href={constructor.url} target="__blank">
                      Read More
                    </Link>
                  </Button>
                ) : (
                  <Skeleton className="w-[250px] h-[32px]" />
                )}
              </div>
            </div>
          </Card>
          <ScrollArea className="flex-1 max-h-[250px]">
            <Table>
              <TableCaption>The Standings of {constructorId}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Season</TableHead>
                  <TableHead className="w-[100px]">Round</TableHead>
                  <TableHead className="w-[100px]">Position</TableHead>
                  <TableHead className="w-[100px]">Points</TableHead>
                  <TableHead className="w-[100px]">Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableSkeletonLoader
                  loading={loadingConstrutorStanding}
                  number={15}
                  columnsConfig={[150, 10, 10, 10, 100, 100]}>
                  {constructorStanding.length > 0 ? (
                    constructorStanding
                      .sort((a, b) => b.season - a.season)
                      .map((standing) => (
                        <TableRow
                          key={standing.ConstructorStandings[0].position}>
                          <TableCell
                            onClick={() => setSeason(standing.season)}
                            className="cursor-pointer">
                            {standing.season}
                          </TableCell>
                          <TableCell>{standing.round}</TableCell>
                          <TableCell>
                            {standing.ConstructorStandings[0].position}
                          </TableCell>
                          <TableCell>
                            {standing.ConstructorStandings[0].points}
                          </TableCell>
                          <TableCell>
                            {standing.ConstructorStandings[0].wins}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No results found for this season
                      </TableCell>
                    </TableRow>
                  )}
                </TableSkeletonLoader>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <Tabs
          defaultValue="race-results"
          className="flex justify-between relative col-span-4 mt-5">
          <TabsList>
            <TabsTrigger value="race-results">Race Results</TabsTrigger>
            <TabsTrigger value="qualifying-results">
              Qualifying Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="race-results" className="m-0">
            <Tabs defaultValue="list-view">
              <TabsList>
                <TabsTrigger value="list-view">List View</TabsTrigger>
                {/* <TabsTrigger value="graph-view">Graph View</TabsTrigger> */}
              </TabsList>
              <TabsContent value="list-view" className="absolute left-0 w-full">
                <ScrollArea className="h-[59vh]">
                  <Table>
                    <TableCaption>
                      The Race Results of {constructorId}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Drivers</TableHead>
                        <TableHead className="w-[100px]">Grid</TableHead>
                        <TableHead className="w-[100px]">Position</TableHead>
                        <TableHead className="w-[100px]">Points</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableSkeletonLoader
                        loading={loadingRaceResults}
                        number={15}
                        columnsConfig={[150, 10, 10, 10, 100, 100]}>
                        {raceResults.length > 0 ? (
                          raceResults.map((race, raceIndex) => (
                            <React.Fragment key={raceIndex}>
                              {/* Ligne dédiée pour le nom du circuit */}
                              <TableRow className="bg-muted">
                                <TableCell colSpan={7}>
                                  <Link
                                    href={`/circuits/${race.Circuit.circuitId}`}>
                                    {race.Circuit.circuitName}
                                  </Link>
                                </TableCell>
                              </TableRow>

                              {/* Lignes pour les résultats des pilotes */}
                              {race.Results.map((result, resultIndex) => (
                                <TableRow key={resultIndex}>
                                  <TableCell>
                                    <Link
                                      href={`/drivers/${result.Driver.driverId}`}>
                                      {result.Driver.givenName}{" "}
                                      {result.Driver.familyName}
                                    </Link>
                                  </TableCell>{" "}
                                  <TableCell>{result.grid}</TableCell>
                                  <TableCell>{result.position}</TableCell>
                                  <TableCell>{result.points}</TableCell>
                                  <TableCell>{result.status}</TableCell>
                                  <TableCell>
                                    {result.Time ? result.Time.time : "N/A"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </React.Fragment>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center">
                              No results found for this season
                            </TableCell>
                          </TableRow>
                        )}
                      </TableSkeletonLoader>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
              {/* <TabsContent value="graph-view"></TabsContent> */}
            </Tabs>
          </TabsContent>
          <TabsContent value="qualifying-results" className="m-0">
            <Tabs defaultValue="list-view">
              <TabsList>
                <TabsTrigger value="list-view">List View</TabsTrigger>
                {/* <TabsTrigger value="graph-view">Graph View</TabsTrigger> */}
              </TabsList>
              <TabsContent
                value="list-view"
                className="absolute left-0  w-full">
                <ScrollArea className="h-[59vh]">
                  <Table>
                    <TableCaption>
                      The Race Results of {constructorId}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[500px]">Drivers</TableHead>
                        <TableHead className="w-[100px]">Q1</TableHead>
                        <TableHead className="w-[100px]">Q2</TableHead>
                        <TableHead className="w-[100px]">Q3</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableSkeletonLoader
                        loading={loadingQualifyingResults}
                        number={15}
                        columnsConfig={[150, 10, 10, 10, 100, 100]}>
                        {qualifyingResults.length > 0 ? (
                          qualifyingResults.map((race, raceIndex) => (
                            <React.Fragment key={raceIndex}>
                              {/* Ligne dédiée pour le nom du circuit */}
                              <TableRow className="bg-muted">
                                <TableCell colSpan={7}>
                                  <Link href={`/circuits/${race.circuitId}`}>
                                    {race.circuitName}
                                  </Link>
                                </TableCell>
                              </TableRow>

                              {/* Lignes pour les résultats des pilotes */}
                              {race.qualifyingResults.map(
                                (qualifying, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <Link
                                        href={`/drivers/${qualifying.Driver.driverId}`}>
                                        {qualifying.Driver.givenName}{" "}
                                        {qualifying.Driver.familyName}
                                      </Link>
                                    </TableCell>
                                    <TableCell>{qualifying.Q1}</TableCell>
                                    <TableCell>{qualifying.Q2}</TableCell>
                                    <TableCell>{qualifying.Q3}</TableCell>
                                  </TableRow>
                                )
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center">
                              No results found for this season
                            </TableCell>
                          </TableRow>
                        )}
                      </TableSkeletonLoader>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
              {/* <TabsContent value="graph-view">
              </TabsContent> */}
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
