import CourseCard from "@/components/courses/CourseCArd";
import { db } from "@/lib/db";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const queryText = searchParams.query || "";
console.log(queryText)
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: queryText } },
        { category: { name: { contains: queryText } } },
        { subCategory: { name: { contains: queryText } } },
      ],
    },
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(courses)

  return (
    <div className="flex flex-col w-full px-5">
      <h1 className="text-2xl font-medium my-10">Recomended courses for {queryText}</h1>
      <div className="w-full flex flex-wrap justify-start items-center  gap-5  ">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
