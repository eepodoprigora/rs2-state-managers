import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { setContacts, useGetContactsQuery } from "src/store/contacts";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { ContactDto } from "src/types/dto/ContactDto";

export const FavoritListPage = memo(() => {
  const { favoriteContacts } = useAppSelector((state) => state.favourites);
  const { contactsList } = useAppSelector((state) => state.contacts);

  const [favoriteContactsData, setFavoriteContactsData] = useState<
    ContactDto[]
  >([]);

  const { data: fetchedContacts, isLoading } = useGetContactsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      fetchedContacts &&
      fetchedContacts.length > 0 &&
      contactsList.length === 0
    ) {
      dispatch(setContacts(fetchedContacts));
    }
  }, [fetchedContacts, contactsList, dispatch]);

  useEffect(() => {
    setFavoriteContactsData(contactsList.slice(0, 4));
  }, [contactsList, favoriteContacts]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

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
