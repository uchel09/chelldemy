"use client";
import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const sideRoutes = [
    { icon: MonitorPlay, label: "Courses", path: "/instructor/courses" },
    { icon: BarChart4, label: "Performance", path: "/instructor/performance" },
  ];

  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
      {sideRoutes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={`flex px-2 py-2 text-[16px] items-center gap-4 rounded-lg hover:bg-[#dcf7fa]
            ${pathname.startsWith(route.path) && "bg-[#02badd] text-white"}
            `}
        >
          <route.icon className="font-bold" />
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
