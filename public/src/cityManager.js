class CityManager {
    constructor(){
        this.geos = {}
        this.mats = {}
        this.nameMap = {
            "darkGreenGrass" : "Cube_Cube001_Material001_0",
            "lightGreenGrass" : "Cube_Cube001_Material002_0",
            "soil": "Cube_Cube001_Material003_0",
            "purpleDiamond": "Cone_Material007_0",
            "litleLightGreenGrass" :"Cube006_Cube017_Material001_0",
            "litleDarkGreenGrass" :"Cube006_Cube017_Material002_0",
            "litleSoil" :"Cube006_Cube017_Material003_0",
            "guard" :"Cube005_Cube013_Material012_0",
            "boxBorder" :"Cube001_Cube005_Material005_0",
            "boxFaces" :"Cube001_Cube005_Material004_0",
            "upperShroom": "Cylinder001_Material009_0",
            "lowerShroom": "Cylinder001_Material010_0",
            "coin": "Cylinder_Material006_0"
        }
       
        this.meshMap = [
            
            // animated
            // { 
            //     name: this.nameMap['coin'],
            //     position: {
            //         x: 13, y: 3, z: 13
            //     },
            //     rotation: {
            //         x: 0, y: 0, z: 0
            //     },
            //     scale: {
            //         x: 1, y: 1 , z: 1
            //     },
            //     animation: mesh => {
            //         mesh.position.y = 3 + Math.sin(new Date() * 0.001) 
            //     }
            // },
            { 
                name: this.nameMap['soil'],
                position: {
                    x: 0, y: 0, z: 0
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 7, y: 0.5 , z: 7
                }
            },
            { 
                name: this.nameMap['darkGreenGrass'],
                position: {
                    x: 0, y: 0.5, z: 0
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 7, y: 0.5 , z: 7
                }
            },
            { 
                name: this.nameMap['lightGreenGrass'],
                position: {
                    x: 0, y: 0.5, z: 0
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 7, y: 0.5 , z: 7
                }
            },
            // wall
            { 
                name: this.nameMap['soil'],
                position: {
                    x: -13, y: 3, z: 0
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 0.5, y: 10 , z: 7
                }
            },
            { 
                name: this.nameMap['soil'],
                position: {
                    x: 0, y: 3, z: 13
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 7, y: 10, z: 0.5
                }
            },
            { 
                name: this.nameMap['soil'],
                position: {
                    x: 0, y: 3, z: -13
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 7, y: 10 , z: 0.5
                }
            },
            { 
                name: this.nameMap['soil'],
                position: {
                    x: 13, y: 3, z: 0
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 0.5, y: 10 , z: 7
                }
            },
            { 
                name: this.nameMap['guard'],
                position: {
                    x: 4, y: 1, z: 11.95
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 1 , z: 1
                }
            },
            { 
                name: this.nameMap['guard'],
                position: {
                    x: -4, y: 1, z: 11.95
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 1 , z: 1
                }
            },
            { 
                name: this.nameMap['boxFaces'],
                position: {
                    x: -2.5, y: 1, z: 11.2
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 1 , z: 1
                }
            },
            { 
                name: this.nameMap['boxBorder'],
                position: {
                    x: -2.5, y: 1, z: 11.2
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 1 , z: 1
                }
            },
            { 
                name: this.nameMap['boxBorder'],
                position: {
                    x: -1.5, y: 0.8, z: 11.4
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 0.5 , z: 0.5
                }
            },
            { 
                name: this.nameMap['boxFaces'],
                position: {
                    x: -1.5, y: 0.8, z: 11.4
                },
                rotation: {
                    x: 0, y: 0, z: 0
                },
                scale: {
                    x: 1, y: 0.5 , z: 0.5
                }
            },
        ]
    }

}