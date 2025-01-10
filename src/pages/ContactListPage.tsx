import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { contactsStore } from "src/store/contactsStore";

import { ContactDto } from "src/types/dto/ContactDto";
import { groupsStore } from "src/store/groupsStore";

export const ContactListPage = observer(() => {
  useEffect(() => {
    if (!contactsStore.contactsList?.length) {
      contactsStore.getContacts();
      groupsStore.getGroups();
    }
  }, []);

  const handleSubmit = (values: Partial<FilterFormValues>) => {
    contactsStore.filterContacts(values);
  };

  if (contactsStore.isLoading) {
    return <p>Загрузка контактов...</p>;
  }

  if (contactsStore.error) {
    return (
      <p>
        Ошибка:{" "}
        {typeof contactsStore.error === "string"
          ? contactsStore.error
          : "Произошла ошибка при загрузке данных."}
      </p>
    );
  }
  const filteredContacts = contactsStore.filteredContacts ?? [];
  const groups = groupsStore.groupsList ?? [];

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          initialValues={{}}
          onSubmit={handleSubmit}
          groupContactsList={groups || []}
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {filteredContacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
