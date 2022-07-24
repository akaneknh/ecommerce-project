/**
 * Spirits class
 * @author Jose Luis CG
 * @version 1.0
 * @extends Product
 */

class Spirits extends Product{
    /**
     * @constructor
     * @param productID {number}
     * @param productName {String}
     * @param productPrice {float}
     * @param productBrand {String}
     * @param productImage {String}
     * @param productDescription {String}
     * @param category {String}
     * @param productSize {String}
     * @param stock {number}
     */
    constructor(productID, productName, productPrice, productBrand, productImage, productDescription, productSize, stock, category) {
        super(productID, productName, productPrice, productBrand, productImage, productDescription, productSize, stock, category);
    }
}