import React, { useRef, useEffect } from 'react';
import { View, Map } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';

const MapView = ({width = '100%', height, coords,  zoom = 1}) => {

  const ref = useRef(null);
  const mapRef = useRef(null);

  const setWeatherMap = (e) => {
    mapRef.current.getLayers().getArray()[1].setSource(
      new XYZ({url: `https://tile.openweathermap.org/map/${e.currentTarget.value}/{z}/{x}/{y}.png?appid=67e4ff0c3d15ab9f5d01e66ccc7793c0`})
    );
  }

  useEffect(() => {
    if (ref.current && !mapRef.current) {

      var weather_tile = new TileLayer({
        source: new XYZ({
          url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=67e4ff0c3d15ab9f5d01e66ccc7793c0',
        }),
        visible: true,
        name: 'precipitation_new',
        zIndex: 1,  // baseLayes has 0
        opacity: .9
      });

      mapRef.current = new Map({
        target: ref.current,
        layers: [
          new TileLayer({source: new OSM()}),
          weather_tile
        ],
        view: new View({center: [0, 0], zoom: zoom}),
        controls: []
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
    
  }, [ref, mapRef]);

  useEffect(() => {
    const center = [coords.longitude, coords.latitude];
    const transformCenter = fromLonLat(center);

    mapRef.current.getView().setCenter(transformCenter);
    mapRef.current.getView().setZoom(zoom);
  }, [coords]);

  return (
    <>
      <div className="form-group d-flex align-items-center justify-content-center">
        <label htmlFor="weather_layer" className="text-primary me-1 ">Weather Layer: </label>
        <select name="weather_layer" id="weather_layer" onChange={e => setWeatherMap(e)} className="form-control form-control-sm text-primary border border-primary">
          <option value="temp_new">Temperature</option>
          <option value="clouds_new">Clouds</option>
          <option value="precipitation">Precipitation</option>
          <option value="pressure">Pressure</option>
          <option value="wind_new">Wind</option>
        </select>
      </div>
      <div className="card">
        <div className="card-body p-0 shadow">
          <div ref={ref} style={{width: width, height: height}}></div>
        </div>
      </div>
    </>
  );
}

export default MapView;
