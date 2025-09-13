import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "./ui/button";

interface TimetableHeaderProps {
  title: string;
  terms: string[];
  currentTerm: string;
  onTermChange: (term: string) => void;
  showWeekend: boolean;
  onShowWeekendChange: (show: boolean) => void;
  type?: string;
  grades?: string[];
  currentGrade?: string;
  onGradeChange?: (grade: string) => void;
}

export function TimetableHeader({
  title,
  terms,
  currentTerm,
  onTermChange,
  showWeekend,
  onShowWeekendChange,
  type,
  grades = [],
  currentGrade = "",
  onGradeChange,
}: TimetableHeaderProps) {
  return (
    <div className="text-center space-y-4 p-6 md:p-8 rounded-3xl bg-muted/20 dark:bg-muted-10 backdrop-blur-xl border border-white/50 shadow-2xl shadow-accent/10">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
          <Calendar className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary   to-secondary bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      {terms.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4">
          <Select value={currentTerm} onValueChange={onTermChange}>
            <SelectTrigger className="w-[180px] bg-white/60 backdrop-blur-md border-white/50 shadow-lg rounded-xl">
              <SelectValue placeholder="选择学期" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}学期
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 专业课表添加年级选择器 */}
          {type === "profession" && grades.length > 0 && onGradeChange && (
            <Select value={currentGrade} onValueChange={onGradeChange}>
              <SelectTrigger className="w-[120px] bg-white/60 backdrop-blur-md border-white/50 shadow-lg rounded-xl">
                <SelectValue placeholder="选择年级" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}级
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3 rounded-full shadow-lg"
          >
            <a href="#timetable-content">
              开始
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

interface WeekendToggleProps {
  showWeekend: boolean;
  onToggle: () => void;
}

export function WeekendToggle({ showWeekend, onToggle }: WeekendToggleProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-lg border border-white/50">
      <span className="text-xs sm:text-sm font-medium text-slate-700">5天</span>
      <button onClick={onToggle} className="transition-colors duration-200">
        {showWeekend ? (
          <ToggleRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        ) : (
          <ToggleLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
        )}
      </button>
      <span className="text-xs sm:text-sm font-medium text-slate-700">7天</span>
    </div>
  );
}
