import { Engineer } from './engineer'

export class Day {
  morning: Engineer
  evening: Engineer

  isWorking(engineer: Engineer) {
    return [this.morning, this.evening].indexOf(engineer) >= 0
  }

  asJson(index) {
    console.log('day as json', {
      index,
      morning: this.morning,
      evening: this.evening
    })
    return {
      index,
      morning: this.morning ? this.morning.asJson : {},
      evening: this.evening ? this.evening.asJson : {},
    }
  }

  /**
   *
   * @param previous
   * @param force To force engineer selection without taking into consideration a previosu day schedule
   */
  fill(previous: Day, force?: boolean): Day {
    if (!previous && !force) {
      throw new Error('Must take a previous day schedule to ensure engineers are not overworked')
    }
    const exludeList = force ? [] : [previous.morning, previous.evening]
    const engineers = Engineer.select(2, exludeList)
    if (!engineers || engineers.length === 0) {
      throw new Error('No engineers to fill with :(')
    }
    console.log('filling with', {
      engineers
    })
    this.morning = engineers[0]
    this.evening = engineers[1]
    return this
  }
}
