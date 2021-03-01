const mysql = require('mysql');
const inquirer = require('inquirer');

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
      message: 'Would you like to [VIEW], [ADD], or [UPDATE] a department, role or employee?',
      choices: ['VIEW', 'ADD', 'UPDATE'],
    }).then(response => {
      console.log(response)
      if(response.chooseAction === 'VIEW'){
        inquirer.prompt({
      name: 'chooseView',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['Departments', 'Roles', 'Employees']
      }).then(response => {
        if(response === 'Departments'){
          console.log('match')
          connection.query(
            'SELECT * FROM department', (req, res) => {
              if(err) throw err;
              console.table(res)
            }
          )
        }
      })


    }
      if(response === 'ADD'){

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
