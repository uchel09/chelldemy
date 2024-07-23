"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Course, Section } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import SectionList from "@/components/section/SectionList";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be  at least 2 characters long",
  }),
  subtitle: z.string().optional(),
});

const CreateSectionForm = ({
  course,
}: {
  course: Course & { sections: Section[] };
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course.id}/basic`,
    },
    { label: "Curriculum", path: `/instructor/courses/${course.id}/sections` },
  ];
  //   ================ form section  ==========================
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${course.id}/sections`,
        values
      );
      toast.success(" New Section Created!");
      router.push(
        `/instructor/courses/${course.id}/sections/${response.data.id}`
      );
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Failed to create a new section", error);
    }
  };

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      const response = await axios.put(
        `/api/courses/${course.id}/sections/reorder`,
        { list: updatedData }
      );
      toast.success("Section reordered successfully");
    } catch (error) {
      console.log("Failed to update Section", error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="px-10 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <div className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.label} href={route.path} className="flex- gap-4">
              <Button variant={pathname === route.path ? "default" : "outline"}>
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <SectionList
        items={course.sections}
        onReorder={onReorder}
        onEdit={(id) =>
          router.push(`/instructor/courses/${course.id}/sections/${id}`)
        }
      />
      <h1 className="text-xl font-bold my-5">Add New Section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="Example: Introduction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button
              type="button"
              onClick={() =>
                router.push(`/instructor/courses/${course.id}/basic`)
              }
            >
              Cancel
            </Button>

            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSectionForm;
