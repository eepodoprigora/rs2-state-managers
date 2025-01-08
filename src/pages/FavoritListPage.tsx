import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { fetchFavourites } from "src/store/actions/favouriteactions";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ContactDto } from "src/types/dto/ContactDto";

export const FavoritListPage = memo(() => {
  const dispatch = useAppDispatch();
  const { favoriteContacts } = useAppSelector((state) => state.favorites);
  const { contacts } = useAppSelector((state) => state.contacts);

  const [favoriteContactsData, setFavoriteContactsData] = useState<
    ContactDto[]
  >([]);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  useEffect(() => {
    const selectedContacts = contacts.filter((contact: ContactDto) =>
      favoriteContacts.includes(contact.id)
    );
    setFavoriteContactsData(selectedContacts);
  }, [contacts, favoriteContacts]);

  return (
    <Row xxl={4} className="g-4">
      {favoriteContactsData.map((contact: ContactDto) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
