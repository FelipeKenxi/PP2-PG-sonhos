import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { criarOvelha } from './cria_ovelha.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 30, 30);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

let CameraAtual = 1;
function mudarCamera() {
    if (CameraAtual == 1) {
        camera = new THREE.PerspectiveCamera(fov, aspect, near, 1000);
        camera.position.set(0, 0, 50);
        camera.lookAt(0, 0, 0);
        CameraAtual = 2;
    } else {
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 30, 30);
        camera.lookAt(0, 0, 0);
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

// Cerca
const cerca = new THREE.BoxGeometry(3.0, 3.0, 8.0);
const cercaMat = new THREE.MeshBasicMaterial({ color: 0x1166ff });
const cercaMesh = new THREE.Mesh(cerca, cercaMat);
cercaMesh.position.z = 25;
scene.add(cercaMesh);

// Criação da ovelha
const ovelha = criarOvelha();
ovelha.scale.set(7, 7, 7);
ovelha.rotation.y = -Math.PI / 2;
ovelha.position.x = invis.position.x + 20;
ovelha.position.y = 3; // ou 6, 7... depende do modelo
invis.add(ovelha);

// Luz
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000);
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
    renderer.render(scene, camera);
}
animate();

window.mudarCamera = mudarCamera;
