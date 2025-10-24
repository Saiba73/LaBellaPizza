import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("#visor_de_pizza");
let escena, camara, render;

canvas.height = 425
canvas.width = 550
console.log(canvas.width)
console.log(canvas.height)

escena = new THREE.Scene();

camara = new THREE.PerspectiveCamera(
  75,
  canvas.width / canvas.height,
  0.1,
  1000
);
camara.position.z = 6;
camara.position.y = -1;

render = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
});
render.outputEncoding = THREE.sRGBEncoding;

const loader = new GLTFLoader();
loader.load(
  "../../src/assets/PizzaBase.glb",

  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.x = 0.5
    escena.add(model);
    console.log("Se cargo el modelo!");
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
  },

  function (error) {
    console.error("ocurrio un error: ", error);
  }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // White light, intensity 1.5
escena.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0); // Sky color, Ground color, Intensity
escena.add(hemisphereLight);

const controles = new OrbitControls(camara, render.domElement);
controles.target.set(0, 0, 0); 
controles.enableDamping = true;
controles.dampingFactor = 0.05;
controles.screenSpacePanning = false;
controles.minDistance = 2;
controles.maxDistance = 10;


const renderizar = (time) => {
  requestAnimationFrame(renderizar);
  controles.update()
  render.render(escena, camara);
};
renderizar();
