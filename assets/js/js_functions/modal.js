// set cookie to remember when user click Yes or No
let setMainCookie = (CookieName, CookieValue, Exp) => {
  const currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + Exp * 24 * 60 * 60 * 1000);
  let Cookie_Exp = "expires=" + currentTime.toUTCString();
  document.cookie = " " + CookieName + "=" + CookieValue + ";" + Cookie_Exp;
};

// get cookie name 
let getMainCookie = (CookieName) => {
  let cookieKey = CookieName + "=";
  let cookies = decodeURIComponent(document.cookie);
  let cookieArray = cookies.split(";");
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

// alert message if user never visited before
if (getMainCookie("isAdult") === "") {
  swal("Are you over 19 years old ?", {
    buttons: {
      cancel: "No",
      catch: {
        text: "Yes",
        value: "catch",
      },
    },
  })
      .then((value) => {
        switch (value) {

          case "catch":
            setMainCookie("isAdult", 'Y', 4);
            swal("Enjoy Shopping!", "", "success");
            break;

          default:
            setMainCookie("isAdult", 'N', 4);
            swal("Sorry!", "The sale of alcoholic beverages to persons under 19 years of age is prohibited.", "warning");
            break;
        }
      });
}

