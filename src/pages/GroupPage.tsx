import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { contactsStore } from "src/store/contactsStore";
import { groupsStore } from "src/store/groupsStore";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();

  useEffect(() => {
    if (!groupsStore.groupsList.length) {
      groupsStore.getGroups();
    }
    if (!contactsStore.contactsList.length) {
      contactsStore.getContacts();
    }
  }, []);

  const group = groupsStore.groupsList.find((group) => group.id === groupId);
  const contacts = contactsStore.contactsList;

  if (groupsStore.isLoading || contactsStore.isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (groupsStore.error || contactsStore.error) {
    return <p>Ошибка загрузки данных.</p>;
  }

  if (!group) {
    return <Empty />;
  }

  const groupContactsFiltered = contacts.filter(({ id }) =>
    group.contactIds.includes(id)
  );

  return (
    <Row className="g-4">
      <Col xxl={12}>
        <Row xxl={3}>
          <Col className="mx-auto">
            <GroupContactsCard groupContacts={group} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {groupContactsFiltered.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
