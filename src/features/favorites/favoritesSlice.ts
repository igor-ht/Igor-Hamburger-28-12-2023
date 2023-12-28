import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../state/store';
import { CurrentCityType } from '../currentCity/currentCitySlice';

interface FavoritesI {
	favorites: CurrentCityType[];
}

const initialState: FavoritesI = {
	favorites: [
		{
			city: {
				key: 215854,
				name: 'Netanya',
			},
			forecast: {
				WeatherText: 'Partly Cloud',
				HasPrecipitation: false,
				Temperature: {
					Metric: { Value: 19.4, Unit: 'C', UnitType: 17 },
					Imperial: { Value: 67, Unit: 'F', UnitType: 18 },
				},
			},
		},
		{
			city: {
				key: 215854,
				name: 'Tel Aviv',
			},
			forecast: {
				WeatherText: 'Partly Cloud',
				HasPrecipitation: false,
				Temperature: {
					Metric: { Value: 19.4, Unit: 'C', UnitType: 17 },
					Imperial: { Value: 67, Unit: 'F', UnitType: 18 },
				},
			},
		},
	],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			for (const fav of state.favorites) {
				if (fav.city.key === action.payload.city.key) return;
			}
			state.favorites.push(action.payload);
		},
		removeFavorite: (state, action) => {
			state = { favorites: state.favorites.filter((favorite) => favorite.city.key === action.payload.city.key) };
		},
	},
});

export const allFavorites = (state: RootState) => state.favorites;

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
