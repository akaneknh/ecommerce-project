/**
 * User father class
 * @author Jose Luis CG
 * @version 1.0
 */
class User{
    #userID;
    #firstName;
    #lastName;
    #bornDate;
    #country;
    #address;
    #email;
    #phoneNumber;

    /**
     * @param userID {number} User ID
     * @param firstName {String} User First Name
     * @param lastName {String} User Last Name
     * @param bornDate {Date} User date
     * @param country {String} User Country
     * @param address {String} User Address Ej: 500 Pacific Street, Vancouver, BC, V67 683
     * @param email {String} User email
     * @param phoneNumber {String} User phone number
     */
    constructor(userID, firstName, lastName, bornDate, country, address, email, phoneNumber) {
        this.#userID = userID;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#bornDate = bornDate;
        this.#country = country;
        this.#address = address;
        this.#email = email;
        this.#phoneNumber = phoneNumber;
    }

    /**
     * @return {number} get user Id
     */
    get userID() {
        return this.#userID;
    }

    /**
     * @return {String} Get user name
     */
    get firstName() {
        return this.#firstName;
    }

    /**
     * @param firstName {String}
     */
    set firstName(firstName) {
        this.#firstName = firstName;
    }

    /**
     * @return {String} get User Last Name
     */
    get lastName() {
        return this.#lastName;
    }

    /**
     * @param lastName {String}
     */
    set lastName(lastName) {
        this.#lastName = lastName;
    }

    /**
     * @return {Date} Get User date
     */
    get bornDate() {
        return this.#bornDate;
    }

    /**
     * @param bornDate {Date}
     */
    set bornDate(bornDate) {
        this.#bornDate = bornDate;
    }

    /**
     * @return {String} get user Country
     */
    get country() {
        return this.#country;
    }

    /**
     * @param country {String}
     */
    set country(country) {
        this.#country = country;
    }

    /**
     * @return {String} get user full Address
     */
    get address() {
        return this.#address;
    }

    /**
     * @param address {String}
     */
    set address(address) {
        this.#address = address;
    }

    /**
     * @return {String} get User email
     */
    get email() {
        return this.#email;
    }

    /**
     * @param email {String}
     */
    set email(email) {
        this.#email = email;
    }

    /**
     * @return {String} get User phone
     */
    get phoneNumber() {
        return this.#phoneNumber;
    }

    /**
     * @param phoneNumber {String}
     */
    set phoneNumber(phoneNumber) {
        this.#phoneNumber = phoneNumber;
    }

    //METHODS //

    /**
     * @return {string} return Full User name (First Name Last Name)
     */
    fullName(){
        return this.firstName +" "+ this.lastName;
    }
}