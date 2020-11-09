const base_url = 'https://api.football-data.org/v2/';

//mengecek apabila response berhasil atau tidak
function status(response) {
  if (response.status !== 200) {
    console.log(`error ${response.status}`);

    return Promise.reject(new Error(response.statusText))
  } else {
      return Promise.resolve(response);
  }
}

//mengubah json menjadi javascript object
function json(response) {
  return response.json();
}

function error(err) {
  console.log(`Error: ${err}`);
}

// fungsi ini digunakan untuk mendapatkan score
function getScore() {
  //mengecek apabila terdapat cache di browser
  if ('caches' in window) {
    //mengambil cache dimana terapat data hasil fetch
    caches.match(base_url + 'matches?status=FINISHED').then(response => {
      if (response) {
        response.json().then(data => {
          let scoresHTML = '';
          //memuat data dari cache dan merendernya
          data.matches.forEach(data => {
            scoresHTML += `
            <!-- card match result START -->
            <div class="card col s12 schedule-card">
                  <div class="row col s12">
                    <div class="col s12">
                      <div cslass="competition center-align">
                        <span>${data.competition.name}</span>
                      </div>
                    </div>
                    <div class="row col s12 m6 home-wrapper">
                      <div class="home-team">
                        <div class="teams center-align">
                          <span>${data.homeTeam.name}</span>
                        </div>
                      </div>
                      <div class="home-score blue-grey darken-3">
                        <div class="score white-text center-align">
                          <span>${data.score.fullTime.homeTeam}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 table home-wrapper">
                      <div class="away-score blue-grey darken-3">
                        <div class="score  white-text center-align">
                          <span>${data.score.fullTime.awayTeam}</span>
                        </div>
                      </div>
                      <div class="away-team">
                        <div class="teams center-align">
                          <span>${data.awayTeam.name}</span>
                        </div>
                      </div>
                    </div>
                    <!--extra -->
                    <div class="row col s12 center-align border-top">
                      <div class="col s4 center-align">
                        <span>${data.homeTeam.name}</span>
                      </div>
                      <div class="col s4 bold center-align">
                        <span>stats</span>
                      </div>
                      <div class="col s4 center-align">
                        <span>${data.awayTeam.name}</span>
                      </div>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.halfTime.homeTeam}</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>halftime</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.fullTime.awayTeam}</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.extraTime.homeTeam || 0}</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>ExtraTime</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.extraTime.awayTeam || 0}</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.fullTime.homeTeam}</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>fulltime</span>
                    </div>
                    <div class="col s4 center-align">
                      <span>${data.score.fullTime.awayTeam}</span>
                    </div>
                    <!--extra end -->
                  </div>
            </div>
            <!-- card match result END -->
            `;
          });
          document.getElementById("score").innerHTML = scoresHTML;
        })
      }
    })
  }

  //memuat data dari API
  fetch(base_url + 'matches?status=FINISHED', {
    headers: {
      'X-Auth-Token': '8465138ab47e446b98a9844d9986b140',
    }
  })
  .then(status)
  .then(json)
  .then(data => {
    console.log(data);
    let scoresHTML = '';

    //meloop data pada array matches
    data.matches.forEach(data => {
      scoresHTML += `
      <!-- card match result START -->
      <div class="card col s12 schedule-card">
            <div class="row col s12">
              <div class="col s12">
                <div cslass="competition center-align">
                  <span>${data.competition.name}</span>
                </div>
              </div>
              <div class="row col s12 m6 home-wrapper">
                <div class="home-team">
                  <div class="teams center-align">
                    <span>${data.homeTeam.name}</span>
                  </div>
                </div>
                <div class="home-score blue-grey darken-3">
                  <div class="score white-text center-align">
                    <span>${data.score.fullTime.homeTeam}</span>
                  </div>
                </div>
              </div>
              <div class="col s12 m6 table home-wrapper">
                <div class="away-score blue-grey darken-3">
                  <div class="score  white-text center-align">
                    <span>${data.score.fullTime.awayTeam}</span>
                  </div>
                </div>
                <div class="away-team">
                  <div class="teams center-align">
                    <span>${data.awayTeam.name}</span>
                  </div>
                </div>
              </div>
              <!--extra -->
              <div class="row col s12 center-align border-top">
                <div class="col s4 center-align">
                  <span>${data.homeTeam.name}</span>
                </div>
                <div class="col s4 bold center-align">
                  <span>stats</span>
                </div>
                <div class="col s4 center-align">
                  <span>${data.awayTeam.name}</span>
                </div>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.halfTime.homeTeam}</span>
              </div>
              <div class="col s4 center-align">
                <span>halftime</span>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.fullTime.awayTeam}</span>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.extraTime.homeTeam || 0}</span>
              </div>
              <div class="col s4 center-align">
                <span>ExtraTime</span>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.extraTime.awayTeam || 0}</span>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.fullTime.homeTeam}</span>
              </div>
              <div class="col s4 center-align">
                <span>fulltime</span>
              </div>
              <div class="col s4 center-align">
                <span>${data.score.fullTime.awayTeam}</span>
              </div>
              <!--extra end -->
            </div>
      </div>
      <!-- card match result END -->
      `;
    });
    //setelah data berhasil di tambahkan.tambahkan ke div container
    document.getElementById("score").innerHTML = scoresHTML;
  })
  .catch(error);
}




