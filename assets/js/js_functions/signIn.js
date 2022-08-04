//let myApp = angular.module("myApp", []);

// when load the signIn page first,
jsonApp.run(($rootScope, $http, $location) => {
  $rootScope.loginView = true;
  $rootScope.toggleIn = true;
  $rootScope.toggleOut = false;

  // get the cookie to 'remember me' function
  $rootScope.getCookie = (CookieName) => {
    let cookieKey = CookieName + "=";
    let cookies = decodeURIComponent(document.cookie);
    let cookieArray = cookies.split(";");
    console.log(cookieArray);
    for (let cookie of cookieArray) {
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieKey) == 0) {
        return cookie.substring(cookieKey.length);
      }
    }
    return "";
  };

  // set the cookie in cookies
  $rootScope.setCookie = (CookieName, CookieValue, Exp) => {
    const currentTime = new Date();
    currentTime.setTime(currentTime.getTime() + Exp * 24 * 60 * 60 * 1000);
    let Cookie_Exp = "expires=" + currentTime.toUTCString();
    document.cookie = " " + CookieName + "=" + CookieValue + ";" + Cookie_Exp;
  };

  // check emailCookie if existed or not in cookie,
  // if existed, set emailCookie in input box
  // (for remember me)
  $rootScope.emailCookieChecker = () => {
    let email = $rootScope.getCookie("email");
     //console.log('cookie value : ' + email);
    if (email != "") {
      $rootScope.email = email;

      let checkBox = document.getElementsByTagName("input")[2];
      checkBox.checked = true;
    }
  };



  // read and load the user.json file
  $http.get("./assets/files/user.json").then((res) => {
    $rootScope.data = res.data;
  });
});

jsonApp.controller("Ctrl", ($scope, $rootScope) => {
  let emailInput = document.getElementsByTagName("input")[0];
  let checkBox = document.getElementsByTagName("input")[2];
  $rootScope.emailCookieChecker();

  // Function for compare and check if input value is matched with json file
  $rootScope.signInChecker = (data, email, password) => {
    for (let obj of data) {
      if (obj.email == email && obj.password == password) {
        console.log("Login success!");
        return obj;
      }
    }
    return false;
  };

  // function for storing userInfo in class and session
  $rootScope.sessionStorage = (loginData) => {
    const newUser = new Customer(
        loginData.userID,
        loginData.firstName,
        loginData.lastName,
        loginData.bornDate,
        loginData.country,
        loginData.address,
        loginData.email,
        loginData.phoneNumber,
        loginData.creditCard,
        loginData.expiryDate
    );
    // console.log(newUser);
    sessionStorage.setItem("userInfo", JSON.stringify(newUser));

    // alert message after user sign in if they are under 19
   /* if (!newUser.isOlder()) {
      swal(
          "You are under 19 years old",
          "You can look around the mall, but remember can't check out anything!",
          "warning"
      );
    }*/
  };

  // When you click the SignIn Btn, function's gonna do
  $scope.loginBtn = () => {
    $rootScope.wrongInfo = false;
    // check input box if it has value or not
    if ($scope.email !== "" && $scope.password !== "") {
      // console.log($scope.email);
      let resultLoginData = $rootScope.signInChecker(
          $rootScope.data,
          $scope.email,
          $scope.password
      );

      // Store the userInfo in session if matched
      if (resultLoginData) {
        $rootScope.sessionStorage(resultLoginData);
        $rootScope.getUserInfo();

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

        if($rootScope.noLogin){
          window.location.href = "#!";
        } else {
          $rootScope.noLogin = true;
          window.location.href = "#!cart";
        }

        $rootScope.toggleIn = false;
        $rootScope.toggleOut = true;
        $rootScope.loginView = false;

        // if checkbox was checked status, setCookie (for remember me)
        if (checkBox.checked) {
          $rootScope.setCookie("email", emailInput.value, 4);
          // if unchecked, delete a cookie using max-age attr
        } else {
          document.cookie = "email" + "=; Max-Age=0";
        }

        // if not matched, display wrongInfo sign
      } else {
        console.log("failed login");
        $rootScope.wrongInfo = true;
      }
    }
  };

  // When you click the logoutBtn,
  $rootScope.logoutBtn = () => {
    sessionStorage.removeItem("userInfo");
    $rootScope.customerLog = null;
    $rootScope.loginView = true;
    $rootScope.toggleIn = true;
    $rootScope.toggleOut = false;
    $rootScope.email = "";
    $scope.password = "";
  };

  // display userInfo on checkout page
  $rootScope.getUserInfo = () => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);

      $rootScope.fullName = user.firstName + " " + user.lastName;
      $rootScope.address = user.address;
      $rootScope.creditCard = user.creditCard;
      $rootScope.expiryDate = user.expiryDate;
    }
  };
});


//MATT PART
jsonApp.controller("orderCtrl", ($scope, $rootScope)=>{
  $rootScope.getUserInfo = () => {

    var userInfo = sessionStorage.getItem("userInfo")
    $scope.shopingCart = ShopingCart;
    $scope.products = updateArray(ShopingCart.products)
    $scope.realPrice = (parseFloat(ShopingCart.getTotalPrice()) + parseFloat(ShopingCart.getTotalPrice() * (tax/100)) + parseFloat(shipping)).toFixed(2);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      $rootScope.fullName = user.firstName + " " + user.lastName;
      $rootScope.address = user.address;
      $rootScope.credit = user.creditCard;
      $rootScope.expi = user.expiryDate;
      $scope.tax = tax;
      $scope.shipping = shipping;
    }
  };
  $rootScope.getUserInfo();

  $scope.btnOrderComplete = () =>{
    ShopingCart = new ShoppingCart();
    $rootScope.cartItems = 0;
    window.location.href='#!order-complete';
    localStorage.removeItem("ShopingCart");
  }

})
