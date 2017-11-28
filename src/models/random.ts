// import faker from 'faker'

const names = {
  first: [
    'Chris',
    'Anna',
    'Susan',
    'Mike',
    'Shane',
    'Adam',
    'Bianca',
    'Louise'
  ],
  last: [
    'Jackson',
    'Smith',
    'West',
    'Black',
    'Brown',
    'Johnson',
    'Tillerson',
    'Erikson',
    'Swift',
    'Langley',
    'Roberts',
    'Rye',
    'McGregor',
    'Pool'
  ]
}

function random(max: number) {
  return Math.floor(Math.random() * max)
}

export function randomNames(num: number): string[] {
  let firstIndex, lastIndex
  return new Array(num).fill(1).map(() => {
    firstIndex = random(names.first.length)
    lastIndex = random(names.last.length)
    return names.first[firstIndex] + ' ' + names.last[lastIndex]
  })
}

export function createInitial(num: number = 10, create) {
  return randomNames(num).map(name => {
    return create(name)
  })
}
