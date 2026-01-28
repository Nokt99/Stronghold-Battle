block {
    definition: "wood"

    state {
        orientation: "north"
        variant: "default"
        health: 100
    }

    worldProperties {
        position {
            x: 0
            y: 0
            z: 0
        }

        chunk: "0_0"
        loaded: true
    }

    dropLogic {
        useDefinitionDropTable: true
    }

    render {
        modelFromDefinition: true
        textureFromDefinition: true
    }
}
