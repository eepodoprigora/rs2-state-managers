import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { useGetGroupsQuery } from "src/store/groups";
import { Empty } from "src/components/Empty";

export const GroupListPage = memo(() => {
  const { data: groupsList, isLoading, error } = useGetGroupsQuery();

  if (isLoading) {
    return <p>Загрузка групп...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки групп.</p>;
  }

  if (!groupsList || groupsList.length === 0) {
    return <Empty />;
  }

  return (
    <Row xxl={4} className="g-4">
      {groupsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
