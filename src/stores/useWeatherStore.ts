import { create } from 'zustand';

type WeatherState = {
  weatherList: { [key: string]: string };
};

const useWeatherStore = create<WeatherState>(() => ({
  weatherList: {
    rain: '비가 왔어요.',
    sunny: '화창했어요.',
    snow: '눈이 내렸어요.',
    cloudy: '구름이 많았어요.',
    dust: '황사 소식이 있었어요.',
  },
}));

export default useWeatherStore;
