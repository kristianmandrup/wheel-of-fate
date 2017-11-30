import { Day } from './day'
export class Month {
  days: Day[] = []
  day: number = 0

  fill(num: number = 30) {
    const max = 30 - this.day
    num = Math.min(max, num)
    this.day += num
    let previousDay
    let day, force
    return new Array(num).fill(1).map((_, index) => {
      force = index === 0
      day = new Day().fill(previousDay, force)
      this.days.push(day)
      previousDay = day
      return day
    })
  }

  get asJson() {
    console.log('month as json')
    return {
      days: this.days.map((day, index) => {
        return day.asJson(index)
      })
    }
  }
}

export function createMonth() {
  return new Month()
}
