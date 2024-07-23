"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PriceFormat } from "@/lib/currencyForma";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title", // course.title
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return <div>{PriceFormat(price)}</div>;
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={` test-white${
            isPublished && "bg-[#02badd]  hover:bg-[#02badd]"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/instructor/courses/${row.original.id}/basic`}
        className="flex gap-2 items-center hover:text-[#02badd]"
      >
        <Pencil className="h-4 w-4" /> Edit
      </Link>
    ),
  },
];
