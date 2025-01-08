import { memo, useEffect } from "react";

import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { fetchGroupContacts } from "src/store/actions/groupActions";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const GroupListPage = memo(() => {
  const { groupsList } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroupContacts());
  }, [dispatch]);

  return (
    <Row xxl={4}>
      {groupsList.map((groupContacts: GroupContactsDto) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
