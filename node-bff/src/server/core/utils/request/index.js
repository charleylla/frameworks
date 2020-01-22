const NodeFetch = require('./request')

const baseHTTP = new NodeFetch({
  baseURL:'https://random.dog/woof.json',
  timeout:1000
})

module.exports = {
  baseHTTP
}