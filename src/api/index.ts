export class Api {
  static async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Ошибка запроса: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      throw error;
    }
  }
}
