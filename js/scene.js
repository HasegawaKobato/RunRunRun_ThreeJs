let texture01 = new THREE.TextureLoader().load('../texture/pngtree-brick-wall-pattern-png-image_1109848.jpg');
let SCENE = [{
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: 11
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: 11
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: 0
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: -11
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: 0
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: -11
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: -22
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: -22
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: -33
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: -33
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: 17.5,
                y: 5,
                z: -44
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}, {
    CANNON: {
        shape: {
            type: 'Box',
            argument: [new CANNON.Vec3(10, 10, 10)]
        },
        materialArgu: [],
        body: {
            mass: 3,
            position: {
                x: -17.5,
                y: 5,
                z: -44
            }
        }
    },
    THREE: {
        geometry: {
            type: 'BoxGeometry',
            argument: [10, 10, 10]
        },
        materialType: 'MeshPhongMaterial',
        map: texture01,
        materials: [],
    }
}]