"use strict";
let user = {
    username: "Nitesh",
    age: 23
};
//console.log(user.username)
// user.age= "45"
user.age = 45;
let num = [1, 2];
num[3] = 45;
let numstr = [1, 2, "hi"];
numstr[2] = "10";
let emp = {
    id: 1,
    ename: "ritik",
    salary: 20000,
    dep: "IT",
    getName: function () {
        return this.ename;
    },
};
console.log(emp.getName());
let emp2 = {
    id: 1,
    ename: "tanvi",
    salary: 70000,
    dep: "IT",
    getSal: function () {
        return this.salary;
    },
};
console.log(emp2.getSal());
function empname(em) {
    return em.getName();
}
empname(emp);
//array of objects
