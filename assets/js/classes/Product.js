/**
 * Product father class
 * @author Jose Luis CG
 * @version 1.0
 */
class Product{
    #productID;
    #productName;
    #productPrice;
    #productBrand;
    #productImage;
    #productDescription;
    #productSize;
    #category;
    #stock;

    /**
     * @constructor
     * @param productID {number}
     * @param productName {String}
     * @param productPrice {float}
     * @param productBrand {String}
     * @param productImage {String}
     * @param category {String}
     * @param productDescription {String}
     * @param stock {number}
     * @param productSize {String}
     */
    constructor(productID, productName, productPrice, productBrand, productImage, productDescription, productSize, stock, category) {
        this.#productID = productID;
        this.#productName = productName;
        this.#productPrice = productPrice;
        this.#productBrand = productBrand;
        this.#productImage = productImage;
        this.#productDescription = productDescription;
        this.#productSize = productSize;
        this.#stock = stock;
        this.#category = category;
    }

    //GETTERS AND SETTERS
    /**
     * @returns {number}
     */
    get productID() {
        return this.#productID;
    }

    /**
     * @returns {String}
     */
    get productName() {
        return this.#productName;
    }

    /**
     * @param productName {String}
     */
    set productName(productName) {
        this.#productName = productName;
    }

    /**
     * @returns {float}
     */
    get productPrice() {
        return this.#productPrice;
    }

    /**
     * @param productPrice {float}
     */
    set productPrice(productPrice) {
        this.#productPrice = productPrice;
    }

    /**
     * @return {String}
     */
    get productBrand() {
        return this.#productBrand;
    }

    /**
     * @param productBrand {String}
     */
    set productBrand(productBrand) {
        this.#productBrand = productBrand;
    }

    /**
     * @return {String} get product image url
     */
    get productImage() {
        return this.#productImage;
    }

    /**
     * @param productImage {String}
     */
    set productImage(productImage) {
        this.#productImage = productImage;
    }

    /**
     * @return {String}
     */
    get productDescription() {
        return this.#productDescription;
    }

    /**
     * @param productDescription {String}
     */
    set productDescription(productDescription) {
        this.#productDescription = productDescription;
    }

    /**
     * @return {String}
     */
    get productSize() {
        return this.#productSize;
    }

    /**
     * @param productSize {String}
     */
    set productSize(productSize) {
        this.#productSize = productSize;
    }

    /**
     * @return {number}
     */
    get stock() {
        return this.#stock;
    }

    /**
     * @param stock {number}
     */
    set stock(stock) {
        this.#stock = stock;
    }

    /**
     * @return {String}
     */
    get category() {
        return this.#category;
    }

    /**
     * @param category {String}
     */
    set category(category) {
        this.#category = category;
    }

    //METHODS

    /**
     * This method checks if the product has stock
     * @param number {number} This is the number of the product you want to request
     * @return {boolean}
     */
    checkStock(number){
        return number <= this.#stock;
    }

    /**
     * @param stock {number}
     */
    updateStock(stock) {
        this.#stock += stock;
    }
}