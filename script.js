let helper = document.getElementById('helper');

document.getElementById('bu').addEventListener("click", function () {

  let input = document.getElementById('in').value.replace(" ", "%20");
  let time = document.getElementById('time').value;
  let game = document.getElementById('game').value;

  let url = "";

  if (time == "monthly") {
    url = "https://api.playhive.com/v0/game/monthly/player/" + game + "/" + input;
  }
  else if (time == "all") {
    url = "https://api.playhive.com/v0/game/all/" + game + "/" + input;
  }
  else {
    helper.innerText += "\nPlease select a timeframe!";
  }

  if (game == "nothing") {
    helper.innerText += "\nPlease select a game!";
  }



  console.log(url);

if(input !== ""){
        helper.innerText = "loading..."
  fetch(url)
    // .then(response => response.json())
    .then(async (data) => {
      if (data.ok) {
        console.log('poggies');
        data = await data.json()
        //Here you have your data...
        interpret(data);
      }
      else {
        helper.innerText = "no games were played!";
      }
    })
}

  function interpret(data) {
    helper.innerText = "";
    let p = document.createElement('p');
    p.innerText = data.played + " games played." + "\n" + data.victories + " games won." + "\n" + Math.round((data.victories / data.played) * 10000) / 100 + "% win percentage.";
    document.body.appendChild(p);
  }

});
