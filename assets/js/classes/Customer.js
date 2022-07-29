/**
 * Customer class
 * @author Jose Luis CG
 * @version 1.0
 */
class Customer extends User {
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
        super(userID, firstName, lastName, bornDate, country, address, email, phoneNumber);
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
        age = today.getFullYear() - this.bornDate.getFullYear();
        month = today.getMonth() - this.bornDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < this.bornDate.getDate())) {
            age--;
        }
        return age;
    }

    /** Returns
     * This method check if the customer is bigger than 18
     * @return {boolean}
     */
    isOlder() {
        return this.getAge() >= 18;
    }
}