//fungsi untuk mendapatkan jadwal pertandingan
function getSchedules() {
  if ('caches' in window) {
    caches.match(base_url + 'matches?status=SCHEDULED').then(response => {
      if (response) {
        response.json().then(data => {
          let schedulesHTML = '';
          //memuat data dari cache
          data.matches.forEach(data => {
            schedulesHTML += `
            <div class="col s12">
              <div class="card white">
                <div class="card-content">
                  <div class="competition center-align">
                    <span>${data.competition.name}</span>
                  </div>

                  <div class="row">
                    <div class="col s12 m5 center-align">
                      <span>${data.homeTeam.name}</span>
                    </div>
                    <div class="col s12 m2 center-align">
                      <span>vs</span>
                    </div>
                    <div class="col s12 m5 center-align">
                      <span>${data.awayTeam.name}</span>
                    </div>
                    <div class="col s12 center-align border-top">
                      <span>${data.utcDate}</span>
                    </div>
                  </div>
                </div>
                <div class="card-action center-align">
                  <a class="waves-effect waves-light blue-grey darken-2  btn" href="./jadwal_view.html?id=${data.id}">Detail</a>
                </div>
              </div>
            </div>
            `;
          });

          document.getElementById("schedule").innerHTML = schedulesHTML;

          })
        }
      })
    }


      //memuat data dari api
      fetch(base_url + 'matches?status=SCHEDULED', {
        headers: {
          'X-Auth-Token': '8465138ab47e446b98a9844d9986b140',
        }
      })
      .then(status)
      .then(json)
      .then(data => {
        console.log(data);
        let schedulesHTML = '';
        data.matches.forEach(data => {
          schedulesHTML += `
          <div class="col s12">
            <div class="card white">
              <div class="card-content">
                <div class="competition center-align">
                  <span>${data.competition.name}</span>
                </div>

                <div class="row">
                  <div class="col s12 m5 center-align">
                    <span>${data.homeTeam.name}</span>
                  </div>
                  <div class="col s12 m2 center-align">
                    <span>vs</span>
                  </div>
                  <div class="col s12 m5 center-align">
                    <span>${data.awayTeam.name}</span>
                  </div>
                  <div class="col s12 center-align border-top">
                    <span>${data.utcDate}</span>
                  </div>
                </div>
              </div>
              <div class="card-action center-align">
                <a class="waves-effect waves-light blue-grey darken-2  btn" href="./jadwal_view.html?id=${data.id}">Detail</a>
              </div>
            </div>
          </div>
          `;
        });
        document.getElementById("schedule").innerHTML = schedulesHTML;
      })
      .catch(error);
}


