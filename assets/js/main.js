let jsonApp = angular.module("jsonApp", ["ngRoute"]);
const wines = new Map();
const beers = new Map();
const spirits = new Map();
const sakes = new Map();
var ShopingCart = new ShoppingCart();
const totalProducts = new Map();
const maxItems = 16;
var paginationNumber = 0;
const tax = 10;
const shipping = 5;
var numberS = 0;
var pagItem = 0;
var oldP = 0;

document.getElementById("test").addEventListener('click', event => {
    event.preventDefault();
    if(ShopingCart.getTotalItems() !== 0){
        window.location.href = "#!cart"
    } else {
        swal(
            "Your Shopping Cart is empty",
            "",
            "warning"
        );
    }
});

//NG ROUTES
jsonApp.config(function ($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl:"./allProducts.html"
        })
        .when("/wine",{
            templateUrl:"./wine.html"
        })
        .when("/sake",{
            templateUrl:"./sake.html"
        })
        .when("/beer",{
            templateUrl:"./beer.html"
        })
        .when("/other",{
            templateUrl:"./other.html"
        })
        .when("/item",{
            templateUrl:"./item.html"
        })
        .when("/login",{
            templateUrl:"./login.html"
        })
        .when("/order",{
            templateUrl:"./order.html"
        })
        .when("/order-complete",{
                templateUrl:"./order-complete.html"
        })
        .when("/cart",{
            templateUrl:"./cart.html"
        })
        .when("/privacy",{
            templateUrl:"./privacyPolicy.html"
        })
});

//Get the elements from the JSON file
jsonApp.run(($http, $rootScope)=>{

    $rootScope.cartItems = 0;
    $http.get("./assets/files/products.json").then(
        (products)=>{
            $rootScope.id;
            //Populate wines array
            products.data.wines.forEach((wine)=>{
                wines.set(wine.id, new Wine(wine.id, wine.name, wine.price, wine.brand, wine.img, wine.description, wine.size, wine.stock, wine.category))
                totalProducts.set(wine.id, new Wine(wine.id, wine.name, wine.price, wine.brand, wine.img, wine.description, wine.size, wine.stock, wine.category))
                $rootScope.id = parseInt(wine.id);
            });

            //Populate Beers array
            products.data.beers.forEach((beer)=>{
                $rootScope.id += 1;
                beers.set(beer.id, new Beer(beer.id, beer.name, beer.price, beer.brand, beer.img, beer.description, beer.size, beer.stock, beer.category))
                totalProducts.set($rootScope.id, new Beer(beer.id, beer.name, beer.price, beer.brand, beer.img, beer.description, beer.size, beer.stock, beer.category))

            });

            //Populate spirits array
            products.data.spirits.forEach((spirit)=>{
                $rootScope.id += 1;
                spirits.set(spirit.id, new Spirits(spirit.id, spirit.name, spirit.price, spirit.brand, spirit.img, spirit.description, spirit.size, spirit.stock, spirit.category))
                totalProducts.set($rootScope.id, new Spirits(spirit.id, spirit.name, spirit.price, spirit.brand, spirit.img, spirit.description, spirit.size, spirit.stock, spirit.category))

            });

            //Populate sakes array
            products.data.sakes.forEach((sake)=>{
                sakes.set(sake.id, new Sake(sake.id, sake.name, sake.price, sake.brand, sake.img, sake.description, sake.size, sake.stock, sake.category))
            });

             window.location.href = "#!";

        },
        (error)=>{
            console.log(error.statusText)
            alert("An error ocurred to get information from JSON. Error: "+ error.status+" "+error.statusText)
        }
    );
});

