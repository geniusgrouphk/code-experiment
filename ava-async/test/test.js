import test from 'ava'

test('async test', t => {
  t.plan(1)
  setTimeout(() => {
    t.is(3, 1 + 2)
  }, 1000)
})
