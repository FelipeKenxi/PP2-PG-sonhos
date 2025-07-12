import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { criarOvelha } from './cria_ovelha.js';
import { criarCerca } from './cria_cerca.js';

let ultimaPosicao = new THREE.Vector3(); // Para armazenar a posição anterior

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
var camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 30, 30);
camera1.lookAt(0, 0, 0);

var camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera2.position.set(0, 0, 50);
camera2.lookAt(0, 0, 0);

var camera_atual = camera1;
var CameraAtual = 1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2c3a63);

function mudarCamera() {
    if (CameraAtual == 1) {
        camera_atual = camera2;
        CameraAtual = 2;
    } else {
        camera_atual = camera1;
        CameraAtual = 1;
    }
}

// Objeto invisível que serve como base giratória
const invisGeo = new THREE.SphereGeometry(0.0, 18, 9);
const invisMat = new THREE.MeshBasicMaterial({
    color: 0xffff66,
    transparent: true
});
const invis = new THREE.Mesh(invisGeo, invisMat);
scene.add(invis);

// Criação da cerca via função
const cercaMesh = criarCerca();
cercaMesh.position.z = 25; // mesma posição que antes
scene.add(cercaMesh);
cercaMesh.scale.set(5, 7, 7);
cercaMesh.rotation.y = (-Math.PI / 2) + Math.PI / 5;
cercaMesh.position.z = 15;


// Criação da ovelha
const ovelha = criarOvelha();
ovelha.scale.set(7, 7, 7);
ovelha.rotation.y = -Math.PI / 2;
ovelha.position.x = invis.position.x + 20;
ovelha.position.y = 3;
invis.add(ovelha);

// Luz
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xccc6a5);
scene.add(hemiLight);

// Pulo
let isJumping = false;
let jumpUp = true;
let stayAir = false;
let jumpSpeed = 0.05;
let maxJumpHeight = 12;
let originalY = ovelha.position.y;

function animate() {
    invis.rotateY(-0.004);

    // 1. Pega a nova posição da ovelha
    const posAtual = new THREE.Vector3();
    ovelha.getWorldPosition(posAtual);

    // 2. Calcula a direção da tangente (movimento)
    const direcao = new THREE.Vector3().subVectors(posAtual, ultimaPosicao).normalize();

    // 3. Define para onde ela deve olhar (frente da tangente)
    const novoAlvo = new THREE.Vector3().addVectors(posAtual, direcao);
    ovelha.lookAt(novoAlvo);

    // 4. Atualiza a posição anterior
    ultimaPosicao.copy(posAtual);

    const ovelhaWorldPos = new THREE.Vector3();
    ovelha.getWorldPosition(ovelhaWorldPos);

    const cercaWorldPos = new THREE.Vector3();
    cercaMesh.getWorldPosition(cercaWorldPos);

    const distancia = ovelhaWorldPos.distanceTo(cercaWorldPos);
    const distanciaX = Math.abs(ovelhaWorldPos.x - cercaWorldPos.x);
    console.log(distancia);

    // Inicia o pulo se estiver perto
    if (distancia < 17 && !isJumping) {
        isJumping = true;
        jumpUp = true;
        stayAir = true;
    }

    // Controle do pulo
    if (isJumping) {
        if (jumpUp) {
            ovelha.position.y += jumpSpeed;
            if (ovelha.position.y >= originalY + maxJumpHeight) {
                jumpUp = false;
            }
        } else {
            if (!stayAir) {
                ovelha.position.y -= jumpSpeed;
                if (ovelha.position.y <= originalY) {
                    ovelha.position.y = originalY;
                    isJumping = false;
                }
            }
        }
        if (stayAir && distanciaX > 3) {
            stayAir = false;
        }
    }

    requestAnimationFrame(animate);
    renderer.render( scene, camera_atual );
}

ovelha.getWorldPosition(ultimaPosicao);

animate();

window.mudarCamera = mudarCamera;