jsonApp.controller('allProducts',($scope,$rootScope, $location)=>{
    $rootScope.logoutBtn = () => {
        sessionStorage.removeItem("userInfo");
        $rootScope.customerLog = null;
        $rootScope.loginView = true;
        $rootScope.toggleIn = true;
        $rootScope.toggleOut = false;
        $rootScope.email = "";
        $scope.password = "";
    };

    if(JSON.parse(localStorage.getItem("ShopingCart"))){
        ShopingCart.products.clear();

        $scope.shopC = JSON.parse(localStorage.getItem("ShopingCart")).products;
        $scope.shopC.forEach(function(product){
            ShopingCart.products.set(new Product(product[0].productID, product[0].productName, product[0].productPrice, product[0].productBrand, product[0].productImage ,product[0].productDescription ,product[0].productSize, product[0].stock, product[0].category), product[1])
        })
        $rootScope.cartItems = ShopingCart.getTotalItems();
    }

    if(sessionStorage.getItem("userInfo")){
        var customer = JSON.parse(sessionStorage.getItem("userInfo"))
        $rootScope.customerLog = new Customer(
            customer.userID,
            customer.firstName,
            customer.lastName,
            customer.bornDate,
            customer.country,
            customer.address,
            customer.email,
            customer.phoneNumber,
            customer.creditCard,
            customer.expiryDate
        );
         $rootScope.toggleIn = false;
        $rootScope.toggleOut = true;
    }
        $scope.productsArray = [];
        $scope.paginationNumber = [];
        //Change Map to array for can display the information on the page.
        $scope.productsArray = updateArray(totalProducts);

        if((sakes.size/maxItems)% 1 !== 0){
            paginationNumber =  parseInt((totalProducts.size/maxItems)+1) ;
        } else {
            paginationNumber = parseInt((totalProducts.size/maxItems));
        }
        //put inside the array the total pages for render in HTML
        for(var i =1; i<= paginationNumber; i++){
            $scope.paginationNumber.push(i);
        }
        $scope.pageSize = 5;
        $scope.actualPage = 0;
        $scope.elementsPerPage = maxItems;
        $scope.pagItem = 0;
    //Pagination element
        $scope.btnClick = ($event, number) =>{

            if($event.target.innerText % 10 === 0){
                $scope.pagItem +=10;
                setTimeout(function (){
                    document.querySelectorAll(".btn-pag")[0].classList.add("active");
                }, 100);
            } else if($event.target.innerText.length >= 2 && $event.target.innerText.charAt($event.target.innerText.length-1) == 1){
                $scope.pagItem -=10;

                setTimeout(function (){
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[9].classList.add("active");
                }, 100);
            }

            if($event.target.id == "back" || $event.target.id == "next"){
                $scope.number = parseInt(document.querySelector(".active").innerText) - 1;

                if($event.target.id == "back" ){
                    if($scope.number != 0){
                        oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                        document.querySelector(".active").classList.remove("active");
                        document.querySelectorAll(".btn-pag")[parseInt(oldP) -1].classList.add("active");
                        $scope.actualPage -= 16;
                    }
                } else {
                    if($scope.number != document.querySelectorAll(".btn-pag").length-1){
                        oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                        document.querySelector(".active").classList.remove("active");
                        document.querySelectorAll(".btn-pag")[parseInt(oldP) +1].classList.add("active");
                        $scope.actualPage += 16;
                    }
                }

            } else {
                document.querySelectorAll(".btn-pag").forEach((element)=>{
                    element.classList.remove("active");
                })
                $event.target.className += " active";
                $scope.actualPage = maxItems*number -16;
            }

        }
 });

//This controller is for show the ShoppingCart to the
jsonApp.controller('cartCtrl',($scope,$rootScope, $location)=>{
        $scope.older = true;
        $rootScope.noLogin = true;
    if(ShopingCart.getTotalItems() === 0){
        window.location.href = "#!";
    }else if($rootScope.customerLog != undefined){
        console.log("entre joder")
        $scope.customer = new Customer($rootScope.customerLog.userID, $rootScope.customerLog.firstName, $rootScope.customerLog.lastName,$rootScope.customerLog.bornDate, $rootScope.customerLog.country,$rootScope.customerLog.address, $rootScope.customerLog.email, $rootScope.customerLog.phoneNumber, $rootScope.customerLog.creditCard, $rootScope.customerLog.expiryDate)
        if(!$scope.customer.isOlder()){
            swal(
                "You are under 19 years old",
                "You can look around the mall, but remember can't check out anything!",
                "warning"
            );
            $scope.older = false;
        }
    }
    $rootScope.shopingCart = ShopingCart;
    $scope.products = updateArray(ShopingCart.products)
    console.log($scope.products);

    $scope.btnCheckout = function(ev) {
        if(sessionStorage.getItem("userInfo")){
            window.location.href ="#!order";
        } else {
            $rootScope.noLogin = false;
            window.location.href ="#!login";

        }
    }

    $scope.btnAddProduct = (product, quantity)=>{

        if(quantity == -1){
            ShopingCart.withoutProduct(product.id);
            $rootScope.shopingCart = ShopingCart;
            $rootScope.cartItems = ShopingCart.getTotalItems();
            window.location.href = "#!cart";
        } else {
            ShopingCart.addProducts(product.id, parseInt(quantity));
            $rootScope.shopingCart = ShopingCart;
            $rootScope.cartItems = ShopingCart.getTotalItems();
            window.location.href = "#!cart";
        }

        localStorage.setItem("ShopingCart", JSON.stringify({user:ShopingCart.User, products: Array.from(ShopingCart.products)}));
    }
});


