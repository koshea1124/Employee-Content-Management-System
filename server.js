const inquirer = require("inquirer");
const mysql = require("mysql2");

require("dotenv").config();

// create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


//Star Employee Content Management System
const start = () => {
  return inquirer
    .prompt ([
          {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                new inquirer.Separator("-----VIEW TABLES-----"),
                "View all departments",
                "View all roles",
                "View all employees",
                new inquirer.Separator("-----ADD TO TABLES-----"),
                "Add a department",
                "Add a role",
                "Add an employee",
                "Add a Manager",
                new inquirer.Separator("-----UPDATE TABLES-----"),
                "Update an employee role",
                new inquirer.Separator("-----Exit-----"),
                "Exit",
            ],
          },
        ])  
        .then ((answers) => {
          const { menu } = answers
            switch (menu) {
                case "View all departments":
                    showDepartments();
                    break;
                case "View all roles":
                    showRoles();
                    break;
                case "View all employees":
                    showEmployees();
                    break;
                 case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                 case "Update an employee role":
                    updateEmployeeRole();
                    break;
                    case "Exit":
                      connection.end(); // Close the database connection
                      console.log("Goodbye!");
                      break;
                    default:
                      break;
                  }
               });    
            };
      


showDepartments = () => {
  console.log("Showing all departments");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
      
  connection.promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      start();
          })
    .catch((err) => {
      console.error(err);
      start();
    });
};

showRoles = () => {
  console.log("Showing all roles");
  const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department FROM \`roles\`
        INNER JOIN department ON roles.department_id = department.id`;

  connection.promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      start();
    })
    .catch((err) => {
      throw err;
    });
};

showEmployees = () => {
  console.log("Showing all employees");
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department,
    roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.table(rows);
      start();
    })
    .catch((err) => {
      throw err;
    });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "Dept",
        type: "input",
        message: "What department would you like to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a department.");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      connection.promise()
        .query(sql, answer.Dept) // Use answer.Dept instead of answer.addDept
        .then((result) => {
          console.log(answer.Dept + " has been added to departments!");
          showDepartments();
        })
        .catch((err) => {
          console.error(err);
        });
    });
};

//Creating a function to add roles
addRole = () => {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "Please enter the role you would like to add",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role.");
            return false;
          }
        },
      },
      {
        name: "salary",
        type: "input",
        message: "What is the annual salary for this job?",
        validate: (addSalary) => {
          if (isNaN(addSalary)) {

            return false;
          } else {
            console.log("Please enter a valid salary.");
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.role, answer.salary];

      const roleSql = `SELECT name, id FROM department`;

    connection.promise()
        .query(roleSql)
        .then(([rows, fields]) => {
          const dept = rows.map(({ name, id }) => ({ name: name, value: id }));

          inquirer
            .prompt([
              {
                name: "dept",
                type: "list",
                message: "What department does this role belong to?",
                choices: dept,
              },
            ])
            .then((deptChoice) => {
              const dept = deptChoice.dept;
              params.push(dept);

              const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

              connection.promise()
                .execute(sql, params)
                .then(([rows, fields]) => {
                  console.log(answer.role + " has been added to roles!");

                  showRoles();
                })
                .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
    });
};

// Creating a function to add employees
addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
        validate: (addFirstName) => {
          if (addFirstName) {
            return true;
          } else {
            console.log("Please enter a first name.");
            return false;
          }
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
        validate: (addLastName) => {
          if (addLastName) {
            return true;
          } else {
            console.log("Please enter a last name.");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];
      const roleSql = `SELECT roles.id, roles.title FROM roles`;

      connection.promise()
        .query(roleSql)
        .then(([data, fields]) => {
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              const managerSql = `SELECT * FROM employee`;

              connection.promise()
                .query(managerSql)
                .then(([data, fields]) => {
                  const managers = data.map(
                    ({ id, first_name, last_name }) => ({
                      name: first_name + " " + last_name,
                      value: id,
                    })
                  );
                  managers.push({ name: "No manager", value: null });

                  inquirer
                    .prompt([
                      {
                        name: "manager",
                        type: "list",
                        message: "Does the employee have a manager?",
                        choices: managers,
                      },
                    ])
                    .then((managerChoice) => {
                      const manager = managerChoice.manager;
                      params.push(manager);

                      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                    connection.promise()
                        .query(sql, params)
                        .then(([result, fields]) => {
                          console.log("The employee has been added!");
                          showEmployees();
                        })
                        .catch((err) => console.error(err));
                    });
                })
                .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
    });
};

// Creatig an function to updateEmployee
updateEmployeeRole = () => {
  const employeeSql = `SELECT * FROM employee`;

  connection.promise()
    .query(employeeSql)
    .then(([data]) => {
      const employees = data.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            name: "name",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees,
          },
        ])
        .then((employeeChoice) => {
          const employee = employeeChoice.name;
          const params = [];
          params.push(employee);

          const roleSql = `SELECT * FROM roles`;

          connection.promise()
            .query(roleSql)
            .then(([data]) => {
              const roles = data.map(({ id, title }) => ({
                name: title,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    name: "role",
                    type: "list",
                    message: "What is the employee's new role?",
                    choices: roles,
                  },
                ])
                .then((roleChoice) => {
                  const role = roleChoice.role;
                  params.push(role);

                  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                  connection.promise()
                    .query(sql, params)
                    .then(() => {
                      console.log("Employee has been updated!");

                      showEmployees();
                    })
                    .catch((err) => {
                      console.error(err);
                      start();
                    });
                })
                .catch((err) => {
                  console.error(err);
                  start();
                });
            })
            .catch((err) => {
              console.error(err);
              start();
            });
        })
        .catch((err) => {
          console.error(err);
          start();
        });
    })
    .catch((err) => {
      console.error(err);
      start();
    });
};
 


start();
        