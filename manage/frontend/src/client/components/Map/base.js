import React from 'react'
import {loadModules} from 'esri-loader'
import {message} from 'antd'

export class Basemap extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  static esri = {
    map: null,
    mapView: null,

    Graphic: null,
    GraphicsLayer: null,

    Featurelayer: null,
    QueryTask: null,
    Query: null,
    ProjectParameters: null,
    SpatialReference: null,
    GeometryService: null,
    SimpleFillSymbol: null,
    SimpleLineSymbol: null,
    webMercatorUtils: null,
  }

  project = (geometryList, wkId) => {
    let projectParams = new this.esri.ProjectParameters({
      geometries: geometryList,
      outSpatialReference: new this.esri.SpatialReference({wkid: wkId}),
    })
    return this.esri.GeometryService.project(projectParams)
  }

  handleLoadMap = async () => {
    await loadModules(['esri/Map', 'esri/views/MapView', 'esri/geometry/Point',
      'esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/widgets/Locate',
      'esri/layers/FeatureLayer',
      'esri/tasks/QueryTask',
      'esri/tasks/support/Query',
      'esri/tasks/support/ProjectParameters',
      'esri/geometry/SpatialReference',
      'esri/tasks/GeometryService',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/geometry/support/webMercatorUtils',
    ], {css: true})
      .then((
        [ArcGISMap, MapView, Point, Graphic, GraphicsLayer, Locate,
          Featurelayer, QueryTask, Query, ProjectParameters, SpatialReference,
          GeometryService, SimpleFillSymbol, SimpleLineSymbol, webMercatorUtils],
      ) => {

        const map = new ArcGISMap({
          // basemap: 'topo-vector',
          basemap: 'satellite',
        })

        // load the map view at the ref's DOM node
        const mapView = new MapView({
          container: this.mapRef.current,
          map: map,
          center: [106.918, 47.922],
          zoom: 14,
        })

        const geometryService = new GeometryService({
          url: 'https://dms.ulaanbaatar.mn/arcgis/rest/services/Utilities/Geometry/GeometryServer',
        })

        this.esri = {
          map,
          mapView: mapView,
          Graphic,
          GraphicsLayer,

          Featurelayer,
          QueryTask,
          Query,
          ProjectParameters,
          SpatialReference,
          GeometryService: geometryService,
          SimpleFillSymbol,
          SimpleLineSymbol,
          webMercatorUtils,
        }

        let locate = new Locate({
          view: mapView,
          useHeadingEnabled: false,
          goToOverride: function(view, options) {
            options.target.scale = 1500  // Override the default map scale
            return view.goTo(options.target)
          },
        })

        mapView.ui.add(locate, 'top-left')
      }).catch(err => {
        message.error(`Газрын зургын алдаа: ${err.message}`)
        console.error(err)
      })
  }

  render() {
    return (
      <div/>
    )
  }
}
