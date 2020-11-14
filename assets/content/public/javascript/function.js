$(function () {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "500",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
});

/* /////////////////////////////
 * SISTEMA JS ( BOTÃO - CLICK )
 //////////////////////////// */
function goTo(str, boolean) {
  if (boolean) {
    return window.open(str, "_blank");
  }
  window.location.href = str;
}

/* ---------
   CLASS
--------- */
// profile
var pContainer = document.querySelector(".profile");
var pAvatar = document.querySelector(".profile .avatar");
var pContent = document.querySelector(".profile .content");
var pFooter = document.querySelector(".profile .footer");

// form
var fButton = document.querySelector(".form button");
var fInput = document.querySelector(".form input");

/* ---------
  EXECUTION
--------- */
function gitHub(username) {
  axios
    .get("https://api.github.com/users/" + username)
    .then(function (response) {
      if (response.data.name != null) {
        function redenrizar() {
            toastr["success"](
            "The user <strong>" +
              response.data.name +
              "</strong> was found! Listing information...",
            "SUCESSO"
          );

          // - limpar tudo
          pContent.innerHTML = "";
          pAvatar.innerHTML = "";

          // - profile + hr
          var lHR = document.createElement("hr");

          // - profile + avatar
          var aPerfilImg = document.createElement("img");
          aPerfilImg.setAttribute("src", response.data.avatar_url);

          // - profile + name
          var pC_Name = document.createElement("span");
          pC_Name.classList.add("name");
          var pP_Name = document.createTextNode(response.data.name);

          // - profile + biography
          var pC_Biography = document.createElement("span");
          pC_Biography.classList.add("biography");
          var pP_Biography = document.createTextNode(response.data.bio);

          // - profile + followers
          var pC_Followers = document.createElement("em");
          pC_Followers.classList.add("followers");
          var pP_Followers = document.createTextNode(
            "Followers: " + response.data.followers
          );

          // - profile + repositories
          var pC_Repositories = document.createElement("em");
          pC_Repositories.classList.add("repositories");
          var pP_Public_Repositories = document.createTextNode(
            "Public Repositories: " + response.data.public_repos
          );

          // - profile + website
          var pC_Website = document.createElement("em");
          pC_Website.classList.add("website");
          var pP_Website = document.createTextNode(
            "Website: " + response.data.blog
          );

          // - profile + link
          var cProfile = document.createElement("button");
          var kPerfil = cProfile.setAttribute(
            "onclick",
            'window.open("' + response.data.html_url + '")'
          );
          var aPerfil = document.createTextNode("access github");

          pContainer.classList.add("visible");

          /*
            AVATAR
          */
          pAvatar.appendChild(aPerfilImg);

          /*
            CONTENT
          */
          // - name
          pContent.appendChild(pC_Name);
          pC_Name.appendChild(pP_Name);

          // - biography
          pContent.appendChild(pC_Biography);
          pC_Biography.appendChild(pP_Biography);

          // - hr
          pContent.appendChild(lHR);

          // - followers
          pContent.appendChild(pC_Followers);
          pC_Followers.appendChild(pP_Followers);

          // - repositories
          pContent.appendChild(pC_Repositories);
          pC_Repositories.appendChild(pP_Public_Repositories);

          // - website
          pContent.appendChild(pC_Website);
          pC_Website.appendChild(pP_Website);

          /*
            FOOTER
          */
          // - profile
          pFooter.appendChild(cProfile);
          cProfile.appendChild(aPerfil);
        }

        setTimeout(function () {
          return redenrizar();
        }, 1800);
      } else {
        toastr["error"](
          "Sorry, but no data was found for this user.",
          "ERRO"
        );
      }
    })
    .catch(function (error) {
      toastr["error"]("Enter a valid user.", "ERRO");
    });
}

/* ------------------------- 
  PREPARATION TO EXECUTE
------------------------- */
// - PPE + function
function username() {
  var username = fInput.value;

  if (username.length > 3) {
    fInput.value = "";
    gitHub(username);

    toastr["info"]("Searching...", "INFORMAÇÃO");
  } else {
    toastr["error"]("Enter a user with more than 3 characters.", "ERRO");
  }
}
// - PPE + button
fButton.onclick = username;
