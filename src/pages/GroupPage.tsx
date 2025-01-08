import React, { memo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { fetchGroupContacts } from "src/store/actions/groupActions"; // Импортируйте нужные действия
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const { groupsList } = useAppSelector((state) => state.groups);
  const { contacts } = useAppSelector((state) => state.contacts);

  const groupContacts = groupsList.find(
    (group: GroupContactsDto) => group.id === groupId
  );

  useEffect(() => {
    if (!groupContacts) {
      dispatch(fetchGroupContacts());
    }
  }, [groupId, groupContacts, dispatch]);

  const groupContactsFiltered = groupContacts
    ? contacts.filter(({ id }: ContactDto) =>
        groupContacts.contactIds.includes(id)
      )
    : [];

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {groupContactsFiltered.map((contact: ContactDto) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
