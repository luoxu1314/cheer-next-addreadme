import prisma from "@/lib/prisma";
import { getTimetable } from "@/lib/server/service/getTimetable";
import { OwnerType } from "@/lib/types/Owner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// https://beta.nextjs.org/docs/api-reference/segment-config#configrevalidate

const TimeTable = dynamic(() => import("@/components/timetable"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading timetable...</div>
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  // read route params
  const { slug } = params;
  const [type, id, term, grade] = slug;
  if (decodeURIComponent(type) === "[[...slug]]") {
    return {};
  }
  const { courses, owner, terms } = await getTimetable(
    type as OwnerType,
    id,
    term,
    grade
  );

  return {
    title: `${owner.name}@${owner.label}`,
    abstract:
      "中南大学" +
      `${owner.label}${owner.name}` +
      (term ? `${term}学期` : "") +
      "课表",
    description:
      "中南大学" +
      `${owner.label}${owner.name}` +
      (term ? `${term}学期` : "") +
      "课表",
  };
}

export default async function TimeTablePage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const [type, id, term, grade] = slug;
  if (decodeURIComponent(type) === "[[...slug]]") {
    return null;
  }
  const { courses, owner, terms } = await getTimetable(
    type as OwnerType,
    id,
    term,
    grade
  );
  const title = (owner.label || "") + owner.name;
  
  return (
    <TimeTable
      terms={terms}
      title={title}
      courses={courses}
      type={type}
      id={id}
    />
  );
}

export async function generateStaticParams() {
  const students = await prisma.student.findMany({
    where: {
      grade: {
        gte: "2020",
      },
    },
    distinct: ["className"],
  });

  const params = students
    .filter((e, i) => i % 16 == 0)
    .map((s) => {
      return {
        slug: ["student", s.id],
      };
    });

  return params;
}
