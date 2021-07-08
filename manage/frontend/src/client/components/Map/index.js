import React from 'react'

import Pin from '../../assets/marker/pin.png'
import {Basemap} from './base'

let loaded = false

export class WebMapView extends Basemap {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  state = {
    graphicsLayer: null,
    xcoordinate: null,
    ycoordinate: null,
    currentPointGraphic: null,
    graphicPolygon: null,
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    const {initialXcoordinate, initialYcoordinate} = this.props
    this.handleLoadMap()
      .then(res => {
        this.initLayers()
        this.initEvents()
        this.setPoint(initialXcoordinate, initialYcoordinate)
        loaded = true
        this.handleLocationChange()
      })
  }

  componentDidUpdate(prevProps) {

    if (loaded) {
      const {initialXcoordinate, initialYcoordinate} = this.props
      if (prevProps.initialXcoordinate != this.props.initialXcoordinate || prevProps.initialYcoordinate != this.props.initialYcoordinate) {
        this.setPoint(initialXcoordinate, initialYcoordinate)
      }

      if ((prevProps.type !== this.props.type
        || prevProps.cityAndDistrictId !== this.props.cityAndDistrictId
        || prevProps.subDistrictId !== this.props.subDistrictId) && this.props.visible) {
        this.clearPolygon()
        this.handleLocationChange()
      }

      if (prevProps.visible !== this.props.visible) {
        if (!this.props.visible) {
          this.clearPoint()
          this.clearPolygon()
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.esri.mapView) {
      // destroy the map view
      this.esri.mapView = null
    }
  }

  initLayers = () => {
    try {
      const graphicsLayer = new this.esri.GraphicsLayer()
      this.esri.map.add(graphicsLayer)
      this.setState({graphicsLayer})
    } catch (e) {
      console.error('naba ! -->: WebMapView -> initLayers -> e', e)
    }
  }

  initEvents = () => {
    try {
      const onClickEvent = (evt) => {
        if (evt.mapPoint) {
          this.setPoint(evt.mapPoint.x, evt.mapPoint.y)
        }
      }
      this.esri.mapView.on('click', (e) => onClickEvent(e))
    } catch (e) {
      console.error('naba ! -->: WebMapView -> initEvents -> e', e)
    }
  }

  getServiceUrl = () => {
    const {type, token} = this.props
    // eslint-disable-next-line max-len
    switch (type) {
      // case "city": return "https://dms.ulaanbaatar.mn/arcgis/rest/services/AdminUnit/AdminUnit/FeatureServer/1"
      // case "city": return "https://dms.ulaanbaatar.mn/arcgis/rest/services/AdminUnit/AdminUnit/FeatureServer/2"
      // case "district": return "https://dms.ulaanbaatar.mn/arcgis/rest/services/AdminUnit/AdminUnit/FeatureServer/2"
      // case "subDistrict": return "https://dms.ulaanbaatar.mn/arcgis/rest/services/AdminUnit/AdminUnit/FeatureServer/3"
      case 'cityAndDistrict':
        return `https://services7.arcgis.com/ClewpESmgiVuokwz/arcgis/rest/services/soum_baggdb/FeatureServer/1?token=${token}`
      case 'subDistrict':
        return `https://services7.arcgis.com/ClewpESmgiVuokwz/ArcGIS/rest/services/soum_baggdb/FeatureServer/0?token=${token}`
    }
  }

  buildQuery = () => {
    const {type, cityId, cityAndDistrictId, subDistrictId} = this.props
    let query

    switch (type) {
      case 'cityAndDistrict':
        query = new this.esri.Query({
          outFields: ['Id'],
          returnGeometry: true,
          where: `ID='${cityAndDistrictId}'`,
        })
        break

      case 'subDistrict':
        query = new this.esri.Query({
          outFields: ['Id'],
          returnGeometry: true,
          // where: `(PARENT_ID='${cityAndDistrictId}') AND (name LIKE '${subDistrictId}%')`,
          where: `CODE='0${subDistrictId}'`,
        })
        break
    }
    return query
  }

  handleLocationChange = () => {
    const {graphicsLayer} = this.state
    const {type} = this.props
    const SR = 102100
    const symbolType = 'solid'
    const symbolStyleDash = 'dash'

    if (type) {
      const queryTask = new this.esri.QueryTask({url: this.getServiceUrl()})
      queryTask.execute(this.buildQuery())
        .then((result) => {
          // console.log("goto ub result - ", result.features)
          if (result && result.features) {
            this.clearPolygon()
            for (let i = 0; i < result.features.length; i += 1)
            {
              this.project([result.features[i].geometry], SR)
                .then((projectResult) => {
                  if (projectResult.length > 0) {
                    this.esri.mapView.extent = projectResult[0].extent
                    const graphicPolygon = new this.esri.Graphic()
                    graphicPolygon.symbol = {
                      type: 'simple-fill',
                      color: [197, 171, 245, 0.2],
                      style: symbolType,
                      outline: {
                        color: [197, 171, 245, 1],
                        width: 1,
                        style: symbolStyleDash,
                        join: 'round',
                      },
                    }
                    graphicPolygon.geometry = projectResult[0]

                    graphicsLayer.add(graphicPolygon)
                    this.setState({graphicPolygon})
                  }
                }, (error) => {
                  console.error('project function error - ', error)
                })
            }
          }
        }, (error) => {
          console.error('error - ', error)
        })
    }

  }

  clearPoint = () => {
    const {currentPointGraphic, graphicsLayer} = this.state
    if (graphicsLayer && currentPointGraphic) {
      graphicsLayer.remove(currentPointGraphic)
    }
  }

  clearPolygon = () => {
    const {graphicsLayer, graphicPolygon} = this.state
    if (graphicsLayer && graphicPolygon) {
      graphicsLayer.remove(graphicPolygon)
    }
  }

  setPoint = (xcoordinate, ycoordinate) => {
    const {setCoordinate} = this.props
    const {graphicsLayer} = this.state

    this.clearPoint()
    const longLat = this.esri.webMercatorUtils.xyToLngLat(xcoordinate, ycoordinate)
    let point = {
      type: 'point',
      longitude: longLat[0],
      latitude: longLat[1],
    }

    let markerSymbol = {
      type: 'picture-marker',
      url: Pin,
      width: '39px',
      height: '40px',
      yoffset: 12,
    }

    let newPointGraphic = new this.esri.Graphic({
      geometry: point,
      symbol: markerSymbol,
    })
    graphicsLayer.add(newPointGraphic)

    this.setState({currentPointGraphic: newPointGraphic, xcoordinate, ycoordinate})
    setCoordinate(xcoordinate, ycoordinate, longLat)
    console.log('naba ! -->: WebMapView -> setPoint -> longLat', longLat)

    if (xcoordinate && ycoordinate)
      this.esri.mapView.center = [longLat[0], longLat[1]]
  }

  render() {
    return (
      <div className='webmap' ref={this.mapRef} style={{height: '400px'}}/>
    )
  }
}
