import './CurrentWeather.scss';
import { currentCity, setCurrentWeather } from '@/redux/features/currentCity/currentCitySlice';
import { addFavorite, removeFavorite, allFavorites } from '@/redux/features/favorites/favoritesSlice';
import { temperatureUnit } from '@/redux/features/temperatureUnit/temperatureUnit';
import { useGetCurrentWeatherQuery } from '@/redux/service/accuweatherApi';
import { useState, useEffect } from 'react';
import { theme } from '@/redux/features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { skipToken } from '@reduxjs/toolkit/query';

export default function CurrentWeather() {
	const currentTheme = useAppSelector(theme);
	const city = useAppSelector(currentCity);
	const favorites = useAppSelector(allFavorites);
	const unit = useAppSelector(temperatureUnit);
	const dispatch = useAppDispatch();
	const { data, isLoading, isError } = useGetCurrentWeatherQuery(city.city?.key ?? skipToken);
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavoriteStatus = () => {
		if (!isFavorite) dispatch(addFavorite(city));
		else dispatch(removeFavorite(city));
		setIsFavorite((prev) => !prev);
	};

	useEffect(() => {
		if (data) dispatch(setCurrentWeather(data[0]));
	}, [data, dispatch]);

	useEffect(() => {
		for (const favorite of favorites.favorites) {
			if (favorite.city?.key === city.city?.key) setIsFavorite(true);
		}
		return () => setIsFavorite(false);
	}, [favorites, city]);

	if (isLoading)
		return (
			<div className="current-weather-container">
				<h1 style={{ fontSize: '2rem', marginLeft: '2.5rem' }}>Loading...</h1>
			</div>
		);

	if (isError)
		return (
			<div className="current-weather-container">
				<h1 style={{ fontSize: '2rem', marginLeft: '2.5rem' }}>We got an error, try again later.</h1>
			</div>
		);

	return (
		<div className="current-weather-container">
			<div className="base-info">
				<h1>{city.city?.name}</h1>
			</div>
			<div className="add-to-favorites">
				<button onClick={handleFavoriteStatus}>
					<img
						src={isFavorite ? './heart-filled.svg' : './heart-empty.svg'}
						alt="favorite"
						title="favorite"
						data-theme={isFavorite ? 'light' : currentTheme.theme}
					/>
				</button>
			</div>
			<div className="temperature">
				<h2>
					{unit.unit === 'F'
						? (city.currentWeather?.Temperature?.Metric?.Value * 1.8 + 32).toFixed()
						: city.currentWeather?.Temperature?.Metric?.Value.toFixed()}
					&deg;{unit.unit}
				</h2>
			</div>
			<div className="weatherText">
				<h1>{city.currentWeather?.WeatherText}</h1>
			</div>
		</div>
	);
}