jsonApp.controller('wines',($scope,$rootScope, $location)=>{
    $scope.productsArray = [];
    $scope.paginationNumber = [];
    //Change Map to array for can display the information on the page.
    $scope.productsArray = updateArray(wines);
    if((sakes.size/maxItems)% 1 !== 0){
        paginationNumber =  parseInt((wines.size/maxItems)+1) ;
    } else {
        paginationNumber = parseInt((wines.size/maxItems));
    }
    //put inside the array the total pages for render in HTML
    for(var i =1; i<= paginationNumber; i++){
        $scope.paginationNumber.push(i);
    }
    $scope.pageSize = 5;
    $scope.actualPage = 0;
    $scope.elementsPerPage = maxItems;
    $scope.pagItem = 0;

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        if($event.target.innerText % 10 === 0){
            $scope.pagItem +=10;
            setTimeout(function (){
                document.querySelectorAll(".btn-pag")[0].classList.add("active");
            }, 100);
        } else if($event.target.innerText.length >= 2 && $event.target.innerText.charAt($event.target.innerText.length-1) == 1){
            $scope.pagItem -=10;

            setTimeout(function (){
                document.querySelector(".active").classList.remove("active");
                document.querySelectorAll(".btn-pag")[9].classList.add("active");
            }, 100);
        }
        if($event.target.id == "back" || $event.target.id == "next"){
            $scope.number = parseInt(document.querySelector(".active").innerText) - 1;
            if($event.target.id == "back" ){
                if($scope.number != 0){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) -1].classList.add("active");
                    $scope.actualPage -= 16;
                }
            } else {
                if($scope.number != document.querySelectorAll(".btn-pag").length-1){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) +1].classList.add("active");
                    $scope.actualPage += 16;
                }
            }
        } else {
            document.querySelectorAll(".btn-pag").forEach((element)=>{
                element.classList.remove("active");
            })
            $event.target.className += " active";
            $scope.actualPage = maxItems*number -16;
        }

    }
});

jsonApp.controller('sakes',($scope,$rootScope, $location)=>{
    $scope.productsArray = [];
    $scope.paginationNumber = [];
    //Change Map to array for can display the information on the page.
    $scope.productsArray = updateArray(sakes);

    if((sakes.size/maxItems)% 1 !== 0){
        paginationNumber =  parseInt((sakes.size/maxItems)+1) ;
    } else {
        paginationNumber = parseInt((sakes.size/maxItems));
    }

    //put inside the array the total pages for render in HTML
    for(var i =1; i<= paginationNumber; i++){
        $scope.paginationNumber.push(i);
    }
    $scope.actualPage = 0;
    $scope.elementsPerPage = maxItems;

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        if($event.target.innerText % 10 === 0){
            $scope.pagItem +=10;
            setTimeout(function (){
                document.querySelectorAll(".btn-pag")[0].classList.add("active");
            }, 100);
        } else if($event.target.innerText.length >= 2 && $event.target.innerText.charAt($event.target.innerText.length-1) == 1){
            $scope.pagItem -=10;

            setTimeout(function (){
                document.querySelector(".active").classList.remove("active");
                document.querySelectorAll(".btn-pag")[9].classList.add("active");
            }, 100);
        }
        if($event.target.id == "back" || $event.target.id == "next"){
            numberS = parseInt(document.querySelector(".active").innerText) - 1;
            if($event.target.id == "back" ){
                if($scope.number != 0){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) -1].classList.add("active");
                    $scope.actualPage -= 16;
                }
            } else {
                if($scope.number != document.querySelectorAll(".btn-pag").length-1){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) +1].classList.add("active");
                    $scope.actualPage += 16;
                }
            }

        } else {
            document.querySelectorAll(".btn-pag").forEach((element)=>{
                element.classList.remove("active");
            })
            $event.target.className += " active";
            $scope.actualPage = maxItems*number -16;
        }

    }
});

jsonApp.controller('spirits',($scope,$rootScope, $location)=>{
    $scope.productsArray = [];
    $scope.paginationNumber = [];
    //Change Map to array for can display the information on the page.
    $scope.productsArray = updateArray(spirits);
    if((sakes.size/maxItems)% 1 !== 0){
        paginationNumber =  parseInt((spirits.size/maxItems)+1) ;
    } else {
        paginationNumber = parseInt((spirits.size/maxItems));
    }
    //put inside the array the total pages for render in HTML
    for(var i =1; i<= paginationNumber; i++){
        $scope.paginationNumber.push(i);
    }
    $scope.pageSize = 5;
    $scope.actualPage = 0;
    $scope.elementsPerPage = maxItems;
    $scope.pagItem = 0;

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        if($event.target.innerText % 10 === 0){
            $scope.pagItem +=10;
            setTimeout(function (){
                document.querySelectorAll(".btn-pag")[0].classList.add("active");
            }, 100);
        } else if($event.target.innerText.length >= 2 && $event.target.innerText.charAt($event.target.innerText.length-1) == 1){
            $scope.pagItem -=10;

            setTimeout(function (){
                document.querySelector(".active").classList.remove("active");
                document.querySelectorAll(".btn-pag")[9].classList.add("active");
            }, 100);
        }
        if($event.target.id == "back" || $event.target.id == "next"){
            $scope.number = parseInt(document.querySelector(".active").innerText) - 1;
            console.log("Position - "+ $scope.number)
            if($event.target.id == "back" ){
                if($scope.number != 0){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) -1].classList.add("active");
                    $scope.actualPage -= 16;
                }
            } else {
                if($scope.number != document.querySelectorAll(".btn-pag").length-1){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) +1].classList.add("active");
                    $scope.actualPage += 16;
                }
            }

        } else {
            document.querySelectorAll(".btn-pag").forEach((element)=>{
                element.classList.remove("active");
            })
            $event.target.className += " active";
            $scope.actualPage = maxItems*number -16;
        }

    }
});

