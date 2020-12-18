import dayjs from 'dayjs'

const useDate = (date) => {
  const currentDay = dayjs() //use to calculate days until trip
  const tripMonth = date.month()//Jan is 0, Dec is 11
  const tripYear = date.year()

  const daysInMonth = date.daysInMonth()
  const firstDateOfMonth = dayjs(`${tripYear}-${tripMonth + 1}-1`)
  const lastDateOfMonth = dayjs(`${tripYear}-${tripMonth + 1}-${daysInMonth}`)

  const firstWeekday = firstDateOfMonth.day()
  const lastWeekday = lastDateOfMonth.day()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return {
    currentDay,
    tripMonth,
    tripYear,
    daysInMonth,
    firstDateOfMonth,
    lastDateOfMonth,
    firstWeekday,
    lastWeekday,
    weekDays
  }
}

export default useDate