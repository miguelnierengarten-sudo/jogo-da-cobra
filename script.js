let money = 50;
let soil = 50;
let energy = 100;
let rep = 50;
let harvest = 0;

function update() {
  document.getElementById("money").innerText = money;
  document.getElementById("soil").innerText = soil;
  document.getElementById("energy").innerText = energy;
  document.getElementById("rep").innerText = rep;
}

function log(msg) {
  let div = document.getElementById("log");
  div.innerHTML = msg + "<br>" + div.innerHTML;
}

// 🌾 plantar
function plantar() {
  if (energy < 10) return log("⚠️ Energia baixa!");

  harvest += 10;
  soil -= 5;
  energy -= 10;

  log("🌾 Você plantou e gerou colheita!");
  evento();
  update();
}

// 🌿 adubar
function adubar() {
  if (money < 10) return log("⚠️ Sem dinheiro!");

  money -= 10;
  soil += 15;

  log("🌿 Solo melhorado!");
  evento();
  update();
}

// 💰 vender
function vender() {
  if (harvest <= 0) return log("⚠️ Nada para vender!");

  let ganho = harvest * 2;
  money += ganho;
  rep += 10;
  harvest = 0;

  log("💰 Venda realizada: R$ " + ganho);
  evento();
  update();
}

// 😴 descansar
function descansar() {
  energy += 30;
  if (energy > 100) energy = 100;

  log("😴 Energia recuperada");
  update();
}

// 🌦️ eventos aleatórios
function evento() {
  let r = Math.random();

  if (r < 0.25) {
    soil -= 10;
    log("🌧️ Chuva forte afetou o solo");
  }

  if (r > 0.7) {
    rep += 10;
    log("🏆 Feira valorizou sua produção");
  }

  if (r > 0.9) {
    money -= 10;
    log("🐛 Praga atacou a plantação");
  }

  update();
}

update();
log("🌱 Bem-vindo à Fazenda Viva!");
