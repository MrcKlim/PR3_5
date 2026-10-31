import Pokemon from './pokemon.js';
import { random, countClick } from './utils.js';

const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.getElementById('logs');

const player1 = new Pokemon({
  name: 'Pikachu',
  type: 'electric',
  hp: 100,
  selectors: 'character'
});

const player2 = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 100,
  selectors: 'enemy'
});

const kickCounter = countClick(6, 'Thunder Jolt');
const specialCounter = countClick(6, 'Special Attack');

function disableButtons() {
  $btnKick.disabled = true;
  $btnSpecial.disabled = true;
}

function generateLog(firstPerson, secondPerson, count) {
  const { hp: { current, total } } = firstPerson;

  const logs = [
    `${firstPerson.name} згадав щось важливе, але раптово ${secondPerson.name}, не тямлячи себе від переляку, завдав удару в передпліччя ворога.`,
    `${firstPerson.name} поперхнувся, і за це ${secondPerson.name} з переляку приклав прямий удар коліном у лоб ворога.`,
    `${firstPerson.name} замислився, але в цей час нахабний ${secondPerson.name}, прийнявши вольове рішення, нечутно підійшовши ззаду, завдав удару.`,
    `${firstPerson.name} прийшов до тями, але раптово ${secondPerson.name} випадково завдав потужного удару.`,
    `${firstPerson.name} поперхнувся, але в цей час ${secondPerson.name} знехотя роздробив кулаком противника.`,
    `${firstPerson.name} здивувався, а ${secondPerson.name}, похитнувшись, вліпив підлий удар.`,
    `${firstPerson.name} висякався, але раптово ${secondPerson.name} провів нищівний удар.`,
    `${firstPerson.name} похитнувся, і раптово нахабний ${secondPerson.name} безпричинно вдарив у ногу противника.`,
    `${firstPerson.name} засмутився, як раптом ${secondPerson.name} випадково вліпив стопою в живіт суперника.`,
    `${firstPerson.name} намагався щось сказати, але раптом ${secondPerson.name} зі нудьги розбив брову супернику.`
  ];

  const text = logs[random(logs.length) - 1];
  const logString = `${text} -${count}, [${firstPerson.name}: ${current}/${total}]`;

  const $p = document.createElement('p');
  $p.innerText = logString;
  $logs.insertBefore($p, $logs.children[0]);
}

function checkWin() {
  if (player1.hp.current === 0 || player2.hp.current === 0) {
    disableButtons();
    if (player1.hp.current === 0) {
      alert(`Бідний ${player1.name} програв бій!`);
    } else {
      alert(`Бідний ${player2.name} програв бій!`);
    }
  }
}

$btnKick.addEventListener('click', () => {
  const canClick = kickCounter();
  if (!canClick) {
    $btnKick.disabled = true;
  }

  const kick1 = random(20); 
  const kick2 = random(20); 

  player2.changeHP(kick1, (count) => {
    generateLog(player2, player1, count);
  });

  player1.changeHP(kick2, (count) => {
    generateLog(player1, player2, count);
  });

  checkWin();
});

$btnSpecial.addEventListener('click', () => {
  const canClick = specialCounter();
  if (!canClick) {
    $btnSpecial.disabled = true;
  }

  const spec1 = random(40);
  const spec2 = random(40);

  player2.changeHP(spec1, (count) => {
    generateLog(player2, player1, count);
  });

  player1.changeHP(spec2, (count) => {
    generateLog(player1, player2, count);
  });

  checkWin();
});