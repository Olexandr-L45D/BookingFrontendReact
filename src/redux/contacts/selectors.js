import { createSelector } from "@reduxjs/toolkit";
import { selectStatusFilter } from "../filters/selectors";

export const selectLoading = state => state.contacts.loading;

export const selectFilter = state => state.contacts.filter;

export const selectError = state => state.contacts.error;

export const selectContacts = state => state.contacts.items;

// Фінальний селектор з фільтрацією
export const selectOutContacts = createSelector(
  [selectContacts, selectStatusFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    const normalized = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name?.toLowerCase().includes(normalized) ||
        contact.phoneNumber?.toLowerCase().includes(normalized) ||
        contact.email?.toLowerCase().includes(normalized) ||
        contact.role?.toLowerCase().includes(normalized)
    );
  }
);
// export const selectOutContacts = createSelector(
//   [selectContacts, selectStatusFilter],
//   (contacts, filter) => {
//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//         contact.phoneNumber?.includes(filter)
//     );
//   }
// );
