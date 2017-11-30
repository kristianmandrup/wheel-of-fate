import {
  createInitial
} from './random'

export class Engineer {
  constructor(public name: string) {
  }

  get asJson() {
    console.log('engineer as json', this.name)
    return {
      name: this.name
    }
  }

  static createInitial(num) {
    return createInitial(num, this.create)
  }

  static random(list) {
    list = list || this.engineers
    const index = Math.floor(Math.random() * list.length)
    return {
      element: list[index],
      index
    }
  }

  /**
   * Select number of engineers from list
   * @param num
   */
  static select(num: number = 2, exludeList?: Engineer[]) {
    if (this.engineers.length < num) {
      this.createInitial(num)
      // throw new Error(`not enough engineers to select from: ${this.engineers.length} < ${num}`)
    }

    function filtered(engineers) {
      return engineers.filter(e => {
        const condition = !Boolean(exludeList.find(ex => ex.name === e.name))
        return condition
      })
    }

    const { engineers } = this
    const selectionPool = exludeList.length > 0 ? filtered(engineers) : this.engineers
    if (selectionPool.length < num) {
      throw new Error(`not enough engineers to select from: ${selectionPool.length} < ${num}`)
    }

    const list = selectionPool.slice(0)
    const a = new Array(num).fill(1)
    return a.map(() => {
      const { element, index } = this.random(list)
      const clone = Object.assign({}, element)
      const engineer = Engineer.fromClone(clone)
      list.splice(index, 1)
      return engineer
    })
  }

  static engineers: Engineer[] = []

  static add(engineer) {
    this.engineers.push(engineer)
    return engineer
  }

  static fromClone(clone) {
    return this.create(clone.name)
  }

  static create(name: string) {
    const engineer = new Engineer(name)
    return Engineer.add(engineer)
  }
}
