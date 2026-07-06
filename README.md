<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fazenda Viva EXPANSÃO 🌱🚜</title>

<style>
body{
margin:0;
font-family:Arial;
background:linear-gradient(#c8f7c5,#5fbf5f);
}

header{# jogo-da-cobra
Sobre o Jogo da Cobrinha

O Jogo da Cobrinha (Snake) é um dos jogos mais clássicos da história dos videogames. Nele, o jogador controla uma cobra que se movimenta pelo cenário em busca de alimentos.

Cada vez que a cobrinha come uma comida, ela cresce de tamanho e o jogador ganha pontos. Conforme a cobra aumenta, o desafio fica maior, pois é preciso evitar bater nas paredes ou no próprio corpo.

Objetivo do Jogo

O objetivo é conseguir a maior pontuação possível, coletando o máximo de alimentos sem colidir com as bordas do mapa ou com a própria cobrinha.

Como Jogar
⬆️ Seta para cima: mover para cima
⬇️ Seta para baixo: mover para baixo
⬅️ Seta para esquerda: mover para a esquerda
➡️ Seta para direita: mover para a direita
Desafio

Quanto mais alimentos a cobrinha comer, maior ela ficará e mais difícil será controlar seus movimentos. Teste seus reflexos, sua atenção e tente alcançar a maior pontuação possível!

background:#1b5e20;
color:white;
text-align:center;
padding:15px;
}

.container{
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:15px;
padding:15px;
}

.panel{
background:white;
width:300px;
border-radius:12px;
padding:15px;
box-shadow:0 0 10px rgba(0,0,0,0.2);
}

button{
width:100%;
padding:10px;
margin-top:8px;
border:none;
border-radius:8px;
cursor:pointer;
background:#2e7d32;
color:white;
}

button:hover{
background:#145a18;
}

.stat{
display:flex;
justify-content:space-between;
margin:5px 0;
}

#log{
height:250px;
overflow-y:auto;
background:#e8f5e9;
padding:10px;
border-radius:8px;
font-size:13px;
}

.bad{
color:red;
}
.good{
color:green;
}
</style>
</head>

<body>

<header>
<h1>🌱 Fazenda Viva — Agrinho EXPANSÃO 🚜</h1>
<p>Simulador completo de produção rural sustentável</p>
</header>

<div class="container">

<!-- PAINEL STATUS -->
<div class="panel">
<h3>📊 Status</h3>

<div class="stat">💰 Dinheiro: <span id="money">50</span></div>
<div class="stat">🌱 Solo: <span id="soil">50</span></div>
<div class="stat">👨‍🌾 Reputação: <span id="rep">50</span></div>
<div class="stat">⚡ Energia: <span id="energy">100</span></div>
<div class="stat">⭐ Nível: <span id="level">1</span></div>

<hr>

<button onclick="plantar()">🌾 Plantar</button>
<button onclick="adubar()">🌿 Adubar</button>
<button onclick="vender()">💰 Vender Colheita</button>
<button onclick="descansar()">😴 Descansar</button>
</div>

<!-- LOJA -->
<div class="panel">
<h3>🏪 Loja de Melhorias</h3>

<button onclick="upgradeSolo()">🌱 Melhorar Solo (+10)</button>
<button onclick="upgradeEnergia()">⚡ Treino de Energia</button>
<button onclick="upgradeVenda()">💰 Melhorar Preço de Venda</button>

<hr>

<p><b>Preço dinâmico da fazenda muda com o nível!</b></p>
</div>

<!-- LOG -->
<div class="panel">
<h3>📜 Eventos do Jogo</h3>
<div id="log"></div>
</div>

</div>

<script>

let money=50;
let soil=50;
let rep=50;
let energy=100;
let level=1;
let harvest=0;
let price=2;

function update(){
document.getElementById("money").innerText=money;
document.getElementById("soil").innerText=soil;
document.getElementById("rep").innerText=rep;
document.getElementById("energy").innerText=energy;
document.getElementById("level").innerText=level;
}

function log(msg){
let div=document.getElementById("log");
div.innerHTML=msg+"<br>"+div.innerHTML;
}

function levelUp(){
if(rep>=100){
level++;
rep=50;
soil+=10;
energy+=20;
log("🏆 Você subiu de nível! Fazenda crescendo!");
}
}

function plantar(){
if(energy<10){
log("⚠️ Energia baixa!");
return;
}

harvest+=10;
soil-=5;
energy-=10;

log("🌾 Plantio realizado com sucesso!");
evento();
update();
levelUp();
}

function adubar(){
if(money<10){
log("⚠️ Sem dinheiro!");
return;
}

money-=10;
soil+=15;
log("🌿 Solo melhorado!");
evento();
update();
}

function vender(){
if(harvest<=0){
log("⚠️ Nada para vender!");
return;
}

let ganho=harvest*price;
money+=ganho;
rep+=10;
harvest=0;

log("💰 Venda realizada: R$ "+ganho);
evento();
update();
levelUp();
}

function descansar(){
energy+=30;
if(energy>100)energy=100;
log("😴 Você descansou e recuperou energia");
update();
}

function upgradeSolo(){
if(money<20){log("⚠️ Dinheiro insuficiente");return;}
money-=20;
soil+=20;
log("🌱 Solo melhorado permanentemente");
update();
}

function upgradeEnergia(){
if(money<25){log("⚠️ Dinheiro insuficiente");return;}
money-=25;
energy+=40;
log("⚡ Energia melhorada");
update();
}

function upgradeVenda(){
if(money<30){log("⚠️ Dinheiro insuficiente");return;}
money-=30;
price+=1;
log("💰 Preço de venda aumentado!");
update();
}

// eventos
function evento(){
let r=Math.random();

if(r<0.25){
soil-=10;
log("🌧️ Chuva forte reduziu o solo");
}

if(r>0.7){
rep+=10;
log("🏆 Feira valorizou sua produção");
}

if(r>0.9){
money-=10;
log("🐛 Praga atingiu a plantação");
}

checkGame();
}

function checkGame(){
if(soil<=0){
log("❌ Solo destruído. Fim de jogo.");
}
if(money<=0){
log("❌ Falência. Fim de jogo.");
}
}

update();
log("🌱 Bem-vindo à Fazenda Viva EXPANSÃO!");

</script>

</body>
</html>
