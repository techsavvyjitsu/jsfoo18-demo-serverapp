export default `

  type Company {
    name: String
  }

  type Geo {
    lat: String
    lng: String
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type User {
    id: Int,
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }
  
  type Query {
    users: [User]
    userById (id: Int!): User
  }

`;