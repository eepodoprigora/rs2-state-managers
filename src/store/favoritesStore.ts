// store/favoritesStore.ts
import { makeAutoObservable } from "mobx";
import { ContactDto } from "src/types/dto/ContactDto";
import { contactsStore } from "./contactsStore";
import { Api } from "src/api";

class FavoritesStore {
  favoriteContacts: ContactDto[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  *getFavoriteContacts() {
    this.isLoading = true;
    this.error = null;

    if (!contactsStore.contactsList.length) {
      try {
        const data: ContactDto[] = yield Api.get<ContactDto[]>(
          "http://localhost:3000/data/contacts.json"
        );

        this.favoriteContacts = data.slice(0, 4);
      } catch (error) {
        this.error = "Не удалось загрузить контакты.";
      } finally {
        this.isLoading = false;
      }
    } else {
      this.favoriteContacts = contactsStore.contactsList.slice(0, 4);
    }
  }
}

export const favoritesStore = new FavoritesStore();
