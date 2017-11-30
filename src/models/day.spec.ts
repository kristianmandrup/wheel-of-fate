import { Engineer } from './engineer'
import { Day } from './day'

const { log } = console

beforeEach(() => {
  Engineer.engineers = []
})

describe('Day', () => {
  it('should create a Day', () => {
    expect(new Day()).toBeTruthy()
  })

  it('should fill day with engineers manually', () => {
    const day = new Day()
    const kris = Engineer.create('kris')
    const anna = Engineer.create('anna')

    day.morning = kris
    day.evening = anna

    expect(day.morning.name).toBe('kris')
    expect(day.evening.name).toBe('anna')
  })

  it('should jsonify day', () => {
    const day = new Day()
    const kris = Engineer.create('kris')
    const anna = Engineer.create('anna')

    day.morning = kris
    day.evening = anna

    const json = day.asJson(0)

    log({
      json
    })

    expect(json).toBeTruthy()
  })

  it('should fill day with engineers manually', () => {
    Engineer.createInitial(10)
    const day = new Day().fill(null, true)
    expect(day.morning.name).toBeTruthy()
    expect(day.evening.name).toBeTruthy()
    expect(day.morning.name).not.toBe(day.evening.name)
  })

  it('should not be able to fill day if pool too small', () => {
    Engineer.createInitial(3)
    expect(Engineer.engineers.length).toBe(3)
    const day = new Day().fill(null, true)
    expect(day.morning.name).toBeTruthy()
    expect(day.evening.name).toBeTruthy()
    expect(day.morning.name).not.toBe(day.evening.name)
    try {
      const nextDay = new Day().fill(day)
      expect(nextDay).not.toBeDefined()
    } catch (err) {
      // log({ err })
      expect(err).toBeDefined()
    }
  })
})

