// Initialize the Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Focus camera on Canada
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-106.3468, 56.1304, 4000000)
});

// Load GeoJSON for provinces (filled polygons)
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('provinces.geojson', {
    clampToGround: true
})).then(function(dataSource) {
    dataSource.entities.values.forEach(function(entity) {
        entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.5);
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.WHITE;
    });
});

// Optionally load province borders as a separate GeoJSON
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('province-borders.geojson', {
    clampToGround: true
})).then(function(dataSource) {
    dataSource.entities.values.forEach(function(entity) {
        entity.polyline = new Cesium.PolylineGraphics({
            positions: entity.polyline.positions,
            width: 2,
            material: Cesium.Color.YELLOW
        });
    });
});
