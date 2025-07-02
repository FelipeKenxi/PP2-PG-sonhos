import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;
camera.position.y = 0.6;
const scene = new THREE.Scene();

//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;
//controls.dampingFactor = 0.03;

//felipe p melo. Objeto invisivel que vai ser o pai das ovelhas e fazelas rotacionar em torno dela.
const invisGeo = new THREE.SphereGeometry(0.0, 18, 9);
const invisMat = new THREE.MeshBasicMaterial({
    color: 0xffff66,
    transparent: true
});
const invis = new THREE.Mesh(invisGeo, invisMat);
scene.add(invis);

const geo = new THREE.SphereGeometry(2.2, 10, 9);
const mat = new THREE.MeshStandardMaterial({
    color: 0x0066ff,
    flatShading: true,
    transparent: true,
    opacity: 1.0
});
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
const mesh = new THREE.Mesh(geo, mat);
mesh.add(wireMesh);
invis.add(mesh);
mesh.position.x = invis.position.x + 3;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000);
scene.add(hemiLight);

function animate() {
    invis.rotateY(0.004);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //controls.update();
}
animate();