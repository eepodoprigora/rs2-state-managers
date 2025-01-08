import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { fetchContact } from "src/store/actions/contactActions";

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector(
    (state) => state.contacts.selectedContact
  );

  useEffect(() => {
    dispatch(fetchContact(contactId || ""));
  }, [contactId, dispatch]);

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {selectedContact ? (
          <ContactCard contact={selectedContact} />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};
