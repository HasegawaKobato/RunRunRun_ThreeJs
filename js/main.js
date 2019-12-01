(function () {
    let renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let cameraDistance = {
        x: 0,
        y: 5,
        z: 10
    }
    camera.rotation.set(-0.4, 0, 0);
    let loader = new THREE.GLTFLoader();
    let light = new THREE.AmbientLight(0x404040);
    let spotLight = new THREE.SpotLight(0xFFFFFF, 2, 100, 1, 0.1);
    let spotLightDistance = {
        x: 0,
        y: 10,
        z: 15
    }
    // scene.add(spotLight);
    scene.add(light);
    SetWebGLRenderer();
    SetScene();

    let world = new CANNON.World();
    SetWorld();

    // 讀取圖片素材
    var texture = new THREE.TextureLoader().load('../texture/floor.jpg');
    // 球剛體並連結網格
    let sphereShape = new CANNON.Sphere(1);
    let sphereCM = new CANNON.Material();
    let sphere = new CANNON.Body({
        mass: 10,
        shape: sphereShape,
        position: new CANNON.Vec3(0, 1, 0),
        material: sphereCM
    })
    world.add(sphere)

    let moveDistance = 0;
    let force = 0;
    let fallCoefficient = 0.01;
    let timer = 0;
    let isGameOver = false;
    let generateRatePerSecond = 0.3;
    let forwordDistance = 0.2;
    let generateObjectInterval = 60;
    let generateAmount = 1;
    let farestDistance = 0;
    let cloestDistance = 0;
    let halfFloor = 0;

    let sceneList = [];
    let objectList = [];
    // 生成初始物件（球體）
    for (let a = 0; a < OBJECTS.length; a++) {
        // 物件剛體並連結網格
        let C_type = OBJECTS[a].CANNON.shape.type;
        let C_shapeArgument = OBJECTS[a].CANNON.shape.argument;
        let C_material = OBJECTS[a].CANNON.materialArgu;

        let objectShape = new CANNON[C_type](...C_shapeArgument);
        let objectCM = new CANNON.Material(...C_material);
        let objectBody = new CANNON.Body({
            mass: OBJECTS[a].CANNON.body.mass,
            shape: objectShape,
            position: new CANNON.Vec3(OBJECTS[a].CANNON.body.position.x, OBJECTS[a].CANNON.body.position.y, OBJECTS[a].CANNON.body.position.z),
            material: objectCM
        })
        world.add(objectBody)

        // 物件網格
        let T_type = OBJECTS[a].THREE.geometry.type;
        let T_geometryArgument = OBJECTS[a].THREE.geometry.argument;
        let T_materialType = OBJECTS[a].THREE.materialType;

        let objectGeometry = new THREE[T_type](...T_geometryArgument)
        let materials = [];
        for (let b = 0; b < OBJECTS[a].THREE.materials.length; b++) {
            let material = new THREE[OBJECTS[a].THREE.materials[b].type]({
                color: OBJECTS[a].THREE.materials[b].argument.color
            })
            materials.push(material)
        }
        let objectMaterial = new THREE[T_materialType](materials)
        object = new THREE.Mesh(objectGeometry, objectMaterial)
        object.castShadow = true;
        object.receiveShadow = true;
        object.position.copy(objectBody.position)
        scene.add(object)

        let objectData = {
            body: objectBody,
            material: object,
            initPosition: {
                x: OBJECTS[a].CANNON.body.position.x,
                y: OBJECTS[a].CANNON.body.position.y,
                z: OBJECTS[a].CANNON.body.position.z
            }
        }
        objectList.push(objectData);
    }

    // 地板剛體並連結網格
    let groundShape = new CANNON.Plane()
    let groundCM = new CANNON.Material()
    let groundBody = new CANNON.Body({
        mass: 0,
        shape: groundShape,
        material: groundCM
    })
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    world.add(groundBody)
    let cubeGroundContact = new CANNON.ContactMaterial(groundCM, sphereCM, {
        friction: 0.5,
        restitution: 0.5
    })
    groundBody.position.set(0, 0, -40)
    world.addContactMaterial(cubeGroundContact)


    // 地板網格
    let groundGeometry = new THREE.PlaneGeometry(25, 300)
    let groundMaterial = new THREE.MeshPhongMaterial({
        map: texture
    })
    let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground)

    // 球網格
    let ballGeometry = new THREE.SphereGeometry(1, 50, 50)
    let ballMaterial = new THREE.MeshPhongMaterial({
        color: 0x33aaaa
    })
    ball = new THREE.Mesh(ballGeometry, ballMaterial)
    ball.castShadow = true;
    scene.add(ball)

    const timeStep = 1.0 / 60.0 // seconds
    spotLight.target = ball;
    spotLight.castShadow = true;

    function render() {
        DisplayTime();
        let pre = sphere.position.z;
        world.step(timeStep);
        timer++;
        if (timer >= generateObjectInterval) {
            for (let a = 0; a < generateAmount; a++) {
                GenerateObject();
            }
            timer = 0;
        }
        SphereMoveX();
        Force();
        if (ball) {
            sphere.position.z -= forwordDistance;
            ball.position.copy(sphere.position);
            ball.quaternion.copy(sphere.quaternion);
            if (ball.position.z / (-94 * (halfFloor + 1)) > 1) {
                halfFloor++;
                groundBody.position.set(0, 0, -94 * (halfFloor + 1) -40);
            }
            ground.position.copy(groundBody.position);
            ground.quaternion.copy(groundBody.quaternion);
            spotLight.position.set(sphere.position.x + spotLightDistance.x, sphere.position.y + spotLightDistance.y, sphere.position.z + spotLightDistance.z);
            camera.position.set(sphere.position.x + cameraDistance.x, cameraDistance.y, sphere.position.z + cameraDistance.z);
            
            if (Math.round((pre - sphere.position.z) * 10000) != Math.round(forwordDistance * 10000)) {
                GameOver();
            }
            for (let a = 0; a < objectList.length; a++) {
                objectList[a].material.position.copy(objectList[a].body.position)
            }

        }
        objectList.forEach(function (item, index) {
            if (item.body.position.z > camera.position.z) {
                objectList.splice(index, 1)
            }
        })

        cloestDistance = farestDistance;
        sceneList.forEach(function (item, index) {
            farestDistance = item.material.position.z < farestDistance ? item.material.position.z : farestDistance;
            cloestDistance = item.material.position.z >= cloestDistance ? item.material.position.z : cloestDistance;
        })
        sceneList.forEach(function (item, index) {
            if (item.material.position.z > camera.position.z) {
                if (item.material.position.z == cloestDistance) {
                    item.material.position.set(item.material.position.x, item.material.position.y, farestDistance - 11)
                    item.spotLight.position.set(item.spotLight.position.x, item.spotLight.position.y, farestDistance - 11)
                    item.lightObject.position.set(item.lightObject.position.x, item.lightObject.position.y, farestDistance - 11)
                }
            }
        })
        NextStage();

        requestAnimationFrame(render)
        renderer.render(scene, camera);

    }
    
    function SetWorld() {
        world.gravity.set(0, -9.8, 0)
        world.broadphase = new CANNON.NaiveBroadphase()
    }

    function SetScene() {
        scene.background = new THREE.Color(0x000000);
    }

    function SetWebGLRenderer() {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
        document.body.appendChild(renderer.domElement);
        // console.log(renderer)
    }

    document.addEventListener('keydown', function (event) {
        if (event.key == 'a' || event.key == 'ArrowLeft') {
            moveDistance = -1;
        } else if (event.key == 'd' || event.key == 'ArrowRight') {
            moveDistance = 1;
        } else if (event.key == 'w' || event.key == 'ArrowUp' || event.key == ' ') {
            if (sphere.position.y <= 1) {
                force = 32;
            }
        }
    })

    function SphereMoveX() {
        if (Math.abs(sphere.position.x + moveDistance) < 9) {
            if (moveDistance != 0) {
                let speedRate = 3;
                if (moveDistance > 0) {
                    moveDistance = moveDistance - Math.abs(moveDistance / speedRate);
                    sphere.position.x = sphere.position.x + moveDistance;
                } else {
                    moveDistance = moveDistance + Math.abs(moveDistance / speedRate);
                    sphere.position.x = sphere.position.x + moveDistance;
                }
                if (Math.round(moveDistance * 10000) == 0) {
                    moveDistance = 0;
                }
            }
        }
    }

    function Force() {
        if (force > 0) {
            sphere.position.y += force * fallCoefficient;
            force -= 9.8 * 0.1;
        } else {
            force = 0;
        }
    }


    function GenerateObject() {
        let generateRandom = Math.floor(Math.random() * 100);
        if (generateRatePerSecond * 100 > generateRandom) {
            let randomSize = getRandomRange(0.5, 1.9);
            let randomX = getRandomRange(-(ground.geometry.parameters.width / 2), 8);
            let randomY = getRandomRange(randomSize, 5);
            let randomZ = getRandomRange(sphere.position.z - (20 * (1 + forwordDistance)), sphere.position.z - (50 * (1 + forwordDistance)));
            let randomMass = getRandomRange(1, 10);
            // 物件剛體並連結網格
            let objectShape = new CANNON.Sphere(randomSize);
            let objectCM = new CANNON.Material();
            let objectBody = new CANNON.Body({
                mass: randomMass,
                shape: objectShape,
                position: new CANNON.Vec3(randomX, randomY, randomZ),
                material: objectCM
            })
            world.add(objectBody)

            // 物件網格
            let objectGeometry = new THREE.SphereGeometry(randomSize, 50, 50)
            let objectMaterial = new THREE.MeshPhongMaterial({
                color: Math.random() * 0xffffff
            })
            object = new THREE.Mesh(objectGeometry, objectMaterial)
            object.castShadow = true;
            object.receiveShadow = true;
            object.position.copy(objectBody.position)
            scene.add(object)

            let objectData = {
                body: objectBody,
                material: object,
                initPosition: {
                    x: randomX,
                    y: randomY,
                    z: randomZ
                }
            }
            objectList.push(objectData);
        }
    }


    (async function () {
        // 生成初始場景（牆&燈）
        for (let a = 0; a < SCENE.length; a++) {
            await new Promise(res => {
                let lightLoader = new THREE.GLTFLoader().load('../3DModel/light/scene.gltf', function (gltf) {
                    farestDistance = Math.abs(SCENE[a].CANNON.body.position.z) > farestDistance ? Math.abs(SCENE[a].CANNON.body.position.z) : farestDistance
                    let lightObject = gltf.scene;

                    // 物件網格
                    let T_type = SCENE[a].THREE.geometry.type;
                    let T_geometryArgument = SCENE[a].THREE.geometry.argument;
                    let T_materialType = SCENE[a].THREE.materialType;

                    let objectGeometry = new THREE[T_type](...T_geometryArgument)
                    let materials = [];
                    for (let b = 0; b < SCENE[a].THREE.materials.length; b++) {
                        let material = new THREE[SCENE[a].THREE.materials[b].type]({
                            map: SCENE[a].THREE.materials[b].argument.map
                        })
                        materials.push(material)
                    }
                    let objectMaterial;
                    if (materials.length == 0) {
                        objectMaterial = new THREE[T_materialType]({
                            map: SCENE[a].THREE.map
                        })
                    } else {
                        objectMaterial = new THREE[T_materialType](materials)
                    }

                    object = new THREE.Mesh(objectGeometry, objectMaterial)
                    object.castShadow = true;
                    object.receiveShadow = true;
                    object.position.set(SCENE[a].CANNON.body.position.x, SCENE[a].CANNON.body.position.y, SCENE[a].CANNON.body.position.z)
                    scene.add(object)

                    // 加入燈光
                    let angle90 = Math.PI / 2;
                    lightObject.scale.set(0.25, 0.25, 0.25);
                    lightObject.position.set(SCENE[a].CANNON.body.position.x > 0 ? 11 : -11, 3, SCENE[a].CANNON.body.position.z);
                    lightObject.rotation.set(0, SCENE[a].CANNON.body.position.x > 0 ? -angle90 : +angle90, 0);

                    let lightSpotLight = new THREE.SpotLight(0xFFC35C, 0.5, 30, 2, 1, 1);
                    lightSpotLight.position.set(SCENE[a].CANNON.body.position.x > 0 ? 11 : -11, 4.5, SCENE[a].CANNON.body.position.z);
                    lightSpotLight.target = lightObject;
                    lightSpotLight.castShadow = true;

                    scene.add(lightObject)
                    scene.add(lightSpotLight)

                    let sceneListData = {
                        material: object,
                        spotLight: lightSpotLight,
                        lightObject: lightObject,
                        initPosition: {
                            x: SCENE[a].CANNON.body.position.x,
                            y: SCENE[a].CANNON.body.position.y,
                            z: SCENE[a].CANNON.body.position.z
                        }
                    }
                    sceneList.push(sceneListData);
                    res();
                });
            })
        }
        await new Promise(res => {
            render();
            res();
        })
    })()

    function getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function GameOver() {
        if (!isGameOver) {
            isGameOver = true;
            alert('Game Over!')
            location.reload();
        }
    }

    function DisplayTime() {
        let info = document.querySelector('#info');
        info.innerHTML = world.time.toFixed(2);
    }

    // let generateRatePerSecond = 0.3;
    // let forwordDistance = 0.2;
    // let generateObjectInterval = 60;
    // let generateAmount = 1;
    function NextStage() {
        if (generateRatePerSecond < 1) {
            generateRatePerSecond += 0.001;
        } else {
            generateAmount++;
            generateObjectInterval = 60 - generateAmount
            generateRatePerSecond = 0.3;
        }
        forwordDistance += 0.0003;
        generateObjectInterval -= 0.01;
    }
})()