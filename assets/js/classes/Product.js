/**
 * Product father class
 * @author Jose Luis CG
 * @version 1.0
 */
class Product{
    productID;
    productName;
    productPrice;
    productBrand;
    productImage;
    productDescription;
    productSize;
    category;
    stock;

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
        this.productID = productID;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productBrand = productBrand;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productSize = productSize;
        this.stock = stock;
        this.category = category;
    }

    //METHODS

    /**
     * This method checks if the product has stock
     * @param number {number} This is the number of the product you want to request
     * @return {boolean}
     */
    checkStock(number){
        return number <= this.stock;
    }

    /**
     * @param stock {number}
     */
    updateStock(stock) {
        this.stock += stock;
    }
}