"use client";
import getCircuit from "./getCircuit";
import { useSeason } from "@/components/SeasonContext";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Circuit({ params: { circuitId } }) {
  const { season } = useSeason();
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const circuit = await getCircuit(null, circuitId);
        setCircuit(circuit);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [circuitId]);

  return (
    <main className="h-full p-5">
      <div className="flex items-center h-[80%] gap-10">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-2xl font-bold mb-2">
            {circuit ? (
              circuit.circuitName
            ) : (
              <Skeleton className="w-[300px] h-[32px]" />
            )}
          </h1>
          <p>
            {circuit ? (
              circuit.wikipediaInfo.summary
            ) : (
              <Skeleton className="w-[400px] h-[200px]" />
            )}
          </p>
          {circuit ? (
            <Button asChild className="mt-4 w-fit">
              <Link href={circuit.url} target="__blank">
                Read More
              </Link>
            </Button>
          ) : (
            <Skeleton className="w-[100px] h-[40px] mt-4" />
          )}
        </div>
        {circuit ? (
          <Image
            src={
              circuit.wikipediaInfo.imageUrl
                ? circuit.wikipediaInfo.imageUrl
                : "/no-image.svg"
            }
            alt={circuit.circuitName}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
            }}
          />
        ) : (
          <Skeleton className="w-[600px] h-[400px] ml-auto" />
        )}
      </div>
    </main>
  );
}