function getScheduleById() {
  return new Promise((resolve) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${base_url}matches/${idParams}`).then(response => {
        if (response) {
          response.json().then(data => {
            const scheduleHtml = `
            <div class="col s12">
              <div class="card white">
                <div class="card-content">
                  <div class="competition center-align">
                    <span>${data.match.competition.name}</span>
                  </div>

                  <div class="row">
                    <div class="col s12 m5 center-align">
                      <span>${data.match.homeTeam.name}</span>
                    </div>
                    <div class="col s12 m2 center-align">
                      <span>vs</span>
                    </div>
                    <div class="col s12 m5 center-align">
                      <span>${data.match.awayTeam.name}</span>
                    </div>
                    <div class="col s12 center-align border-top">
                      <span>${data.match.utcDate}</span>
                    </div>
                    <!-- siapa tau pengen nambah disini -->
                  </div>
                </div>
              </div>
            </div>
            `;

            document.getElementById("body-content").innerHTML = scheduleHtml;

            resolve(data);
          })
        }
      })
    }

    fetch(`${base_url}matches/${idParams}`, {
      headers: {
        'X-Auth-Token': '8465138ab47e446b98a9844d9986b140',
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);

      const scheduleHtml = `
      <div class="col s12">
        <div class="card white">
          <div class="card-content">
            <div class="competition center-align">
              <span>${data.match.competition.name}</span>
            </div>

            <div class="row">
              <div class="col s12 m5 center-align">
                <span>${data.match.homeTeam.name}</span>
              </div>
              <div class="col s12 m2 center-align">
                <span>vs</span>
              </div>
              <div class="col s12 m5 center-align">
                <span>${data.match.awayTeam.name}</span>
              </div>
              <div class="col s12 center-align border-top">
                <span>${data.match.utcDate}</span>
              </div>
              <!--extra -->
              <div class="col s12 center-align border-top red-text">
                <span>Place</span>
              </div>
              <div class="row col s12 center-align">
                <span>${data.match.venue}</span>
              </div>
              <div class="col s12 center-align red-text">
                <span>Nation</span>
              </div>
              <div class="row col s12 center-align">
                <span>${data.match.competition.area.name}</span>
              </div>
              <!--extra end -->
            </div>
          </div>
        </div>
      </div>
      `;

      document.getElementById("body-content").innerHTML = scheduleHtml;
      resolve(data);
    })
  });
}

function getSavedSchedules() {
  getAll().then(schedules => {
    console.log(schedules);

    let schedulesHTML = '';
    schedules.forEach(data => {
      console.log(data);
      schedulesHTML += `
      <div class="col s12">
        <div class="card white">
          <div class="card-content">
            <div class="competition center-align">
              <span>${data.competition.name}</span>
            </div>

            <div class="row">
              <div class="col s12 m5 center-align">
                <span>${data.homeTeam.name}</span>
              </div>
              <div class="col s12 m2 center-align">
                <span>vs</span>
              </div>
              <div class="col s12 m5 center-align">
                <span>${data.awayTeam.name}</span>
              </div>
              <div class="col s12 center-align border-top">
                <span>${data.utcDate}</span>
              </div>
            </div>
          </div>
          <div class="card-action center-align">
            <a class="waves-effect waves-light btn blue-grey darken-2 " href="./jadwal_view.html?id=${data.id}&saved=true">Detail</a>
          </div>
        </div>
      </div>
      `;

      document.getElementById("body-content").innerHTML = schedulesHTML;
    });
  })
}

function getSavedScheduleById() {
  return new Promise((resolve) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get("id"));

    getById(idParam).then(data => {
      console.log(data)
      let scheduleHtml = '';
      scheduleHtml = `
      <div class="col s12">
        <div class="card white">
          <div class="card-content">
            <div class="competition center-align">
              <span>${data.competition.name}</span>
            </div>

            <div class="row">
              <div class="col s12 m5 center-align">
                <span>${data.homeTeam.name}</span>
              </div>
              <div class="col s12 m2 center-align">
                <span>vs</span>
              </div>
              <div class="col s12 m5 center-align">
                <span>${data.awayTeam.name}</span>
              </div>
              <div class="col s12 center-align border-top">
                <span>${data.utcDate}</span>
              </div>
              <!--extra -->
              <div class="col s12 center-align border-top red-text">
                <span>Place</span>
              </div>
              <div class="row col s12 center-align">
                <span>${data.venue}</span>
              </div>
              <div class="col s12 center-align red-text">
                <span>Nation</span>
              </div>
              <div class="row col s12 center-align">
                <span>${data.competition.area.name}</span>
              </div>
              <!--extra end -->
            </div>
          </div>
        </div>
      </div>
      `;

      document.getElementById("body-content").innerHTML = scheduleHtml;
      resolve(data);
    })
  });
}
