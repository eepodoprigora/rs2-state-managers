import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { contactsStore } from "src/store/contactsStore";

export const ContactPage = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();

  const selectedContactFromStore = contactsStore.contactsList.find(
    (contact) => contact.id === contactId
  );

  if (!selectedContactFromStore && contactId) {
    contactsStore.getContacts();
  }

  const selectedContact = selectedContactFromStore;

  if (contactsStore.isLoading) {
    return <p>Загрузка контакта...</p>;
  }

  if (contactsStore.error) {
    return <p>Ошибка загрузки контакта.</p>;
  }

  return (
    <Row xxl={3}>
      <Col className="mx-auto">
        {selectedContact ? (
          <ContactCard contact={selectedContact} />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
});
