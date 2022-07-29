let jsonApp = angular.module("jsonApp", []);
const wines = new Map();
const beers = new Map();
const spirits = new Map();
const sakes = new Map();
const maxItems = 50;
var paginationNumber = 0;

jsonApp.controller("loadData",($http, $rootScope)=>{
    $http.get("./assets/files/products.json").then(
        (products)=>{
            //Populate wines array
            products.data.wines.forEach((wine)=>{
                wines.set(wine.id, new Wine(wine.id, wine.name, wine.price, wine.brand, wine.img, wine.description, wine.size, wine.stock, wine.category))
            });

            //Populate Beers array
            products.data.beers.forEach((beer)=>{
                beers.set(beer.id, new Beer(beer.id, beer.name, beer.price, beer.brand, beer.img, beer.description, beer.size, beer.stock, beer.category))
            });

            //Populate spirits array
            products.data.spirits.forEach((spirit)=>{
                spirits.set(spirit.id, new Spirits(spirit.id, spirit.name, spirit.price, spirit.brand, spirit.img, spirit.description, spirit.size, spirit.stock, spirit.category))
            });

            //Populate sakes array
            products.data.sakes.forEach((sake)=>{
                sakes.set(sake.id, new Sake(sake.id, sake.name, sake.price, sake.brand, sake.img, sake.description, sake.size, sake.stock, sake.category))
            });

            //Change Map to array for can display the information on the page.
            $rootScope.updateArray = () =>{
                $rootScope.productsArray = Array.from(wines,([id,product])=>({id,product}));
             }
            $rootScope.updateArray();
            if((wines.size / maxItems) % 1 !== 0){
                paginationNumber = parseInt((wines.size/maxItems) +1);
            }
            $rootScope.paginationNumber = [];

            //put inside the array the total pages for render in HTML
            for(var i =1; i<= paginationNumber; i++){
                $rootScope.paginationNumber.push(i);
            }

        },
        (error)=>{
            console.log(error.statusText)
            alert("An error ocurred to get information from JSON. Error: "+ error.status+" "+error.statusText)
        }
    );

    $rootScope.btnClick = () =>{
        $rootScope.updateArray();
    }
});


jsonApp.controller('showProduct', function($scope, $rootScope){
    $scope.students = $rootScope.mierda;

    $scope.updateArray = () =>{
        $scope.studentsArray = Array.from($scope.students,([name,course])=>({name,course}));
        console.log($scope.studentsArray)
    }
    $scope.updateArray();
    console.log("LLEGO AQUi")
        console.log($rootScope.mierda)
});

//PRODUCT PAGE -- Item.html
let productPage = angular.module("productPage", []);
productPage.run(($http, $rootScope) =>{
    $rootScope.mierda = new Map();
    $http.get("./assets/files/products.json").then(
        (products)=>{
            //Populate wines array
            products.data.wines.forEach((wine)=>{
                wines.set(wine.id, new Wine(wine.id, wine.name, wine.price, wine.brand, wine.img, wine.description, wine.size, wine.stock, wine.category))
            });

            //Populate Beers array
            products.data.beers.forEach((beer)=>{
                beers.set(beer.id, new Beer(beer.id, beer.name, beer.price, beer.brand, beer.img, beer.description, beer.size, beer.stock, beer.category))
            });

            //Populate spirits array
            products.data.spirits.forEach((spirit)=>{
                spirits.set(spirit.id, new Spirits(spirit.id, spirit.name, spirit.price, spirit.brand, spirit.img, spirit.description, spirit.size, spirit.stock, spirit.category))
            });

            //Populate sakes array
            products.data.sakes.forEach((sake)=>{
                sakes.set(sake.id, new Sake(sake.id, sake.name, sake.price, sake.brand, sake.img, sake.description, sake.size, sake.stock, sake.category))
            });


            $rootScope.URLsearch = window.location.search;
            $rootScope.id = $rootScope.URLsearch.split("=");
            $rootScope.product = wines.get($rootScope.id[1].toString());
            console.log($rootScope.product)

        },
        (error)=>{
            console.log(error.statusText)
            alert("An error ocurred to get information from JSON. Error: "+ error.status+" "+error.statusText)
        }
    );
});
// -- END PRODUCT PAGE