import { makeAutoObservable } from "mobx";
import { Api } from "src/api";
import { ContactDto } from "src/types/dto/ContactDto";
import { groupsStore } from "src/store/groupsStore";
import { FilterFormValues } from "src/components/FilterForm";

class ContactsStore {
  contactsList: ContactDto[] = [];
  filteredContacts: ContactDto[] = []; // Это массив, который будет хранить отфильтрованные контакты
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  *getContacts() {
    this.isLoading = true;
    this.error = null;

    try {
      const data: ContactDto[] = yield Api.get<ContactDto[]>(
        "http://localhost:3000/data/contacts.json"
      );
      this.contactsList = data;
      this.filteredContacts = data; // Изначально показываем все контакты
    } catch (error) {
      this.error = "Не удалось загрузить контакты.";
    } finally {
      this.isLoading = false;
    }
  }

  filterContacts(values: Partial<FilterFormValues>) {
    let filtered = this.contactsList;

    if (values.name) {
      const nameLower = values.name.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(nameLower)
      );
    }

    if (values.groupId && groupsStore.groupsList.length) {
      const group = groupsStore.groupsList.find(
        (group) => group.id === values.groupId
      );
      if (group) {
        filtered = filtered.filter((contact) =>
          group.contactIds.includes(contact.id)
        );
      }
    }

    this.filteredContacts = filtered; // Обновляем отфильтрованные контакты
  }
}

export const contactsStore = new ContactsStore();
