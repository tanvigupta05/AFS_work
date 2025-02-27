interface User{
    username:string,
    age:number
}
let user:User={
    username:"Nitesh",
    age:23
}
//console.log(user.username)
// user.age= "45"
user.age=45

let num:number[]=[1,2]

num[3]=45

let numstr:(number | string)[]=[1,2,"hi"];
numstr[2]= "10"
//console.log(numstr[2])

interface Emp{
    id:number,
    ename:string,
    salary:number,
    dep:string,
    getName():string
}

interface emp2{
    id:number,
    ename:string,
    salary:number,
    dep:string,
    getSal():number
}

let emp:Emp ={
    id:1,
    ename:"ritik",
    salary:20000,
    dep:"IT",
    getName:function(){
        return this.ename
    },
}
console.log(emp.getName())

let emp2:emp2 ={
    id:1,
    ename:"tanvi",
    salary:70000,
    dep:"IT",
    getSal:function(){
        return this.salary
    },
}
console.log(emp2.getSal())

function empname(em:Emp){
    return em.getName()
}

console.log(empname(emp))

//array of objects

//let employe: Emp[]=[]



