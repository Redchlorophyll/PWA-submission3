document.addEventListener("DOMContentLoaded", () => {
  //active sidebar nav
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        //memuat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });


        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
          elm.addEventListener("click", event => {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            const page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          })
        });

      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
    }

    //load page content
    let page = window.location.hash.substr(1);
    if (page == '') page = "beranda";
    loadPage(page);

    function loadPage(page) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          const content = document.querySelector("#body-content");

          if (page === "score") {
            getScore();
          } else if (page === "beranda") {
            getSchedules();
          } else if (page == "bookmark") {
            getSavedSchedules();
          }


          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
          } else if (this.status == 404) {
            content.innerHTML = "<p> halaman tidak ditemukan </p>"
          } else {
            content.innerHTML = "<p> oopsie, halaman tidak bis diakses :( </p>"
          }
        }
      };
      xhttp.open("GET", `pages/${page}.html`, true);
      xhttp.send();
    }
});
