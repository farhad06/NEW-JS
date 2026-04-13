
console.log("--------- This is a class Example ------------");

class User {

    #psw = '12345678';

    #setpsw;

    //constructor
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.phone = null;
    }

    getUser() {
        return `My Name is: ${this.name} and Email is: ${this.email}`;
    }

    //function 
    sayHello() {
        return "This is my Name and Email";
    }

    static dob() {
        return '1998-02-09';
    }

    //setter
    set setphone(number) {
        this.phone = number;
    }

    //getter
    get getphone() {
        return `My Phone Number is: ${this.phone}`
    }

    //show password
    showPsw() {
        return `My Password is: ${this.#psw}`;
    }


    set setPassword(pass) {
        this.#setpsw = pass;
    }

    get getNewPassword() {
        return `New Password is : ${this.#setpsw}`
    }


}


class Joe extends User {

    constructor(name, email) {
        super(name, email);
    }

    getJoeName() {
        return `Extends User name is: ${this.name}`;
    }
}

const user = new User('Joe Doe', 'joe@example.com');

const joe = new Joe("NEW",'new@gmail.com');

console.log(joe.getJoeName());


console.log(user.getUser());
console.log(user.sayHello());

console.log("----- GETTER VALUE -----");

user.setphone = "9898787676";

console.log(user.getphone);

console.log(User.dob());


console.log(user.showPsw());


user.setPassword = 'Pass@123456';
console.log(user.getNewPassword);




