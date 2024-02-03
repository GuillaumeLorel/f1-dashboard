import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeletonLoader = ({
  loading,
  children,
  number = 1,
  columnsConfig,
  image = false,
}) => {
  return (
    <>
      {loading
        ? Array.from({ length: number }).map((_, index) => (
            <TableRow key={index}>
              {columnsConfig.map((width, colIndex) => (
                <TableCell key={colIndex}>
                  {image && colIndex === 0 ? (
                    <Skeleton className="w-[90px] h-[90px] rounded-full object-cover aspect-square" />
                  ) : (
                    <Skeleton className={`w-[${width}px] h-5`} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        : children}
    </>
  );
};

export default TableSkeletonLoader;
