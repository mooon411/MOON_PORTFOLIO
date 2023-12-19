// BASIC parameters
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threeJs").appendChild(renderer.domElement);
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 8, 10);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();

scene.background = new THREE.Color(0xffbbdc);
scene.fog = new THREE.Fog(0xffbbdc, 10, 16);

// CREATE City
function init() {
  var segments = 2;
  for (var i = 1; i < 100; i++) {
    var geometry = new THREE.BoxGeometry(1, 0, 1, segments, segments, segments);
    var material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      wireframe: false,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    var wmaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
      side: THREE.DoubleSide,
    });

    var cube = new THREE.Mesh(geometry, material);
    var wire = new THREE.Mesh(geometry, wmaterial);
    var floor = new THREE.Mesh(geometry, material);
    var wfloor = new THREE.Mesh(geometry, wmaterial);

    cube.add(wfloor);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

    floor.scale.y = 0.05;
    cube.scale.y = 0.1 + Math.abs(mathRandom(8));

    var cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);

    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());

    floor.position.set(cube.position.x, 0, cube.position.z);

    town.add(floor);
    town.add(cube);
  }

  // Particular
  var gmaterial = new THREE.MeshToonMaterial({
    color: 0xffbef9,
    side: THREE.DoubleSide,
  });
  var gparticular = new THREE.CircleGeometry(0.01, 3);
  var aparticular = 5;

  for (var h = 1; h < 300; h++) {
    var particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(
      mathRandom(aparticular),
      mathRandom(aparticular),
      mathRandom(aparticular)
    );
    particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
    smoke.add(particular);
  }

  var pmaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    roughness: 10,
    metalness: 0.6,
    opacity: 0.9,
    transparent: true,
  });
  var pgeometry = new THREE.PlaneGeometry(60, 60);
  var pelement = new THREE.Mesh(pgeometry, pmaterial);
  pelement.rotation.x = (-90 * Math.PI) / 180;
  pelement.position.y = -0.001;
  pelement.receiveShadow = true;

  city.add(pelement);
}
// MOUSE function
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
  INTERSECTED;
var intersected;

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("touchstart", onDocumentTouchStart, false);
window.addEventListener("touchmove", onDocumentTouchMove, false);

// Lights
var ambientLight = new THREE.AmbientLight(0xffffff, 4);
var lightFront = new THREE.SpotLight(0xffffff, 20, 10);
var lightBack = new THREE.PointLight(0xffffff, 0.9);

var spotLightHelper = new THREE.SpotLightHelper(lightFront);

lightFront.rotation.x = (45 * Math.PI) / 180;
lightFront.rotation.z = (-45 * Math.PI) / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShadow = true;
lightFront.shadow.mapSize.width = 6000;
lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
lightBack.position.set(0, 6, 0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(lightBack);
scene.add(city);
city.add(smoke);
city.add(town);

// GRID Helper
var gridHelper = new THREE.GridHelper(60, 120, 0x472661, 0x000000);
city.add(gridHelper);

// CAR world
var generateCar = function () {};
// LINES world
var createCars = function (cScale = 2, cPos = 20, cColor = 0x9b38ea) {
  var cMat = new THREE.MeshToonMaterial({
    color: cColor,
    side: THREE.DoubleSide,
  });
  var cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
  var cElem = new THREE.Mesh(cGeo, cMat);
  var cAmp = 3;

  if (createCarPos) {
    createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = mathRandom(cAmp);

    TweenMax.to(cElem.position, 3, {
      x: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
    });
  } else {
    createCarPos = true;
    cElem.position.x = mathRandom(cAmp);
    cElem.position.z = -cPos;
    cElem.rotation.y = (90 * Math.PI) / 180;

    TweenMax.to(cElem.position, 5, {
      z: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
      ease: Power1.easeInOut,
    });
  }
  cElem.receiveShadow = true;
  cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

var generateLines = function () {
  for (var i = 0; i < 60; i++) {
    createCars(0.1, 20);
  }
};

// CAMERA position
var cameraSet = function () {
  createCars(0.1, 20, 0xffffff);
};

// ANIMATE
var animate = function () {
  var time = Date.now() * 0.00005;
  requestAnimationFrame(animate);

  city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
  city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
  if (city.rotation.x < -0.05) city.rotation.x = -0.05;
  else if (city.rotation.x > 1) city.rotation.x = 1;
  var cityRotation = Math.sin(Date.now() / 5000) * 13;

  for (let i = 0, l = town.children.length; i < l; i++) {
    var object = town.children[i];
    //object.scale.y = Math.sin(time*50) * object.rotationValue;
    //object.rotation.y = (Math.sin((time/object.rotationValue) * Math.PI / 180) * 180);
    //object.rotation.z = (Math.cos((time/object.rotationValue) * Math.PI / 180) * 180);
  }

  smoke.rotation.y += 0.01;
  smoke.rotation.x += 0.01;

  camera.lookAt(city.position);
  renderer.render(scene, camera);
};

// START functions
generateLines();
init();
animate();
