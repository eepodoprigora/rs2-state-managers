import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { groupsStore } from "src/store/groupsStore";

export const GroupListPage = observer(() => {
  useEffect(() => {
    if (!groupsStore.groupsList.length) {
      groupsStore.getGroups();
    }
  }, []);

  if (groupsStore.isLoading) {
    return <p>Загрузка групп...</p>;
  }

  if (groupsStore.error) {
    return <p>Ошибка загрузки групп.</p>;
  }

  if (!groupsStore.groupsList || groupsStore.groupsList.length === 0) {
    return <Empty />;
  }

  return (
    <Row xxl={4} className="g-4">
      {groupsStore.groupsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
