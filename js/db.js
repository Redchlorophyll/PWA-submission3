const dbPromised = idb.open("futbalmania", 1, upgradeDb => {
  const scheduleObjectStore = upgradeDb.createObjectStore('matches', {
    keyPath: "id"
  });
  scheduleObjectStore.createIndex("homeTeam", "homeTeam", { unique: false });
});

function saveForLater(schedule) {
  dbPromised
    .then(db => {
      const tx = db.transaction("matches", "readwrite");
      const store = tx.objectStore("matches");
      console.log(schedule);
      store.add(schedule.match);
      return tx.complete;
    }).then(() => {
      alert("Jadwal Berhasil ditambahkan ke bookmark")
      console.log("data berhasil disimpan.");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
    .then(db => {
      const tx = db.transaction("matches", "readonly");
      const store = tx.objectStore("matches");
      return store.getAll();
    }).then(schedules => {
      resolve(schedules);
    }).catch(err => {
      console.log(err);
    })
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("matches", "readonly");
        const store = tx.objectStore("matches");
        return store.get(id);
      }).then(matches => {
        resolve(matches);
      })
      })
}

function deleteById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("matches", "readwrite");
        const store = tx.objectStore("matches");
        store.delete(id);
        return tx.complete;
      }).then(matches => {
        resolve(matches);
      })
      })
}