jsonApp.controller('beers',($scope,$rootScope, $location)=>{
    $scope.productsArray = [];
    $scope.paginationNumber = [];

    //Change Map to array for can display the information on the page.
    $scope.productsArray = updateArray(beers);
    if((sakes.size/maxItems)% 1 !== 0){
        paginationNumber =  parseInt((beers.size/maxItems)+1) ;
    } else {
        paginationNumber = parseInt((beers.size/maxItems));
    }
    //put inside the array the total pages for render in HTML
    for(var i =1; i<= paginationNumber; i++){
        $scope.paginationNumber.push(i);
    }
    $scope.pageSize = 5;
    $scope.actualPage = 0;
    $scope.elementsPerPage = maxItems;
    $scope.pagItem = 0;

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        if($event.target.innerText % 10 === 0){
            $scope.pagItem +=10;
            setTimeout(function (){
                document.querySelectorAll(".btn-pag")[0].classList.add("active");
            }, 100);
        } else if($event.target.innerText.length >= 2 && $event.target.innerText.charAt($event.target.innerText.length-1) == 1){
            $scope.pagItem -=10;

            setTimeout(function (){
                document.querySelector(".active").classList.remove("active");
                document.querySelectorAll(".btn-pag")[9].classList.add("active");
            }, 100);
        }
        if($event.target.id == "back" || $event.target.id == "next"){
            $scope.number = parseInt(document.querySelector(".active").innerText) - 1;
            console.log("Position - "+ $scope.number)
            if($event.target.id == "back" ){
                if($scope.number != 0){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) -1].classList.add("active");
                    $scope.actualPage -= 16;
                }
            } else {
                if($scope.number != document.querySelectorAll(".btn-pag").length-1){
                    oldP = document.querySelectorAll(".active")[0].getAttribute("data-position");
                    document.querySelector(".active").classList.remove("active");
                    document.querySelectorAll(".btn-pag")[parseInt(oldP) +1].classList.add("active");
                    $scope.actualPage += 16;
                }
            }

        } else {
            document.querySelectorAll(".btn-pag").forEach((element)=>{
                element.classList.remove("active");
            })
            $event.target.className += " active";
            $scope.actualPage = maxItems*number -16;
        }

    }
});

/*
This function dipends of the URL path to get a Product ID, Product Category and show the information
 */
jsonApp.controller('itemCtrl',($scope,$rootScope, $location)=>{
    let searchObj = $location.search();
    $scope.products = updateArray(totalProducts);

    if(searchObj.productID !== undefined){
        switch (searchObj.category){
            case "Wine":
                $scope.product = wines.get(searchObj.productID);
                break;
            case "Spirits":
                $scope.product = spirits.get(searchObj.productID);
                break;
            case "Beer":
                $scope.product = beers.get(searchObj.productID);
                break;
            case "Sake":
                $scope.product = sakes.get(searchObj.productID);
                 break;
        }
    }

    $scope.btnAddProduct = (product, quantity)=>{
        console.log(quantity)

        swal({
            position: 'top-end',
            icon: 'success',
            text: 'New product was add in your Shopping Cart: '+product.productName ,
            buttons: false,
            timer: 1000
        })
        if(quantity === undefined){
            ShopingCart.addProducts(product, 1);
        } else {
            ShopingCart.addProducts(product, parseInt(quantity));

        }
        $rootScope.cartItems = ShopingCart.getTotalItems();
        localStorage.setItem("ShopingCart", JSON.stringify({user:ShopingCart.User, products: Array.from(ShopingCart.products)}));
    }

});


/**
 * This function get a object Map and return an array about this object Map
 * @param mapObject {map}
 * @return {array}
 */
function updateArray (mapObject) {
    return Array.from(mapObject,([id,product])=>({id:id,product:product, category:product.constructor.name}));
}

//____ NG ROUTES




