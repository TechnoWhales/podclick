export const getRelativeTimeToken = (diff: number) => {
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 45) {
    return { key: 'timeAgo.justNow' }
  }

  if (minutes < 60) {
    return { key: 'timeAgo.minute', count: minutes }
  }

  if (hours < 24) {
    return { key: 'timeAgo.hour', count: hours }
  }

  if (days < 7) {
    return { key: 'timeAgo.day', count: days }
  }

  if (weeks < 5) {
    return { key: 'timeAgo.week', count: weeks }
  }

  if (months < 12) {
    return { key: 'timeAgo.month', count: months }
  }

  return { key: 'timeAgo.year', count: years }
}
