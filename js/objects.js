let OBJECTS = [
    {
        CANNON: {
            shape: {
                type: 'Sphere',
                argument: [2]
            },
            materialArgu: [],
            body: {
                mass: 3,
                position: {
                    x: 5,
                    y: 2,
                    z: -20
                }
            }
        },
        THREE: {
            geometry: {
                type: 'SphereGeometry',
                argument: [2, 50, 50]
            },
            materialType: 'MeshPhongMaterial',
            materials: [{
                type: 'MeshPhongMaterial',
                argument: {
                    color: 0x33aaaa
                }
            }],
        }
    },
    {
        CANNON: {
            shape: {
                type: 'Sphere',
                argument: [1.5]
            },
            materialArgu: [],
            body: {
                mass: 5,
                position: {
                    x: -5,
                    y: 3,
                    z: -22
                }
            }
        },
        THREE: {
            geometry: {
                type: 'SphereGeometry',
                argument: [1.5, 50, 50]
            },
            materialType: 'MeshPhongMaterial',
            materials: [{
                type: 'MeshPhongMaterial',
                argument: {
                    color: 0x33aaaa
                }
            }],
        }
    }
]