import React, { memo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import {
  fetchContacts,
  filterContacts,
} from "src/store/actions/contactActions";

import { fetchGroupContacts } from "src/store/actions/groupActions";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ContactDto } from "src/types/dto/ContactDto";

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state) => state.contacts.filteredContacts);
  const groupContacts = useAppSelector((state) => state.groups.groupsList);
  const loading = useAppSelector((state) => state.contacts.loading);
  const error = useAppSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchGroupContacts());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка контактов...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  const handleSubmit = (values: Partial<FilterFormValues>) => {
    dispatch(filterContacts(values));
  };

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupContacts}
          initialValues={{}}
          onSubmit={handleSubmit}
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
