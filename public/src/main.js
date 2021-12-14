import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 400, 700);

const canvasDom = document.getElementById('canvas');
const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas: canvasDom })
const controls = new OrbitControls(camera, renderer.domElement);

const init = () => {
    scene.background = new THREE.Color('#f0f0f0');
    console.log('here');

    renderer.setSize(window.innerWidth, window.innerHeight)


    const loader = new FontLoader();
    let textGeo;
    let textMesh1

    loader.load('../fonts/helvetiker_regular.typeface.json', (font) => {
        textGeo = new TextGeometry('Nelson\'s A Hoe!', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });

        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x084C61, flatShading: true }), // front
            new THREE.MeshPhongMaterial({ color: 0xDB504A }) // side
        ];

        textGeo.computeBoundingBox();

        const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

        textMesh1 = new THREE.Mesh(textGeo, materials);

        textMesh1.position.x = centerOffset;
        textMesh1.position.y = 1;
        textMesh1.position.z = 0;

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        controls.maxDistance = 800;
        controls.minDistance = 2;

        scene.add(textMesh1);
    });

    addLights();
}

const addLights = () => {
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);
}


window.addEventListener(
    'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }, false
)

const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

const render = () => {
    renderer.render(scene, camera)
}

window.onload = (event) => {
    init();
    animate();
};