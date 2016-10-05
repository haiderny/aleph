// @flow

const RestClient = require('../../api/RestClient')

module.exports = {
  command: 'query [queryString]',
  description: 'send a mediachain query to the node for evaluation.',
  handler: (opts: {peerUrl: string, queryString: string}) => {
    const {peerUrl, queryString} = opts

    const client = new RestClient({peerUrl})
    client.queryStream(queryString)
      .then(response => {
          response.body.on('data', printValue)
      })
      .catch(err => console.error(err.message))
  }
}

function printValue (obj: Object) {
  console.dir(obj, {colors: true})
}
