// contactsSlice.js (це окрема локаль - locale-slice для конактів)
import { createSlice } from "@reduxjs/toolkit";
import { fetchContact, addContact, deleteContact } from "./operations";

import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "contacts",
  initialState: {
    // items: [  зразок масива з початковими данними який раніше при рендеру компонента відображався на сторінці (тобто в принципі працювало , тільки далі була помилка при мепі відповіді з сервера!)
    //   {
    //     id: "1",
    //     name: "Olena",
    //     phoneNumber: "380123456789",
    //     email: "123Olena@gmail.com ",
    //     role: "business",
    //   },
    // ],
    items: [], // важливо, щоб був масив
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContact.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c._id !== action.payload._id);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default slice.reducer;

// console.log(slice.reducer);

// return (contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())))
