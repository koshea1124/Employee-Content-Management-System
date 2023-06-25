# Employee-Content-Management-System

##  Table of Contents
- [Description](#description)
- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [Contributing](#contributing)
- [Questions](#questions)
- [Credits](#credits)

##  Description
The Employee Content Management System (ECMS) is a command-line application built using Node.js, Inquirer, and MySQL. It provides business owners with a convenient and efficient solution for managing their company's employee database. With ECMS, users can easily view, organize, and update information related to departments, roles, and employees, enabling effective business planning and organization.

This application fulfills the needs of business owners by offering a range of essential features. Upon starting the application, users are presented with a menu of options to choose from. They can view all departments, roles, and employees, add new departments, roles, and employees, as well as update an employee's role.

When viewing departments, ECMS displays a formatted table that showcases department names and their corresponding IDs. Similarly, when viewing roles, users are presented with detailed information, including job titles, role IDs, associated departments, and salaries. For employee data, a formatted table is presented, containing employee IDs, first names, last names, job titles, departments, salaries, and the managers to whom employees report.

Adding a department, role, or employee is intuitive and prompts the user to enter the relevant information, such as department name, role details (name, salary, department), and employee details (first name, last name, role, manager). The entered data is then seamlessly added to the database, ensuring accurate and up-to-date records.

For updating an employee's role, the application guides the user through selecting the employee to be updated and choosing their new role. The information is then updated in the database, maintaining consistency and reflecting any changes made.

Overall, the Employee Content Management System (ECMS) empowers business owners to efficiently manage their employee database through a command-line interface. By providing an array of features, including viewing, adding, and updating information, ECMS streamlines organizational processes, allowing business owners to effectively plan and organize their operations.

##  Overview
### The Challenge
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database.

### User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

##  Technologies
* Node.js
* NPM
* JavaScript
* Inquirer
* MySQL

##  Installation
* In the integrated terminal type npm i to install all depencies
* Type "mysql -u root -p" and enter your mysql password to kick up MySQL
* Type SOURCE db/schema.sql; and SOURCE db/seeds.sql to download the database to your local host
* Quit mysql
* Run the application by typing npm start in your integrated terminal

##  Usage
From the main menu, select your desired option:
* View all departments
* View all roles
* Add a department
* Add a role
* Add an employee
* Add a manager
* Update an employee role

Follow the prompts to add, update, or remove if chosen or simply select from the view list to access your tables.

Each selection, once completed, will bring you back to the main menu. Once your session is complete simply close the terminal.

##  Demonstration
Link to youTube video

##  Contributing
Please reach out via email or thru GitHub if you have any suggestions for imporovement

##  Questions
Please feel free to reach out if you have any questions:
* GitHub UserName: https://github.com/koshea1124
* Email: koshea1980@gmail.com

##  Credits
* [NPM Install](https://docs.npmjs.com/cli/v6/commands/npm-init)
* [NPM Inquirer](https://www.npmjs.com/package/inquirer)
* [Code Academy](https://www.codecademy.com/catalog)
* [Markdown Crash Course Video](https://www.youtube.com/watch?v=HUBNt18RFbo)
* [MDN Docs](https://developer.mozilla.org/en-US/)
* [MySQL](https://developer.mozilla.org/en-US/)

