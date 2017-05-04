import async from 'async'
import util from 'util'

let arr = [1, 2, 3, 4, 5]

async.map(arr, (e, cb) => {
  cb(null, e * e)
}, (err, results) => {
  if (err) {
    console.err(err)
  }
  console.log(util.inspect(results))
})

let result = []
let addOneAsync = (e, cb) => {
  console.log(e + 1)
  cb(null, e + 1)
}
// test function work
addOneAsync(1, (err, r) => {})

let map = (arr, aFn, cbFinal) => {
  let result = []
  let finalErr = null
  console.log('test start: ' + util.inspect(arr))

  for (let i = 0; i < arr.length; i++) {
    aFn(arr[i], (err, res) => {
      if (err) {
         finalErr = err
      }
      result[i] = res
    })
  }

  cbFinal(finalErr, result)
}

map([1,2,3], addOneAsync, (err, result) => { console.log('final: ' + util.inspect(result)) })
