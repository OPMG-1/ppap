document.addEventListener('DOMContentLoaded', function() {
    const shootOpponent = document.getElementById('shootOpponent');
    const shootSelf = document.getElementById('shootSelf');
    const resetButton = document.getElementById('resetButton');
    const clickInfo = document.getElementById('clickInfo');
    const bulletInfo = document.getElementById('bulletInfo');
    const totalBullets = 10;
    let realBullets;
    let blankBullets;
    let currentPlayer = '나';

    const initializeGame = () => {
        realBullets = Math.floor(Math.random() * totalBullets) + 1;
        blankBullets = totalBullets - realBullets;
        updateBulletInfo();
        shootOpponent.disabled = false;
        shootOpponent.textContent = '상대에게 쏘기';
        shootOpponent.style.backgroundColor = '#007BFF';
        shootSelf.disabled = false;
        shootSelf.textContent = '나에게 쏘기';
        shootSelf.style.backgroundColor = '#007BFF';
        currentPlayer = '나';
        updateClickInfo();
    };

    const updateBulletInfo = () => {
        bulletInfo.textContent = `실탄: ${realBullets}, 공포탄: ${blankBullets}`;
    };

    const updateClickInfo = () => {
        clickInfo.textContent = `현재 턴: ${currentPlayer}`;
    };

    const handleClick = (target) => {
        const isRealBullet = Math.random() < realBullets / (realBullets + blankBullets);
        if (isRealBullet) {
            realBullets--;
            if (target === 'self') {
                shootSelf.textContent = '실탄!';
                shootSelf.style.backgroundColor = 'red';
                shootSelf.disabled = true;
                shootOpponent.disabled = true;
                setTimeout(() => {
                    alert('패배했습니다!');
                    initializeGame();
                }, 100);
            } else {
                shootOpponent.textContent = '실탄!';
                shootOpponent.style.backgroundColor = 'red';
                shootSelf.disabled = true;
                shootOpponent.disabled = true;
                setTimeout(() => {
                    alert('승리했습니다!');
                    initializeGame();
                }, 100);
            }
        } else {
            blankBullets--;
            if (target === 'self') {
                shootSelf.textContent = '나에게 쏘기';
                shootSelf.style.backgroundColor = 'green';
            } else {
                shootOpponent.textContent = '상대에게 쏘기';
                shootOpponent.style.backgroundColor = 'green';
            }
            shootSelf.disabled = true;
            shootOpponent.disabled = true;
            updateBulletInfo();
            if (realBullets === 0) {
                setTimeout(() => {
                    alert('무승부입니다!');
                    initializeGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === '나' ? '상대' : '나';
                updateClickInfo();
                shootSelf.disabled = false;
                shootOpponent.disabled = false;
            }
        }
    };

    shootOpponent.addEventListener('click', () => handleClick('opponent'));
    shootSelf.addEventListener('click', () => handleClick('self'));
    resetButton.addEventListener('click', initializeGame);

    initializeGame();
});
