let jsonApp = angular.module("jsonApp", ["ngRoute"]);
const wines = new Map();
const beers = new Map();
const spirits = new Map();
const sakes = new Map();
const totalProducts = new Map();
const maxItems = 50;
var paginationNumber = 0;



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
});

//Get the elements from the JSON file
jsonApp.run(($http, $rootScope)=>{
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

        },
        (error)=>{
            console.log(error.statusText)
            alert("An error ocurred to get information from JSON. Error: "+ error.status+" "+error.statusText)
        }
    );

});


jsonApp.controller('allProducts',($scope,$rootScope, $location)=>{
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

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        document.querySelectorAll(".btn-pag").forEach((element)=>{
            element.classList.remove("active");
        })
        $event.target.className += " active";
        $scope.actualPage = maxItems*number -50 ;
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

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        document.querySelectorAll(".btn-pag").forEach((element)=>{
            element.classList.remove("active");
        })
        $event.target.className += " active";
        $scope.actualPage = maxItems*number -50 ;
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
        document.querySelectorAll(".btn-pag").forEach((element)=>{
            element.classList.remove("active");
        })
        $event.target.className += " active";
        $scope.actualPage = maxItems*number -50 ;
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

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        document.querySelectorAll(".btn-pag").forEach((element)=>{
            element.classList.remove("active");
        })
        $event.target.className += " active";
        $scope.actualPage = maxItems*number -50 ;
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

    //Pagination element
    $scope.btnClick = ($event, number) =>{
        document.querySelectorAll(".btn-pag").forEach((element)=>{
            element.classList.remove("active");
        })
        $event.target.className += " active";
        $scope.actualPage = maxItems*number -50 ;
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




