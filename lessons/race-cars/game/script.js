window.addEventListener('load', () => {

    let car1Position = 0;
    let car2Position = 0;
    let gameOver = false;

    const finishLine = 600;

    const car1 = document.getElementById('car1');
    const car2 = document.getElementById('car2');
    const result = document.getElementById('result');

    window.addEventListener('keydown', moveCars);

    function moveCars(event) {

        if (gameOver) {
            return;
        }

        if (event.key === 'a') {
            car1Position += 20;
            car1.style.left = car1Position + 'px';
        }

        if (event.key === 'l') {
            car2Position += 20;
            car2.style.left = car2Position + 'px';
        }

        if (car1Position >= finishLine) {
            result.textContent = 'Player 1 wins!';
            gameOver = true;
        }

        if (car2Position >= finishLine) {
            result.textContent = 'Player 2 wins!';
            gameOver = true;
        }
    }

});
