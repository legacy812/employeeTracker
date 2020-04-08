const Employee = require('../lib/Employee')

class Manager extends Employee {
  constructor(name, id, email, officeNumber, icon) {
    super(name, id, email)
    this.officeNumber = officeNumber
    this.icon = icon
  }
  getOfficeNumber() {
    return this.officeNumber
  }
  getRole() {
    return 'Manager'
  }
  getIcon() {
    return this.icon
  }
}

module.exports = Manager