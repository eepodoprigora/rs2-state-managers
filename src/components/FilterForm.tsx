import { Formik } from "formik";
import { debounce } from "lodash";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { memo } from "react";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export interface FilterFormValues {
  name: string;
  groupId: string;
}

interface FilterFormProps {
  initialValues: Partial<FilterFormValues>;
  groupContactsList: GroupContactsDto[];
  onSubmit: (values: Partial<FilterFormValues>) => void;
}

export const FilterForm = memo<FilterFormProps>(
  ({ initialValues, groupContactsList, onSubmit }) => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue, submitForm }) => {
          const debouncedSubmit = debounce(submitForm, 300);
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}>
              <Row xxl={4} className="g-4">
                <Col>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="name"
                      name="name"
                      value={values.name || ""}
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                        debouncedSubmit();
                      }}
                      placeholder="name"
                      aria-label="name"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Select
                    id="groupId"
                    name="groupId"
                    value={values.groupId || ""}
                    onChange={(e) => {
                      setFieldValue("groupId", e.target.value);
                      debouncedSubmit();
                    }}
                    aria-label="Поиск по группе">
                    <option>Open this select menu</option>
                    {groupContactsList.map((groupContacts) => (
                      <option value={groupContacts.id} key={groupContacts.id}>
                        {groupContacts.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    Применить
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    );
  }
);
