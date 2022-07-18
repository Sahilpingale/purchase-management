import bcrypt from 'bcryptjs'
const users1 = [
  {
    username: 'Admin User',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    username: 'sahil123',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    username: 'sushil123',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users1
