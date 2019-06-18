// Init scene & camera
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// Enable shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

// Init the camera mouse controls
controls = new THREE.OrbitControls( camera );

// Add galaxy background
scene.add(new THREE.Mesh(
  new THREE.SphereBufferGeometry(1000, 50, 50),
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('images/galaxy_starfield.png'),
    side: THREE.DoubleSide,
    shininess: 0
  })
));

//Add the planet 
PLANET_RADIUS = 1;
let planetMesh = new THREE.Mesh(
  new THREE.SphereBufferGeometry(PLANET_RADIUS, 32, 32), 
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('images/mars_4k_color.jpg'),
    bumpMap: new THREE.TextureLoader().load('images/mars_4k_bump.jpg'),
    bumpScale: 0.05
  })
);
planetMesh.receiveShadow = true;
planetMesh.castShadow = true;  
scene.add(planetMesh)

//Add the moon
MOON_RADIUS = 0.2;
MOON_DISTANCE = 1;
let moonMesh = new THREE.Mesh(
  new THREE.SphereBufferGeometry(MOON_RADIUS, 32, 32), 
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('images/moon_4k_map.jpg'),
    bumpMap: new THREE.TextureLoader().load('images/moon_4k_bump.jpg'),
    bumpScale: 0.01
  })
)
moonMesh.receiveShadow = true;
moonMesh.castShadow = true;  
moonMesh.position.x = PLANET_RADIUS + MOON_RADIUS + MOON_DISTANCE;
scene.add(moonMesh)

//Add lights
let light = new THREE.DirectionalLight( 0xdddddd, 0.8 ); 
scene.add(light);
light.castShadow = true;  
light.position.set(5, 0, 5);

scene.add(new THREE.AmbientLight( 0x444444, 0.5));

animate();

var D_THETA = 0.005;
var theta = 0;

function animate() {
  requestAnimationFrame( animate );
  //rotate animation
  planetMesh.rotation.y += (0.5*(Math.PI / 180)) % 360;
  moonMesh.rotation.y += (0.5*(Math.PI / 180)) % 360;

  //orbit animation
  theta += D_THETA;
  moonMesh.position.x = (PLANET_RADIUS + MOON_RADIUS + MOON_DISTANCE) * Math.cos(theta);
  moonMesh.position.z = (PLANET_RADIUS + MOON_RADIUS + MOON_DISTANCE) * Math.sin(theta);

  controls.update();
  renderer.render( scene, camera );
}

