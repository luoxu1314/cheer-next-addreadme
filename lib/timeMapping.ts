export const timeMapping = {
  1: "08-00",
  2: "09-40", 
  3: "10-00",
  4: "11-40",
  5: "14-00",
  6: "15-40",
  7: "16-00",
  8: "17-40",
  9: "19-00",
  10: "20-40",
  11: "21-00",
  12: "22-40",
} as const

export type TimeSlotNumber = keyof typeof timeMapping

export function getTimeRange(startSlot: number, endSlot: number): string {
  const startTime = timeMapping[startSlot as TimeSlotNumber]
  const endTime = timeMapping[endSlot as TimeSlotNumber]
  
  if (!startTime || !endTime) return ""
  
  return `${startTime.replace('-', ':')}-${endTime.replace('-', ':')}`
}

export function formatTimeRange(rowIds: number[]): string {
  if (rowIds.length === 0) return ""
  
  const start = Math.min(...rowIds)
  const end = Math.max(...rowIds)
  
  return getTimeRange(start, end)
}