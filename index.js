
const mysql = require('mysql');
const inquirer = require('inquirer');
var figlet = require('figlet');
 
figlet('Employee \n Tracker!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Birdman123!',

  //Desired database
  database: 'employee_tracker_db',
});

const start = () => {
  inquirer.prompt({
      name: 'chooseAction',
      type: 'list',
      message: 'WELCOME to your employee tracking system! Would you like to [VIEW], [ADD], or [UPDATE] a department, role, or employee?',
      choices: ['VIEW', 'ADD', 'UPDATE'],
    }).then(response => {
      console.log(response)

      //VIEW Selection
      if(response.chooseAction === 'VIEW'){
        inquirer.prompt({
      name: 'chooseView',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['Departments', 'Roles', 'Employees']
      }).then(response => {
        console.log(response.chooseView)
        //View Depts
        if(response.chooseView === 'Departments'){
          connection.query(
            'SELECT * FROM department', (err, res) => {
              if(err) throw err;
              console.table(res)
            }
          )
        }
        //View Roles
        if(response.chooseView === 'Roles'){
          connection.query(
            'SELECT * FROM role', (err, res) => {
              if(err) throw err;
              console.table(res)
            }
          )
        }
        //View Eployees
        if(response.chooseView === 'Employees'){
          connection.query(
            'SELECT * FROM employee', (err, res) => {
              if(err) throw err;
              console.table(res)
            }
          )
        }
        connection.end()
      })
    }


      if(response.chooseAction === 'ADD'){
        console.log(response)
        inquirer.prompt(
          {
          name: 'chooseAdd',
          type: 'list',
          message: 'What would you like to add to?',
          choices: ['Departments', 'Roles', 'Employees']
          },
          ).then(response => {
            console.log(response.chooseAdd)
            if(response.chooseAdd === 'Departments'){
              inquirer.prompt(
                {
                  type: 'input',
                  message: 'Please enter the department name',
                  name: 'deptName'
                }
              ).then(response => {
                connection.query(`INSERT INTO department (name) VALUE (?)`, [response.deptName], (err, res) => {
                  if(err) throw err;
                  console.table(res)
                connection.query('SELECT * FROM department', (err, res) => {
                  if(err) throw err;
                  console.table(res)
                  })
                })
              })
              
            }

            if(response.chooseAdd === 'Roles'){
              inquirer.prompt([
                {
                  type: 'list',
                  message: 'Please enter the roles\'s title.',
                  choices: ['Sales Lead' , 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
                  name: 'roleTitle'
                },
                {
                  type: 'input',
                  message: 'Please enter the role\'s salary.',
                  name: 'roleSalary'
                },
                {
                  type: 'list',
                  message: 'Please enter the roles\'s department ID.',
                  name: 'roleId',
                  choices: [1, 2, 3, 4, 5, 6, 7]
                }
              ]).then(response => {
                console.log(response)
                connection.query('INSERT INTO role ( title, salary, department_id) VALUE (?,?,?)', [response.roleTitle, response.roleSalary, response.roleId], (err, res) => {
                  if(err) throw err;
                  console.table(res)
                })
              })


            }

            if(response.chooseAdd === 'Employees'){
              inquirer.prompt([
                {
                  type: 'input',
                  message: 'What is your employee\'ss first name?',
                  name: 'firstName'
                },
                {
                  type: 'input',
                  message: 'What is your employee\'ss last name?',
                  name: 'lastName'
                },
                {
                  type: 'input',
                  message: 'What is your employee\'ss role ID?',
                  name: 'employeeRoleId'
                },
                {
                  type: 'input',
                  message: 'What is your employee\'s manager ID',
                  name: 'employeeManagerId'
                },
              ]).then(response => {
                connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)')
              })
            }
          })

      }
      if(response === 'UPDATE'){

      }
    })
  }

  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
