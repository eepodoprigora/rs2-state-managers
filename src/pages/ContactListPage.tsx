import { memo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import {
  filterContacts,
  setContacts,
  useGetContactsQuery,
} from "src/store/contacts";
import { setGroups, useGetGroupsQuery } from "src/store/groups";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ContactDto } from "src/types/dto/ContactDto";

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();

  const filteredContacts = useAppSelector(
    (state) => state.contacts.filteredContacts
  );

  const { data: contacts, isLoading, error } = useGetContactsQuery();
  const { data: groups } = useGetGroupsQuery();

  useEffect(() => {
    if (contacts) {
      dispatch(setContacts(contacts));
    }
    if (groups) {
      dispatch(setGroups(groups));
    }
  }, [contacts, dispatch, groups]);

  const handleSubmit = (values: Partial<FilterFormValues>) => {
    let filteredContacts = contacts || [];

    if (values.name) {
      const nameLower = values.name.toLowerCase();
      filteredContacts = filteredContacts.filter((contact) =>
        contact.name.toLowerCase().includes(nameLower)
      );
    }

    if (values.groupId && groups) {
      const group = groups.find((group) => group.id === values.groupId);
      if (group) {
        filteredContacts = filteredContacts.filter((contact) =>
          group.contactIds.includes(contact.id)
        );
      }
    }

    dispatch(filterContacts({ contacts: filteredContacts }));
  };

  if (isLoading) {
    return <p>Загрузка контактов...</p>;
  }

  if (error) {
    return (
      <p>
        Ошибка:{" "}
        {typeof error === "string"
          ? error
          : "Произошла ошибка при загрузке данных."}
      </p>
    );
  }

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
          {filteredContacts?.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
