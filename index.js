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
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 30;
camera.position.y = 30;
camera.position.x = 0;
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();



var CameraAtual = 1;
//funcao de camera
function mudarCamera(){
    if(CameraAtual == 1){
        camera = new THREE.PerspectiveCamera(fov, aspect, near, 1000);
        camera.position.z = 50;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.lookAt(0, 0, 0);
        CameraAtual = 2;
    }
    else
    {
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 30;
        camera.position.y = 30;
        camera.position.x = 0;
        camera.lookAt(0, 0, 0);
        CameraAtual = 1;
    }
}

//felipe p melo. Objeto invisivel que vai ser o pai das ovelhas e fazelas rotacionar em torno dela.
const invisGeo = new THREE.SphereGeometry(0.0, 18, 9);
const invisMat = new THREE.MeshBasicMaterial({
    color: 0xffff66,
    transparent: true
});
const invis = new THREE.Mesh(invisGeo, invisMat);


const geometry = new THREE.ConeGeometry(6, 8, 16);
const Mat = new THREE.MeshBasicMaterial({
    color: 0xff66ff,
    wireframe: false,
});
const mesh = new THREE.Mesh(geometry, Mat);


const cerca = new THREE.BoxGeometry( 3.0, 3.0, 8.0 );
const cercaMat = new THREE.MeshBasicMaterial({
    color: 0x1166ff
});
const cercaMesh = new THREE.Mesh(cerca, cercaMat);

cercaMesh.position.z = 25;
scene.add(cercaMesh);
scene.add(invis);
const ovelha = criarOvelha();
invis.add(ovelha);
mesh.rotation.x = 90;
mesh.position.x = invis.position.x + 20;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000);
scene.add(hemiLight);
let isJumping = false;
let jumpUp = true;
let stayAir = false;
let jumpSpeed = 0.05;
let maxJumpHeight = 12;
let originalY = mesh.position.y;


function animate() {
    invis.rotateY(-0.004);

    // Posição dos objetos
    const meshWorldPos = new THREE.Vector3();
    mesh.getWorldPosition(meshWorldPos);

    const cercaWorldPos = new THREE.Vector3();
    cercaMesh.getWorldPosition(cercaWorldPos);

    const distancia = meshWorldPos.distanceTo(cercaWorldPos);
    const distanciaX = Math.abs(meshWorldPos.x - cercaWorldPos.x);
    console.log(distancia);

    // Inicia o pulo se perto e ainda não pulando
    if (distancia < 17 && !isJumping) {
        isJumping = true;
        jumpUp = true;
        stayAir = true;
    }

    // Controle do pulo
    if (isJumping) {
        if (jumpUp) {
            mesh.position.y += jumpSpeed;
            if (mesh.position.y >= originalY + maxJumpHeight) {
                jumpUp = false; // atingiu o topo
            }
        } else {
            // Enquanto stayAir estiver ativo, não desce
            if (!stayAir) {
                mesh.position.y -= jumpSpeed;
                if (mesh.position.y <= originalY) {
                    mesh.position.y = originalY;
                    isJumping = false; // fim do pulo
                }
            }
        }
        if (stayAir && distanciaX > 3) { 
            stayAir = false;
        }
    }



    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //controls.update();
}
animate();
window.mudarCamera = mudarCamera;

