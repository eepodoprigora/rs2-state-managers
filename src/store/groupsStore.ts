import { makeAutoObservable } from "mobx";
import { Api } from "src/api";

import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

class GroupsStore {
  groupsList: GroupContactsDto[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  *getGroups() {
    this.isLoading = true;
    this.error = null;

    try {
      const data: GroupContactsDto[] = yield Api.get<GroupContactsDto[]>(
        "http://localhost:3000/data/groups.json"
      );
      this.groupsList = data;
    } catch (error) {
      this.error = "Не удалось загрузить группы.";
    } finally {
      this.isLoading = false;
    }
  }
}

export const groupsStore = new GroupsStore();
