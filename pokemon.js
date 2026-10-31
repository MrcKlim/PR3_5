class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    };
    this.type = type;

    this.renderHP();
  }

  changeHP(count, cb) {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
    }

    this.renderHP();

    if (cb) {
      cb(count);
    }
  }

  renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  renderHPLife() {
    const { hp: { current, total }, elHP } = this;
    elHP.innerText = `${current} / ${total}`;
  }

  renderProgressbarHP() {
    const { hp: { current, total }, elProgressbar } = this;
    const percent = (current / total) * 100;
    elProgressbar.style.width = `${percent}%`;

    elProgressbar.classList.remove('low', 'critical');
    if (percent < 60 && percent >= 20) {
      elProgressbar.classList.add('low');
    } else if (percent < 20) {
      elProgressbar.classList.add('critical');
    }
  }
}

export default Pokemon;