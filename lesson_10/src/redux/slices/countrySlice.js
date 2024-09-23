// src/redux/slices/countrySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронна дія для отримання країн
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://655655bc84b36e3a431f9829.mockapi.io/countries"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Асинхронна дія для видалення країни
export const deleteCountry = createAsyncThunk(
  "countries/deleteCountry",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://655655bc84b36e3a431f9829.mockapi.io/countries/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка станів для fetchCountries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обробка станів для deleteCountry
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = state.countries.filter(
          (country) => country.id !== action.payload
        );
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;
