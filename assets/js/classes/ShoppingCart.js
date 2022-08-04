/**
 * Shopping Cart class
 * @author Jose Luis CG
 * @version 1.0
 */
class ShoppingCart{
    User;
    products = new Map();

    /**
     *
     * @param User {User} User object
     * @param products {Map}
     */
    constructor(User, products = "") {
        this.User = User;
        if(products !== ""){
            this.products = products;
        }
    }


    //METHODS

    /**
     * @param product {Product}
     * @param quantity {number}
     * @throws Not a number and less than 0
     * @return boolean
     */
     addProducts(product, quantity = 1) {
        try{
           if(isNaN(quantity)) throw new Error("The Quantity is not a number");
           if(quantity <= 0) throw new Error("The Quantity less than 0");
           if(this.products.has(product)){
               if(product.checkStock(quantity)){
                   product.updateStock(-quantity);
                   this.products.set(product, this.products.get(product) + quantity);
               } else {
                   throw new Error("You cannot add more of "+product.productName+" because it does not have enough stock");
               }
           } else {
               if(product.checkStock(quantity)){
                   product.updateStock(-quantity);
                   this.products.set(product, quantity);
               } else {
                   throw new Error("You cannot add more of "+product.productName+" because it does not have enough stock");
               }
           }
           return true;
       } catch(err){
           console.error(err);
           return false;
       }
    }

    /**
     * This function need the product and quantity for less on the map object
     * And if the quantity is <= than 0 the element is deleted. form the map
     * @param product {Product}
     * @param quantity {number}
     * @throws Not a number and less than 0
     */
     withoutProduct(product, quantity = 1) {
        try{
            if(isNaN(quantity)) throw new Error("The Quantity is not a number");
            if(quantity <= 0) throw new Error("The Quantity less than 0");
            if(!this.products.has(product)) throw new Error("The product doesn't exist on the Map");
            if(this.products.get(product) - quantity <= 0 || !this.products.has(product)){
                product.updateStock(quantity);
                this.products.delete(product);
            } else {
                product.updateStock(quantity);
                this.products.set(product, this.products.get(product) - quantity);
            }
            return true;
        } catch(err){
            console.error(err);
            return false;
        }
    }

    /**
     * This method get the total price of the Shopping Cart
     * @return {number}
     */
     getTotalPrice(){
        let totalPrice = 0;

        if(this.products.size === 0){
            return totalPrice.toFixed(2);
        } else {
            for (var [Product, quantity] of this.products) {
                totalPrice += parseFloat(Product.productPrice * quantity);
            }
        }
        return totalPrice.toFixed(2);
    }

    /**
     * This method get the total products of the Shopping Cart
     * @return {number}
     */
    getTotalItems(){
         return this.products.size;
    }

    saveInLocalStorage(){
         localStorage.setItem()
    }
}