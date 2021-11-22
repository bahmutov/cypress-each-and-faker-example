/// <reference types="cypress" />
import 'cypress-each'

const faker = require('faker')
faker.seed(404)

const users = Cypress._.range(1, 21).map((k) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    id: k,
  }
})

const testTitle = (user) => `user ${user.id} ${user.email}`

// generate tests from the data using different approaches

describe('20 tests', () => {
  it.each(users)(testTitle, (user) => {
    expect(user.id).to.be.within(1, 20)
  })
})

describe('test every 5th item', () => {
  it.each(users, 5)(testTitle, (user) => {
    expect(user.id).to.be.within(1, 20)
  })
})

describe('split all items into 4 chunks and test the 2nd chunk', () => {
  it.each(
    users,
    4, // total chunks
    1, // chunk index (0 based)
  )(testTitle, (user) => {
    expect(user.id).to.be.within(1, 20)
  })
})

describe('randomly pick 3 users and test them', () => {
  it.each(Cypress._.sampleSize(users, 3))(testTitle, (user) => {
    expect(user.id).to.be.within(1, 20)
  })
})
