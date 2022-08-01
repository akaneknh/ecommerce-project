/**
 * User father class
 * @author Jose Luis CG
 * @version 1.0
 */
 class User {
    userID;
    firstName;
    lastName;
    bornDate;
    country;
    address;
    email;
    phoneNumber;
    creditCard;
    expiryDate;

    /**
     * @param userID {number} User ID
     * @param firstName {String} User First Name
     * @param lastName {String} User Last Name
     * @param bornDate {Date} User date
     * @param country {String} User Country
     * @param address {String} User Address Ej: 500 Pacific Street, Vancouver, BC, V67 683
     * @param email {String} User email
     * @param phoneNumber {String} User phone number
     * @param creditCard {String} User credit Card
     * @param expiryDate {String} User credit Card expiry date
     */
    constructor(userID, firstName, lastName, bornDate, country, address, email, phoneNumber, creditCard, expiryDate) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bornDate = bornDate;
        this.country = country;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.creditCard = creditCard;
        this.expiryDate = expiryDate;
    }

    //METHODS //

    /**
     * @return {string} return Full User name (First Name Last Name)
     */
    fullName() {
        return this.firstName + " " + this.lastName;
    }
}