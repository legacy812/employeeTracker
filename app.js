const fs = require('fs')
const prompt = require('inquirer').createPromptModule()
const path = require('path')
const { JSDOM } = require('jsdom')


const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')


async function createTeam() {

  let employeeList = []
  let employee = {}
  let employeeInput = ''
  let extraIntup = ''
  let more = ''

  try {
    do {
      let employeeInput = await prompt(
        [
          {
            type: 'list',
            name: 'employeeType',
            message: 'Employee type:',
            choices: ['Manager', 'Engineer', 'Intern']
          },
          {
            type: 'input',
            name: 'name',
            message: 'Employee name:'
          },
          {
            type: 'input',
            name: 'id',
            message: 'Employee ID:'
          },
          {
            type: 'input',
            name: 'email',
            message: 'Employee Email:'
          }
        ])
      employee.type = employeeInput.employeeType
      employee.name = employeeInput.name
      employee.id = employeeInput.id
      employee.email = employeeInput.email

      switch (employee.type) {
        case 'Manager':
          extraInput = await prompt(
            {
              type: 'input',
              name: 'roomNumber',
              message: 'Enter room number:'
            }
          )
          employee.roomNumber = extraInput.roomNumber
          employee.icon = 'free_breakfast'
          employeeList.push(new Manager(employee.name, employee.id, employee.email, employee.roomNumber, employee.icon))
          break
        case 'Engineer':
          extraInput = await prompt(
            {
              type: 'input',
              name: 'gitHub',
              message: 'Enter GIT-hub:'
            }
          )
          employee.gitHub = extraInput.gitHub
          employee.icon = 'code'
          employeeList.push(new Engineer(employee.name, employee.id, employee.email, employee.gitHub, employee.icon))
          break
        case 'Intern':
          extraInput = await prompt(
            {
              type: 'input',
              name: 'school',
              message: 'Enter School:'
            }
          )
          employee.school = extraInput.school
          employee.icon = 'school'
          employeeList.push(new Intern(employee.name, employee.id, employee.email, employee.school, employee.icon))
          break
      }
      more = await prompt(
        {
          type: 'confirm',
          name: 'more',
          message: 'Any more employees?'
        })
    } while (more.more)

    return employeeList

  } catch (e) { console.error(e) }
}

async function renderHtml(employee) {

  await fs.writeFile('./output/team.html', `<!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Employee Tracker</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>

    <body>
      <nav>
        <div class="nav-extended">
          <a href="#" class="brand-logo center">My Team</a>
        </div>
      </nav>

  <div class="row">`, e => e ? console.log(e) : null)

  fs.appendFile('./output/team.html', renderEmployees(employee), e => e ? console.log(e) : null)
  fs.appendFile('./output/team.html', `
  </div>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>

</html>`, e => e ? console.log(e) : null)

}

function renderEmployees(employee) {

  let htmlOut = ''

  for (i = 0; i < employee.length; i++) {
    let output = ''
    switch (employee[i].getRole()) {

      case 'Manager':
        output = `
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">
                <h4> ${employee[i].getName()} </h4>
              </span>
              <span class="card-title">${employee[i].getRole()}</span>
             <i class="material-icons">${employee[i].getIcon()}</i>
            </div>
            <div class="collection">
              <p href="#!" class="collection-item">ID: ${employee[i].getId()}</p>
              <p href="#!" class="collection-item">Email:${employee[i].getEmail()}</p>
              <p href="#!" class="collection-item">Office Number: ${employee[i].getOfficeNumber()}</p>
            </div>
          </div>
        </div>`
        htmlOut += output
        break
      case 'Engineer':
        output = `
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">
                <h4> ${employee[i].getName()} </h4>
              </span>
              <span class="card-title">${employee[i].getRole()}</span>
             <i class="material-icons">${employee[i].getIcon()}</i>
            </div>
            <div class="collection">
              <p href="#!" class="collection-item">ID: ${employee[i].getId()}</p>
              <p href="#!" class="collection-item">Email: ${employee[i].getEmail()}</p>
              <p href="#!" class="collection-item">GitHub: ${employee[i].getGithub()}</p>
            </div>
          </div>
        </div>`
        htmlOut += output
        break
      case 'Intern':
        output = `
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">
                <h4> ${employee[i].getName()} </h4>
              </span>
              <span class="card-title">${employee[i].getRole()}</span>
             <i class="material-icons">${employee[i].getIcon()}</i>
            </div>
            <div class="collection">
              <p href="#!" class="collection-item">ID: ${employee[i].getId()}</p>
              <p href="#!" class="collection-item">Email: ${employee[i].getEmail()}</p>
              <p href="#!" class="collection-item">School: ${employee[i].getSchool()}</p>
            </div>
          </div>
        </div>`
        htmlOut += output
        break
    }

  }
  return htmlOut

}

async function init() {
  let employee = []
  try {
    employee = await createTeam()
    console.log(employee[0].getRole())
    renderHtml(employee)

  } catch (e) { console.error(e) }
}

init()

