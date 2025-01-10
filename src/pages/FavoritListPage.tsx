// pages/FavoritListPage.tsx
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { ContactCard } from "src/components/ContactCard";
import { favoritesStore } from "src/store/favoritesStore";

export const FavoritListPage = observer(() => {
  const { favoriteContacts, isLoading, error } = favoritesStore;

  useEffect(() => {
    if (favoriteContacts.length === 0) {
      favoritesStore.getFavoriteContacts();
    }
  }, [favoriteContacts]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.length > 0 ? (
        favoriteContacts.map((contact) => (
          <Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>
        ))
      ) : (
        <p>Нет избранных контактов</p>
      )}
    </Row>
  );
});
