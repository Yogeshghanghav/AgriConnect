import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Weather = () => {
    const [weatherInfo, setWeatherInfo] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const API_KEY = '9be535833e2e2d06ddfefc79c581fb26';

    const changeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        fetchAPI(input);
        setInput('');
    };

    const fetchAPI = (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setWeatherInfo([response.data]);
                setError(false);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setWeatherInfo([]);
            });
    };

    useEffect(() => {
        fetchAPI('Mumbai');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
            <div className="w-full max-w-md bg-red rounded-xl shadow-md p-6">
                <form onSubmit={submitHandler} className="flex flex-col items-center  gap-4">
                    <input
                        className="w-full md:w-96 p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                        type="text"
                        value={input}
                        onChange={changeHandler}
                        placeholder="Enter city name"
                    />
                    <button
                        type="submit"
                        className="bg-green-800 hover:bg-green-800 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Search
                    </button>
                </form>

                {error ? (
                    <div className="text-red-800 mt-4 text-center">Error fetching weather data. Please try again.</div>
                ) : (
                    weatherInfo.length > 0 && (
                        <div className="mt-6 text-center space-y-2">
                            <h1 className="text-2xl font-bold">City: {weatherInfo[0].name}</h1>
                            <p className="text-lg text-black-700">Temperature: {weatherInfo[0].main.temp}°C</p>
                            <p className="text-lg">Description: {weatherInfo[0].weather[0].description}</p>
                            <p className="text-lg">Humidity: {weatherInfo[0].main.humidity}%</p>
                            <p className="text-lg text-orange-700">Sunrise: {new Date(weatherInfo[0].sys.sunrise * 1000).toLocaleTimeString()}</p>
                            <p className="text-lg text-orange-900">Sunset: {new Date(weatherInfo[0].sys.sunset * 1000).toLocaleTimeString()}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Weather;