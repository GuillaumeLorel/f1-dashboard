"use client";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import getCircuits from "./getCircuits";
import Header from "@/components/global/Header";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import TableSkeletonLoader from "@/components/global/TableSkeletonLoader";

const Circuits = () => {
  const { season } = useSeason();
  const [circuits, setCircuits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const circuits = await getCircuits(season);
        setCircuits(circuits);
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
    const filtered = circuits.filter((circuit) => {
      return (
        circuit.circuitName.toLowerCase().includes(lowerCaseQuery) ||
        circuit.Location.locality.toLowerCase().includes(lowerCaseQuery) ||
        circuit.Location.country.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredCircuits(filtered);
  }, [searchQuery, circuits]);

  return (
    <main className="p-5">
      <Header
        title="Circuits"
        subtitle={`Discover the circuits of ${season}`}
      />
      <Input
        placeholder="Search for a Circuit"
        className="w-fit mb-10 bg-secondary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <ScrollArea className="h-[69vh]">
          <Table>
            <TableCaption>The list of Circuits</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Image</TableHead>
                <TableHead className="w-[400px]">Circuit Name</TableHead>
                <TableHead className="w-[400px]">City</TableHead>
                <TableHead className="w-[400px]">Country</TableHead>
                <TableHead className="w-[180px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableSkeletonLoader
                loading={loading}
                number={10}
                columnsConfig={[150, 200, 80, 150]}
                image={false}>
                {filteredCircuits.map((circuit) => (
                  <TableRow key={circuit.circuitId}>
                    <TableCell className="w-[200px]">
                      {circuit.wikipediaInfo &&
                      circuit.wikipediaInfo.imageUrl ? (
                        <Image
                          src={circuit.wikipediaInfo.imageUrl}
                          alt={`Image of ${circuit.circuitName}`}
                          width={90}
                          height={90}
                          className="aspect-square"
                        />
                      ) : (
                        <span>No Image</span> // Ou affichez une image par défaut
                      )}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {circuit.circuitName}
                    </TableCell>
                    <TableCell className="w-[80px]">
                      {circuit.Location.locality}
                    </TableCell>
                    <TableCell className="w-[80px]">
                      {circuit.Location.country}
                    </TableCell>
                    <TableCell className="w-[150px]">
                      <Button>
                        <Link href={`/circuits/${circuit.circuitId}`}>
                          View circuit
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

export default Circuits;
