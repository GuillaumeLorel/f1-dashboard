"use client";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import getDrivers from "./getDrivers";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/global/Header";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDrivers } from "@/components/DriverContext";
import TableSkeletonLoader from "@/components/global/TableSkeletonLoader";

const Drivers = () => {
  const { season } = useSeason();
  const { drivers, setDrivers } = useDrivers();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const drivers = await getDrivers(season);
        setDrivers(drivers);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [season]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = drivers.filter((driver) => {
      return (
        driver.givenName.toLowerCase().includes(lowerCaseQuery) ||
        driver.familyName.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredDrivers(filtered);
  }, [searchQuery, drivers]);

  return (
    <main className="p-5 pb-0">
      <Header title="Drivers" subtitle={`Discover the drivers of ${season}`} />
      <Input
        placeholder="Search for a Driver"
        className="w-fit mb-10 bg-secondary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <ScrollArea className="h-[69vh]">
          <Table>
            <TableCaption>The list of Drivers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Image</TableHead>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead className="w-[400px]">Date of birth</TableHead>
                <TableHead className="w-[400px]">Nationality</TableHead>
                <TableHead className="w-[200px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableSkeletonLoader
                loading={loading}
                number={10}
                columnsConfig={[90, 150, 80, 100, 200]}
                image={true}>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.driverId}>
                    <TableCell className="font-medium">
                      <Image
                        src={driver.wikipediaInfo.imageUrl}
                        alt=""
                        width={90}
                        height={90}
                        className="rounded-full object-cover aspect-square"
                      />
                    </TableCell>
                    <TableCell>
                      {driver.givenName} {driver.familyName}
                    </TableCell>
                    <TableCell>{driver.dateOfBirth}</TableCell>
                    <TableCell>{driver.nationality}</TableCell>
                    <TableCell className="w-[200px]">
                      <Button>
                        <Link href={`/drivers/${driver.driverId}`}>
                          View driver
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableSkeletonLoader>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </main>
  );
};

export default Drivers;
