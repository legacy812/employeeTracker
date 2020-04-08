const Employee = require('../lib/Employee')

class Intern extends Employee {
  constructor(name, id, email, school, icon) {
    super(name, id, email)
    this.school = school
    this.icon = icon
  }
  getSchool() {
    return this.school
  }
  getRole() {
    return 'Intern'
  }
  getIcon() {
    return this.icon
  }
}

module.exports = Intern 