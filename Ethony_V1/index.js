const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    let box = BABYLON.MeshBuilder.CreateBox("box", {})
    box.position.y = .5;

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
        diameter: 1.3,
        height: 1.2,
        tessellation: 3
    });
    roof.scaling.x = .75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    //Let's make the ground color green for grass
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width: 10,
        height: 10
    }, scene);
    ground.material = new BABYLON.StandardMaterial("ground", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

    //make new colors
    const red = new BABYLON.Color3(1, 0, 0);
    const green = new BABYLON.Color3(0, 1, 0);
    const blue = new BABYLON.Color3(0, 0, 1);
    const yellow = new BABYLON.Color3(1, 1, 0);
    const purple = new BABYLON.Color3(1, 0, 1);
    const white = new BABYLON.Color3(1, 1, 1);

    //add standard material roofmat to roof with boxmat diffuser
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg",
        scene);
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");

    //set the material properties to roofmat and boxmat
    roof.material = roofMat;
    box.material = boxMat;

    //make a bush outside my house
    const bush = BABYLON.MeshBuilder.CreateBox("bush", {
        size: .5
    });
    bush.position.x = -2;
    bush.position.y = .5;
    bush.position.z = -2;
    bush.material = new BABYLON.StandardMaterial("bushMat", scene);
    bush.material.diffuseTexture = new BABYLON.Texture(
        "https://www.babylonjs-playground.com/textures/bush.png", scene);

    // add a tree next to my bush
    const tree = BABYLON.MeshBuilder.CreateBox("tree", {
        size: .5
    });
    tree.position.x = -2;
    tree.position.y = .5;
    tree.position.z = -1;
    tree.material = new BABYLON.StandardMaterial("treeMat", scene);
    tree.material.diffuseTexture = new BABYLON.Texture(
        "https://www.babylonjs-playground.com/textures/tree.png", scene);

    //make a tree
    const tree2 = BABYLON.MeshBuilder.CreateBox("tree2", {
        size: .5
    });
    tree2.position.x = -2;
    tree2.position.y = .5;
    tree2.position.z = 1;
    tree2.material = new BABYLON.StandardMaterial("treeMat", scene);
    tree2.material.diffuseTexture = new BABYLON.Texture(
        "https://www.babylonjs-playground.com/textures/tree.png", scene);


    //mae my roof spin horizontally quickly
    const roofSpin = new BABYLON.Animation("roofSpin", "rotation.z", 30, BABYLON.Animation
        .ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keys = [];
    keys.push({
        frame: 0,
        value: 0
    });
    keys.push({
        frame: 20,
        value: Math.PI * 2
    });
    roofSpin.setKeys(keys);
    box.animations = [];
    box.animations.push(roofSpin);
    scene.beginAnimation(box, 0, 30, true);


    //make my house levitate and spin   
    const houseLevitate = new BABYLON.Animation("houseLevitate", "position.y", 30, BABYLON.Animation
        .ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keys2 = [];
    keys2.push({
        frame: 0,
        value: 0
    });
    keys2.push({
        frame: 20,
        value: .5
    });
    keys2.push({
        frame: 40,
        value: 0
    });
    houseLevitate.setKeys(keys2);
    box.animations = [];
    box.animations.push(houseLevitate);
    scene.beginAnimation(box, 0, 40, true);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON
        .Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    const music = new BABYLON.Sound("cello", "nathan.wav", scene, null, {
        loop: true,
        autoplay: true
    });


    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});