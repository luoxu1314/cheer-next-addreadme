export const timeMapping = [
  { key: 1, start: "08-00", end: "09-40" },
  { key: 2, start: "10-00", end: "11-40" },
  { key: 3, start: "14-00", end: "15-40" },
  { key: 4, start: "16-00", end: "17-40" },
  { key: 5, start: "19-00", end: "20-40" },
  { key: 6, start: "21-00", end: "22-40" },
] as const

export type TimeSlot = typeof timeMapping[number]
export type TimeSlotKey = TimeSlot['key']

// 查找指定key的时间段
export function getTimeSlot(key: number): TimeSlot | undefined {
  return timeMapping.find(slot => slot.key === key)
}

export function getTimeRange(startSlot: number): string {
  const slot = getTimeSlot(startSlot)
  
  if (!slot) return ""

  return `${slot.start.replace('-', ':')}-${slot.end.replace('-', ':')}`
}

export function formatTimeRange(rowIds: number[]): string {
  if (rowIds.length === 0) return ""

  // 取最小的行ID来获取时间段
  const minRowId = Math.min(...rowIds)
  return getTimeRange(minRowId)
}