import getCoursesByCategory from "@/app/actions/getCourses";
import CourseCard from "@/components/courses/CourseCArd";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import Image from "next/image";

const CoursesByCategory = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCoursesByCategory(params.categoryId);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16 w-[100vw]">
      <Categories
        categories={categories}
        selectedCategory={params.categoryId}
      />
      <div className="flex flex-wrap gap-7 w-full justify-start">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="w-[100vw] h-full flex flex-col justify-center items-center">
            <Image alt="nocourse" src="/no-course.svg" width={200} height={200}/>
            <p className="font-bold">Sorry, There are no courses yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesByCategory;
