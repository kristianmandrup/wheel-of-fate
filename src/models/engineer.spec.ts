import { Engineer } from './engineer'

import {
  randomNames,
  createInitial
} from './random'

beforeEach(() => {
  Engineer.engineers = []
})

describe('Engineer', () => {
  it('should create engineer', () => {
    expect(new Engineer('kris')).toBeTruthy()
  })

  it('should add engineer', () => {
    Engineer.create('kris')
    expect(Engineer.engineers.length).toBe(1)
  })

  it('should select 2 random engineers', () => {
    Engineer.create('kris')
    Engineer.create('anna')
    const selection = Engineer.select()
    expect(selection.length).toBe(2)
    expect(selection[0].name).toBeTruthy()
    expect(selection[0]).not.toBe(selection[1])
  })

  it('should not select 2 engineers when excludeList excludes too many', () => {
    const kris = Engineer.create('kris')
    // const anna =
    Engineer.create('anna')
    const exludeList = [kris]
    try {
      const selection = Engineer.select(2, exludeList)
      expect(selection).not.toBeTruthy()
    } catch (err) {
      // log({ err })
      expect(err).toBeTruthy()
    }
  })

  it('should generate random names', () => {
    const names = randomNames(2)
    expect(names.length).toBe(2)
    expect(typeof names[0]).toBe('string')
  })

  it('should create random engineers', () => {
    const engineers = createInitial(2)
    expect(engineers.length).toBe(2)
    expect(typeof engineers[0].name).toBe('string')
  })
})

