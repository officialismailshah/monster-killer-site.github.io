const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const monster_Attack_value = 14;
const HEAL_VALUE = 20;
const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';
// SHOW LOG BUTTON VARIABLES
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STORNG_ATTACK';
const MODE_HEAL = 'HEAL_MODE';
const MODE_MONSTER_ATTACK = 'MONSTER_ATTACK';
const GAME_OVER = 'GAME_OVER';



let chooseMaxLife = 100;
let currentMonsterLife = chooseMaxLife;
let currentPlayerLife = chooseMaxLife;
let bonusLife = true;
let battleLog = [];

function writeToLog(ev, value, playerHealth, monsterHealth) {
    let userLogEvent = {};
    if (ev === MODE_ATTACK) {
        userLogEvent = {
            event: ev,
            value: value,
            target: 'Monster',
            currentPLayerHealth: playerHealth,
            currentMonsterHealth: monsterHealth
        };
    } else if (ev === MODE_MONSTER_ATTACK) {
        userLogEvent = {
            event: ev,
            value: value,
            target: 'Player',
            currentPLayerHealth: playerHealth,
            currentMonsterHealth: monsterHealth
        };
    } else if (ev === MODE_HEAL) {
        userLogEvent = {
            event: ev,
            value: value,
            target: 'Player',
            currentPLayerHealth: playerHealth,
            currentMonsterHealth: monsterHealth
        };
    } else if (ev === MODE_STRONG_ATTACK) {
        userLogEvent = {
            event: ev,
            value: value,
            target: 'Player',
            currentPLayerHealth: playerHealth,
            currentMonsterHealth: monsterHealth
        };
    } else if (ev === GAME_OVER) {
        userLogEvent = {
            event: ev,
            value: value,
            currentPLayerHealth: playerHealth,
            currentMonsterHealth: monsterHealth
        };
    }

    battleLog.push(userLogEvent);
}

function reset() {
    currentMonsterLife = chooseMaxLife;
    currentPlayerLife = chooseMaxLife;
    resetGame(chooseMaxLife);
}

function getMaxValued() {
    const enterValueByUser = prompt('Enter Your And Monster Life Power', '100');
    parsedValue = parseInt(enterValueByUser);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: 'You have entered the string enter integer' }
    }
    chooseMaxLife = parsedValue;
}

function endRound() {
    const initialPlayerLife = currentPlayerLife;
    const monster_damge_to_palyer = dealPlayerDamage(monster_Attack_value);
    currentPlayerLife -= monster_damge_to_palyer;
    writeToLog(
        MODE_MONSTER_ATTACK,
        monster_damge_to_palyer,
        currentPlayerLife,
        currentMonsterLife
    );
    if (currentPlayerLife <= 0 && bonusLife) {
        bonusLife = false;
        removeBonusLife();
        currentPlayerLife = initialPlayerLife;
        setPlayerHealth(initialPlayerLife);
        alert('You are saved by bonus life');
    }
    if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
        alert('You won');
        writeToLog(
            GAME_OVER,
            'YOU WON',
            currentPlayerLife,
            currentMonsterLife
        );
        reset();
    } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
        alert('You Lost');
        writeToLog(
            GAME_OVER,
            'YOU LOST',
            currentPlayerLife,
            currentMonsterLife
        );
        reset();
    } else if (currentMonsterLife < 0 && currentPlayerLife < 0) {
        alert('This match is Draw');
        writeToLog(
            GAME_OVER,
            'THIS MATCH IS DRAW',
            currentPlayerLife,
            currentMonsterLife
        );
        reset();
    }
}

function monsterAttack(mode) {
    let damageMode;
    let logEvent;
    if (mode === ATTACK_MODE) {
        damageMode = ATTACK_VALUE;
        logEvent = MODE_ATTACK;
    } else if (mode === STRONG_ATTACK_MODE) {
        damageMode = STRONG_ATTACK_VALUE;
        logEvent = MODE_STRONG_ATTACK;
    }
    const player_damage_to_monster = dealMonsterDamage(damageMode);
    currentMonsterLife -= player_damage_to_monster;
    writeToLog(
        logEvent,
        damageMode,
        currentPlayerLife,
        currentMonsterLife
    );
    endRound();
}

function attackHandler() {
    monsterAttack(ATTACK_MODE);

}

function strongAttackHandler() {
    monsterAttack(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerLife >= chooseMaxLife - HEAL_VALUE) {
        alert("You can't heal your palyer bcz your are at your max");
        healValue = chooseMaxLife - currentPlayerLife;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerLife += healValue;
    writeToLog(
        MODE_HEAL,
        healValue,
        currentPlayerLife,
        currentMonsterLife
    );
    endRound();
}

function printLog() {
    console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLog)