import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useGetContactQuery } from "src/store/contacts";
import { useAppSelector } from "src/store/hooks";

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();

  const selectedContactFromStore = useAppSelector((state) =>
    state.contacts.contactsList.find((contact) => contact.id === contactId)
  );

  const {
    data: selectedContactFromQuery,
    isLoading,
    error,
  } = useGetContactQuery(contactId || "", { skip: !!selectedContactFromStore });

  const selectedContact = selectedContactFromStore || selectedContactFromQuery;

  if (isLoading) {
    return <p>Загрузка контакта...</p>;
  }

  if (error) {
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
};
