const transpose = grid => {

}


function* ecaGenerator(activePatterns) {
  let state = [0, 1, 0]

  while (true) {
    yield state
    state.unshift(0)
    state.push(0)

    const newState = []

    for (let i = 0; i < state.length; i += 1) {
      const pattern = `${state[i - 1] || 0}${state[i]}${state[i + 1] || 0}`
      const newCell = activePatterns.includes(pattern) ? 1 : 0
      newState.push(newCell)
    }

    state = newState
  }
}

const generateState = (size, activePatterns) => {
  const ecaGen = new ecaGenerator(activePatterns)

  const state = []
  for (let i = 0; i < size; i += 1) {
    state.push(ecaGen.next().value)
  }

  return state

  // const state = new Array(size)
  // state.map(cell => ecaGen.next().value)
}

const padRow = (row, size) => {
  while (row.length < size) {
    row.push(0)
    row.unshift(0)
  }

  if (size % 2 !== 0) {
    row.pop()
  }

  return row
}

const generateGrid = (size, activePatterns) => {
  const state = generateState(size, activePatterns)
  const maxLength = state[state.length - 1].length
  const grid = state.map(row => padRow(row, maxLength))

  return grid
}

export default generateGrid
