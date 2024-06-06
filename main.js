#! /usr/bin/env node
import inquirer from "inquirer";
// Define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }
    //  Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    // Method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining a Student_manager class to manage students 
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //   Method to add a new Student 
    add_student(name) {
        let std = new Student(name);
        this.students.push(std);
        console.log(`Student: ${name} added successfully. Student ID:${std.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let std = this.find_student(student_id);
        if (std) {
            std.enroll_course(course);
            console.log(`${std.name} enrolled in ${course} successfully`);
        }
    }
    // Method to view a student balance
    view_student_balance(std_id) {
        let std = this.find_student(std_id);
        if (std) {
            std.view_balance();
        }
        else {
            console.log("Student not found. please enter a valid Student ID");
        }
    }
    // Method to pay student fees
    pay_student_fees(std_id, amount) {
        let std = this.find_student(std_id);
        if (std) {
            std.pay_fees(amount);
        }
        else {
            console.log("Student not found. please enter a valid Student ID");
        }
    }
    // Method to display student status
    show_student_status(std_id) {
        let std = this.find_student(std_id);
        if (std) {
            std.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(stud => stud.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log("=========>>> Welcome to 'CodeWithFajur'  - Student Management System <<<=========");
    console.log("-".repeat(81));
    let studen_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    }
                ]);
                studen_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                studen_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studen_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                studen_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                studen_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// CALLING A MAIN FUNCTION
main();
