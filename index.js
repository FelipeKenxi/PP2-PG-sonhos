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
camera1.position.set(25, 60, -40);
camera1.lookAt(0, 0, 0);

var camera2 = new THREE.PerspectiveCamera(fov, aspect, near, 20);
camera2.position.set(0, 0, 50);
camera2.lookAt(0, 0, 0);

var camera_atual = camera1;
var CameraAtual = 1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2c3a63);

// chão com grama
const loader = new THREE.TextureLoader();
const texturaGrama = loader.load('texturas/grama.jpg');

texturaGrama.wrapS = THREE.RepeatWrapping;
texturaGrama.wrapT = THREE.RepeatWrapping;
texturaGrama.repeat.set(10, 10); // repete a textura várias vezes

const planoChao = new THREE.CircleGeometry(120, 64);

const materialChao = new THREE.MeshStandardMaterial({
  map: texturaGrama,
  roughness: 1,
  metalness: 0,
  side: THREE.DoubleSide
});

const chao = new THREE.Mesh(planoChao, materialChao);
chao.rotation.x = -Math.PI / 2;
chao.position.set(-25, -5, 65);

scene.add(chao);

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
cercaMesh.rotation.y = Math.PI / 2;
cercaMesh.position.set(0, 0, 35);


// Criação da ovelha
const ovelha = criarOvelha();
ovelha.scale.set(7, 7, 7);
ovelha.rotation.y = -Math.PI / 2;
ovelha.position.set(0, 0, -35);
invis.add(ovelha);

// Luz
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xccc6a5);
scene.add(hemiLight);


// Shaders
const geometriaShader = new THREE.PlaneGeometry( w/100, h/100);
const materialShaderNuvens = new THREE.RawShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
        uTime: { value: 0.0 }
    },
    vertexShader: `
    precision mediump float;
    precision mediump int;

    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    precision mediump float;
    precision mediump int;

    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;


    // Código original de Darko Supe (omegasbk)
    // Modificado e adaptado para GLSL por Beatriz Rogers

    float noise(vec2 uv)
    {
        return fract(sin(uv.x * 113.0 + uv.y * 412.0) * 6339.0);
    }

    vec3 noiseSmooth(vec2 uv)
    {
        vec2 index = floor(uv);
        vec2 pq = fract(uv);

        pq = smoothstep(0.0, 1.0, pq);
        
        float topLeft = noise(index);
        float topRight = noise(index + vec2(1.0, 0.0));
        float top = mix(topLeft, topRight, pq.x);
        
        float bottomLeft = noise(index + vec2(0, 1));
        float bottomRight = noise(index + vec2(1, 1));
        float bottom = mix(bottomLeft, bottomRight, pq.x);
        
        return vec3(mix(top, bottom, pq.y));
    }

    float drawSmoothCircle(vec2 position, vec2 center, float maxRadius, float minRadius) {
        return  smoothstep(minRadius, maxRadius, distance(position,center));
    }

    void main() {

        vec2 uv = vUv;
        
        uv.x += uTime / 40.0;
        uv.y += uTime / 40.0;
        
        vec2 uv2 = uv;
        uv2.x += uTime / 10.0;
        uv2.y -= uTime / 10.0;
        
        vec2 uv3 = uv;
        uv3.x += uTime / 30.0;
        uv3.y -= uTime / 30.0;
            
        vec3 col = noiseSmooth(uv * 4.);
        
        col += noiseSmooth(uv * 8.0) * 0.5;
        col += noiseSmooth(uv2 * 16.0) * 0.25;
        col += noiseSmooth(uv3 * 32.0) * 0.125;
        col += noiseSmooth(uv3 * 64.0) * 0.0625;
        
        col /= 2.0;   
        
        col *= smoothstep(0.2, 0.6, col);   
        
        col = mix(1.0 - (col / 7.0), vec3(0), 1.0 - col);    
        
        float area = drawSmoothCircle(vUv, vec2(0.5), 0.7, 0.15);
        float opacity = area - ((col.x + col.y + col.z) / 3.0);

        // Output to screen
        gl_FragColor = vec4(vec3(area) + col,opacity);
    }
    `,
});

const shaderMeshNuvens1 = new THREE.Mesh(geometriaShader, materialShaderNuvens);
shaderMeshNuvens1.position.set(0, camera1.position.y - 4, camera1.position.z - 4);
shaderMeshNuvens1.lookAt(0,30,30);

const shaderMeshNuvens2 = new THREE.Mesh(geometriaShader, materialShaderNuvens);
shaderMeshNuvens2.position.set(0, 0, camera2.position.z - 5.5);
shaderMeshNuvens2.lookAt(0,0,50);

scene.add(shaderMeshNuvens1);
scene.add(shaderMeshNuvens2);

const clock = new THREE.Clock();




//Caminho
const pontos = [
    new THREE.Vector3(0,0,-35),
    new THREE.Vector3(35,0,0),
    new THREE.Vector3(15,0,31.62),
    new THREE.Vector3(0,10,35),
    new THREE.Vector3(-15,0,31.62),
    new THREE.Vector3(-35,0,0)
];
const caminho =  new THREE.CatmullRomCurve3(pontos, true);

function animate() {
    //invis.rotateY(-0.004);

    // 1. Pega a nova posição da ovelha
    const posAtual = new THREE.Vector3();
    ovelha.getWorldPosition(posAtual);

    // 2. Calcula a direção da tangente (movimento)
    const direcao = new THREE.Vector3().subVectors(posAtual, ultimaPosicao).normalize();

    // 3. Define para onde ela deve olhar (frente da tangente)
    const novoAlvo = new THREE.Vector3().addVectors(posAtual, direcao);
    ovelha.lookAt(novoAlvo);

    // caminho e Pulo
    const time = Date.now();
    const t = (time / 2000 % 7) / 7;
    console.log(t);
    const posicao_ovelha1 = caminho.getPointAt((t+0.001)%1);
    ovelha.position.copy(posicao_ovelha1);


    // 4. Atualiza a posição anterior
    ultimaPosicao.copy(posAtual);

    /*const ovelhaWorldPos = new THREE.Vector3();
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
        */

    // Atualização dos Shaders por frame
    const elapsedTime = clock.getElapsedTime();
    materialShaderNuvens.uniforms.uTime.value = elapsedTime;

    requestAnimationFrame(animate);
    renderer.render( scene, camera_atual );
}

ovelha.getWorldPosition(ultimaPosicao);

animate();

window.mudarCamera = mudarCamera;