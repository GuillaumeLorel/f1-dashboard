"use client";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import getConstructors from "./getConstructors";
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

const Constructors = () => {
  const { season } = useSeason();
  const [constructors, setConstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConstructors, setFilteredConstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const constructors = await getConstructors(season);
        setConstructors(constructors);
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
    const filtered = constructors.filter((constructor) => {
      return constructor.name.toLowerCase().includes(lowerCaseQuery);
    });
    setFilteredConstructors(filtered);
  }, [searchQuery, constructors]);

  return (
    <main className="p-5">
      <Header
        title="Constructors"
        subtitle={`Discover the constructors of ${season}`}
      />
      <Input
        placeholder="Search for a Constructor"
        className="w-fit mb-10 bg-secondary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <ScrollArea className="h-[69vh]">
          <Table>
            <TableCaption>The list of Constructors</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead className="w-[400px]">Nationality</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableSkeletonLoader
                loading={loading}
                number={10}
                columnsConfig={[200, 80, 150]}
                image={false}>
                {filteredConstructors.map((constructor) => (
                  <TableRow key={constructor.constructorId}>
                    <TableCell className="w-[200px]">
                      {constructor.name}
                    </TableCell>
                    <TableCell className="w-[80px]">
                      {constructor.nationality}
                    </TableCell>
                    <TableCell className="w-[150px]">
                      <Button>
                        <Link
                          href={`/constructors/${constructor.constructorId}`}>
                          View constructor
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

export default Constructors;
