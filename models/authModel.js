const bcrypt = require("bcrypt");

const users = [
  {
    id: "1",
    name: "Nir Channes",
    email: "nirch@example.com",
    password: "$2a$10$s7ryn.PiuvzZBQNhtqrts.iiC2Z5xOvPOudbZZBbPsZXu8B47ZKnS",
  },
  {
    id: "2",
    name: "John Doe",
    email: "johnd@example.com",
    password: "$2a$10$xgWrV3IdpS6Te05vlZ8RDulCIoovt8LAfkIVvOIRovCYDSFEvY7wm",
  },
];

async function login(email, password) {
  const user = users.find((user) => user.email === email);

  if (user && bcrypt.compare(password, user.password)) {
    const { password: _, ...userNoPassword } = user;
    return userNoPassword;
  }
}

module.exports = { login };
