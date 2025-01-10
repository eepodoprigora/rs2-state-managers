import React, { memo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useGetGroupQuery } from "src/store/groups";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setContacts, useGetContactsQuery } from "src/store/contacts";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state) => state.contacts.contactsList);

  const {
    data: group,
    isLoading,
    error,
  } = useGetGroupQuery(groupId ?? "", {
    skip: !groupId,
  });

  const { data: fetchedContacts } = useGetContactsQuery(undefined, {
    skip: contacts.length > 0,
  });

  useEffect(() => {
    if (fetchedContacts && fetchedContacts.length > 0) {
      dispatch(setContacts(fetchedContacts));
    }
  }, [fetchedContacts, dispatch]);

  if (isLoading) {
    return <p>Загрузка группы...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки группы.</p>;
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
