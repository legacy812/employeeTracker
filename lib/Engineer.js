const Employee = require('../lib/Employee')

class Engineer extends Employee {
  constructor(name, id, email, github, icon) {
    super(name, id, email)
    this.github = github
    this.icon = icon
  }
  getGithub() {
    return this.github
  }
  getRole() {
    return 'Engineer'
  }
  getIcon() {
    return this.icon
  }
}

module.exports = Engineer 