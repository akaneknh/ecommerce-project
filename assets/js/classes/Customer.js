/**
 * Customer class
 * @author Jose Luis CG and April
 * @version 1.1
 */
class Customer extends User {
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
        super(userID, firstName, lastName, bornDate, country, address, email, phoneNumber);
        this.creditCard = creditCard;
        this.expiryDate = expiryDate;
    }

    //METHODS
    /** Returns
     * This method get customer age
     * @return {number}
     */
    getAge() {
        let today = new Date();
        let age = 0;
        let month = 0;
        age = today.getFullYear() - this.bornDate.split('/')[2];
        month = today.getMonth() - this.bornDate.split('/')[0];

        if (month < 0 || (month === 0 && today.getDate() < this.bornDate.split('/')[1])) {
            age--;
        }
        return age;
    }

    /** Returns
     * This method check if the customer is bigger than 18
     * @return {boolean}
     */
    isOlder() {
        return this.getAge() >= 19;
    }
}