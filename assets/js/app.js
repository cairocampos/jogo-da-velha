window.onload = function() {
  const PLAYER1 = "o";
  const PLAYER2 = "x";
  let currentPlayer = PLAYER1;
  let winner = null;

  const nextPlayerScore = document.querySelector('.next-player');
  const zones = document.querySelectorAll('.zone');

  function updateScore(winner) {
    const score = document.querySelector('.score');
    score.querySelector(`span#${winner}`).innerHTML++;
  }

  function checkWinner() {
    const a1 = document.querySelector('[data-zone="a1"]').getAttribute('data-marker');
    const a2 = document.querySelector('[data-zone="a2"]').getAttribute('data-marker');
    const a3 = document.querySelector('[data-zone="a3"]').getAttribute('data-marker');

    const b1 = document.querySelector('[data-zone="b1"]').getAttribute('data-marker');
    const b2 = document.querySelector('[data-zone="b2"]').getAttribute('data-marker');
    const b3 = document.querySelector('[data-zone="b3"]').getAttribute('data-marker');

    const c1 = document.querySelector('[data-zone="c1"]').getAttribute('data-marker');
    const c2 = document.querySelector('[data-zone="c2"]').getAttribute('data-marker');
    const c3 = document.querySelector('[data-zone="c3"]').getAttribute('data-marker');

    if(a1 === currentPlayer && a2 === currentPlayer && a3 === currentPlayer) {
      winner = currentPlayer;
    } else if(b1 === currentPlayer && b2 === currentPlayer && b3 === currentPlayer) {
      winner = currentPlayer;
    } else if(c1 === currentPlayer && c2 === currentPlayer && c3 === currentPlayer) {
      winner = currentPlayer;
    } else if(a1 === currentPlayer && b1 === currentPlayer && c1 === currentPlayer) {
      winner = currentPlayer;
    } else if(a2 === currentPlayer && b2 === currentPlayer && c2 === currentPlayer) {
      winner = currentPlayer;
    } else if(a3 === currentPlayer && b3 === currentPlayer && c3 === currentPlayer) {
      winner = currentPlayer;
    } else if(a1 === currentPlayer && b2 === currentPlayer && c3 === currentPlayer) {
      winner = currentPlayer;
    } else if(a3 === currentPlayer && b2 === currentPlayer && c1 === currentPlayer) {
      winner = currentPlayer;
    }

    if(winner) {
      const congratulations = document.getElementById('congratulations')
      congratulations.classList.add('active');
      congratulations.innerHTML = `PARABÉNS! O ganhador dessa partida foi: <span style="font-weight: bold; color: #000">${winner.toUpperCase()}</span>`
      document.getElementById('reset').style.display = 'block'
      updateScore(winner);
    } else if(a1 && a2 && a3 && b1 && b2 && b3 && c1 && c2 && c3) {
      const fallback = document.getElementById('fallback');
      fallback.classList.add('active');
      fallback.innerHTML = 'VISH :( DEU VELHA!!'
      document.getElementById('reset').style.display = 'block'
    }    
  }

  function nextPlayer() {
    checkWinner();
    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    nextPlayerScore.querySelector('img').src = `assets/images/${currentPlayer}.png`;
  }

  zones.forEach(zone => {
    zone.addEventListener('click', function() {
      if(!zone.querySelector('img') && !winner) {
        zone.innerHTML = `<img src="assets/images/${currentPlayer}.png" height="50" />`
        zone.setAttribute('data-marker', `${currentPlayer}`);

        nextPlayer();
      }
    });
  })

  document.getElementById('reset').addEventListener('click', function() {
    zones.forEach(zone => {
      zone.innerHTML = '';
      zone.setAttribute('data-marker', '')
      document.getElementById('congratulations').classList.remove('active');
      document.getElementById('fallback').classList.remove('active');
      document.getElementById('reset').style.display = 'none';
      winner = null;
    })
  })

  nextPlayer();
}