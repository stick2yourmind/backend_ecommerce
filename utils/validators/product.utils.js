const isValidProduct = ({ category, description, name, photo, price, stock }) => {
  console.log('isValidProduct')
  if (category === undefined || description === undefined || name === undefined ||
    photo === undefined || price === undefined || stock === undefined)
    return false
  const isString = typeof category === 'string' && typeof description === 'string' &&
  typeof name === 'string' && typeof photo === 'string'
  console.log('isString')
  console.log(isString)
  if (!isString) return false
  const isNumber = !Number.isNaN(price) && !Number.isNaN(stock)
  console.log('isNumber')
  console.log(isNumber)
  if (!isNumber) return false
  return true
}

module.exports = { isValidProduct }
