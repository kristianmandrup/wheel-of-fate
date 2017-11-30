const month = {
  schema: {
    params: {
      id: {
        type: 'number'
      }
    },
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      }
    }
  }
}

module.exports = {
  month
}
