const NodeFetch = require('./request')

const dogFetch = new NodeFetch({
  baseURL:'https://random.dog/woof.json',
  timeout:1000
})

const catFetch = new NodeFetch({
  baseURL:'https://aws.random.cat/meow',
  timeout:1000
})

module.exports = {
  baseHTTP:{
    dogFetch,
    catFetch
  }
}