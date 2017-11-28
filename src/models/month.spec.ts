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

