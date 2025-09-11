"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User, Calendar, ToggleLeft, ToggleRight } from "lucide-react"
import { useState } from "react"

interface Course {
  id: string
  title: string
  instructor: string
  room: string
  time: string
  color: string
}

interface TimetableProps {
  courses?: Course[][]
}

const defaultCourses: Course[][] = [
  // Monday
  [
    {
      id: "1",
      title: "Ideological and Moral Cultivation",
      instructor: "Prof. Zhang",
      room: "2-4, 8-20",
      time: "08:00-09:40",
      color: "gradient-blue border-blue-300 hover:shadow-lg hover:shadow-blue-200/50",
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      instructor: "Dr. Li",
      room: "3-5, 12-18",
      time: "10:00-11:40",
      color: "gradient-green border-green-300 hover:shadow-lg hover:shadow-green-200/50",
    },
  ],
  // Tuesday
  [
    {
      id: "3",
      title: "Computer Science Fundamentals",
      instructor: "Prof. Wang",
      room: "1-3, 15-25",
      time: "08:00-09:40",
      color: "gradient-purple border-purple-300 hover:shadow-lg hover:shadow-purple-200/50",
    },
  ],
  // Wednesday
  [
    {
      id: "4",
      title: "English Literature",
      instructor: "Dr. Chen",
      room: "4-6, 10-20",
      time: "14:00-15:40",
      color: "gradient-orange border-orange-300 hover:shadow-lg hover:shadow-orange-200/50",
    },
    {
      id: "5",
      title: "Physics Laboratory",
      instructor: "Prof. Liu",
      room: "Lab-A, 5-15",
      time: "16:00-17:40",
      color: "gradient-pink border-pink-300 hover:shadow-lg hover:shadow-pink-200/50",
    },
  ],
  // Thursday
  [
    {
      id: "6",
      title: "Data Structures",
      instructor: "Dr. Yang",
      room: "2-8, 12-22",
      time: "10:00-11:40",
      color: "gradient-teal border-teal-300 hover:shadow-lg hover:shadow-teal-200/50",
    },
  ],
  // Friday
  [
    {
      id: "7",
      title: "Philosophy",
      instructor: "Prof. Zhou",
      room: "1-5, 8-18",
      time: "08:00-09:40",
      color: "gradient-blue border-blue-300 hover:shadow-lg hover:shadow-blue-200/50",
    },
  ],
  // Saturday
  [],
  // Sunday
  [],
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const dayAbbreviations = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

export function TimetableOriginal({ courses = defaultCourses }: TimetableProps) {
  const [showWeekend, setShowWeekend] = useState(false)

  const displayDays = showWeekend ? days : days.slice(0, 5)
  const displayCourses = showWeekend ? courses : courses.slice(0, 5)
  const displayDayAbbr = showWeekend ? dayAbbreviations : dayAbbreviations.slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.2),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30"></div>

      <div className="relative w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        <div className="text-center space-y-4 p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl shadow-purple-500/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Weekly Schedule
            </h1>
          </div>
          <p className="text-slate-600 text-lg font-medium">Academic Year 2024-2025</p>

          <div className="flex justify-center lg:hidden">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50">
              <span className="text-sm font-medium text-slate-700">5 Days</span>
              <button onClick={() => setShowWeekend(!showWeekend)} className="transition-colors duration-200">
                {showWeekend ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </button>
              <span className="text-sm font-medium text-slate-700">7 Days</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className={`grid gap-4 ${showWeekend ? "grid-cols-8" : "grid-cols-6"}`}>
            <div className="font-semibold text-center py-4 text-slate-600 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg">
              Time
            </div>

            {displayDays.map((day) => (
              <div
                key={day}
                className="font-semibold text-center py-4 bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg text-slate-700"
              >
                {day}
              </div>
            ))}

            {timeSlots.flatMap((time, timeIndex) => [
              <div
                key={`time-${timeIndex}`}
                className="text-sm text-slate-500 text-center py-3 font-mono bg-white/40 backdrop-blur-md rounded-xl border border-white/40"
              >
                {time}
              </div>,
              ...displayDays.map((day, dayIndex) => {
                const dayCourses = displayCourses[dayIndex] || []
                const courseForThisSlot = dayCourses.find((course) => course.time.startsWith(time))

                return (
                  <div key={`${day}-${timeIndex}`} className="min-h-[100px] p-1">
                    {courseForThisSlot && (
                      <Card className="h-full p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-purple-200/50">
                        <div className="space-y-3">
                          <h3 className="font-bold text-sm leading-tight text-balance text-slate-800">
                            {courseForThisSlot.title}
                          </h3>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <User className="w-3 h-3 text-blue-500" />
                              <span className="font-medium">{courseForThisSlot.instructor}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MapPin className="w-3 h-3 text-purple-500" />
                              <span>{courseForThisSlot.room}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Clock className="w-3 h-3 text-pink-500" />
                              <span>{courseForThisSlot.time}</span>
                            </div>
                          </div>

                          <Badge className="text-xs bg-blue-600 text-white border-0 shadow-sm">Active</Badge>
                        </div>
                      </Card>
                    )}
                  </div>
                )
              }),
            ])}
          </div>
        </div>

        <div className="lg:hidden">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg overflow-hidden">
            {showWeekend ? (
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-8 gap-0">
                    <div className="p-2 text-center font-semibold text-xs text-slate-600 border-r border-white/50">
                      Time
                    </div>
                    {displayDayAbbr.map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center font-semibold text-xs text-slate-700 border-r border-white/50 last:border-r-0"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto">
                    {timeSlots.map((time, timeIndex) => (
                      <div key={`mobile-time-${timeIndex}`} className="grid grid-cols-8 gap-0 border-t border-white/30">
                        <div className="p-2 text-center text-xs font-mono text-slate-500 border-r border-white/50 bg-white/30">
                          {time}
                        </div>
                        {displayDays.map((day, dayIndex) => {
                          const dayCourses = displayCourses[dayIndex] || []
                          const courseForThisSlot = dayCourses.find((course) => course.time.startsWith(time))

                          return (
                            <div
                              key={`mobile-${day}-${timeIndex}`}
                              className="min-h-[60px] p-1 border-r border-white/50 last:border-r-0"
                            >
                              {courseForThisSlot && (
                                <div className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200/50 p-1.5 hover:shadow-md transition-all duration-200">
                                  <div className="space-y-1">
                                    <h4 className="font-bold text-[10px] leading-tight text-slate-800 line-clamp-2">
                                      {courseForThisSlot.title}
                                    </h4>
                                    <div className="space-y-0.5">
                                      <div className="flex items-center gap-1 text-[9px] text-slate-600">
                                        <User className="w-2 h-2 text-blue-500" />
                                        <span className="truncate">{courseForThisSlot.instructor}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-[9px] text-slate-600">
                                        <MapPin className="w-2 h-2 text-purple-500" />
                                        <span className="truncate">{courseForThisSlot.room}</span>
                                      </div>
                                    </div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-0">
                  <div className="p-2 text-center font-semibold text-xs text-slate-600 border-r border-white/50">
                    Time
                  </div>
                  {displayDayAbbr.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center font-semibold text-xs text-slate-700 border-r border-white/50 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="max-h-[70vh] overflow-y-auto">
                  {timeSlots.map((time, timeIndex) => (
                    <div key={`mobile-time-${timeIndex}`} className="grid grid-cols-6 gap-0 border-t border-white/30">
                      <div className="p-2 text-center text-xs font-mono text-slate-500 border-r border-white/50 bg-white/30">
                        {time}
                      </div>
                      {displayDays.map((day, dayIndex) => {
                        const dayCourses = displayCourses[dayIndex] || []
                        const courseForThisSlot = dayCourses.find((course) => course.time.startsWith(time))

                        return (
                          <div
                            key={`mobile-${day}-${timeIndex}`}
                            className="min-h-[60px] p-1 border-r border-white/50 last:border-r-0"
                          >
                            {courseForThisSlot && (
                              <div className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200/50 p-1.5 hover:shadow-md transition-all duration-200">
                                <div className="space-y-1">
                                  <h4 className="font-bold text-[10px] leading-tight text-slate-800 line-clamp-2">
                                    {courseForThisSlot.title}
                                  </h4>
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-1 text-[9px] text-slate-600">
                                      <User className="w-2 h-2 text-blue-500" />
                                      <span className="truncate">{courseForThisSlot.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[9px] text-slate-600">
                                      <MapPin className="w-2 h-2 text-purple-500" />
                                      <span className="truncate">{courseForThisSlot.room}</span>
                                    </div>
                                  </div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50">
              <span className="text-sm font-medium text-slate-700">5 Days</span>
              <button onClick={() => setShowWeekend(!showWeekend)} className="transition-colors duration-200">
                {showWeekend ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </button>
              <span className="text-sm font-medium text-slate-700">7 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
