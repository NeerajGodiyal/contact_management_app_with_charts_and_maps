import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { MapContainer, TileLayer } from "react-leaflet";
import WorldMap from "../components/WorldMap";

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    _id: string;
    lat: number;
    long: number;
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

const Dashboard: React.FC = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [worldwideData, setWorldwideData] = useState<any | null>(null); // Add worldwideData state

  useEffect(() => {
    axios("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const data = res.data as CountryData[];
        setCountriesData(data);
      })
  }, []);

  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;
        const newChartData: ChartData = {
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(data.cases),
              fill: false,
              borderColor: "#f50057",
              tension: 0.2,
            },
          ],
        };
        setChartData(newChartData);
      })

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

  }, []);

  useEffect(() => {
    axios("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        setWorldwideData(res.data);
      })
  }, []);

  return (
    <div className="w-full pt-20 px-4 pb-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">Corona Cases Chart</h1>
      <div className="border-2 border-red-100 w-11/12 m-auto 10 auto 10">
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <h1 className="text-pink-600 mb-4 font-bold text-2xl">Loading...</h1>
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-4 text-blue-500">Corona Cases World Map</h1>
      <div className="border-2 border-blue-500 w-11/12 m-auto 5 auto 5">
        <MapContainer
          style={{ height: "500px" }}
          className="m-auto w-full border-blue-700"
          bounds={[[-60, -180], [85, 180]]}
          zoom={2}
          center={[20, 40]}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <WorldMap countriesData={countriesData} />
        </MapContainer>
      </div>
      <div className="mt-4">
        <h1 className="text-4xl font-bold mb-4 text-green-500">Worldwide COVID-19 Data</h1>
        <div className="border-2 border-green-500 w-11/12 m-auto 5 auto 5 p-4">
          {worldwideData ? (
            <div>
              <p>Total Cases: {worldwideData.cases}</p>
              <p>Total Recovered: {worldwideData.recovered}</p>
              <p>Total Deaths: {worldwideData.deaths}</p>
            </div>
          ) : (
            <h1 className="text-green-500 mb-4 font-bold text-2xl">Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
