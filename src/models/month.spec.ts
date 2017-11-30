import { Engineer } from './engineer'
// import { Day } from './day'
import { Month } from './month'

const { log } = console

beforeEach(() => {
  Engineer.engineers = []
})

describe('Month', () => {
  it('should create a Day', () => {
    expect(new Month()).toBeTruthy()
  })

  it('should create json', () => {
    Engineer.createInitial(10)
    const month = new Month()
    month.fill()

    let json = month.asJson
    log({
      days: json.days,
      type: typeof json.days
    })

    expect(json).toBeTruthy()
    expect(typeof json).toBe('object')
    expect(json.days).toBeTruthy()
    expect(Array.isArray(json.days)).toBeTruthy()

    const day1 = json.days[1]
    log({
      day1
    })

    expect(day1.index).toBeTruthy()
    expect(day1.morning).toBeTruthy()
    expect(day1.evening).toBeTruthy()

    expect(typeof day1.morning).toBe('object')
    expect(typeof day1.evening).toBe('object')
  })

  it('should fill day with engineers manually', () => {
    Engineer.createInitial(10)
    const month = new Month()
    const filled = month.fill()
    let prev
    filled.map(day => {
      expect(day.morning.name).toBeTruthy()
      expect(day.evening.name).toBeTruthy()
      // ensure no engineer is overworked
      if (prev) {
        expect(prev.isWorking(day.morning)).not.toBeTruthy()
        expect(prev.isWorking(day.evening)).not.toBeTruthy()
      }
      prev = day
    })
  })
})

