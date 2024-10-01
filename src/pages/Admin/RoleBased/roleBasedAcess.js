import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Form, Spinner } from 'react-bootstrap';
import BasicTable from '../../../components/BasicTable';
import {
  useGetRoleAccessQuery,
  useEditRoleAccessMutation,
  useGetRoleQuery,
} from '../../../redux/api/RoleAccessApi';
import { toast } from 'react-toastify';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import ServerError from '../../../components/ServerError';

const RoleBasedAccess = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Technician');
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const role = getRole();
  const {
    data: roleData,
    isError, 
    error,
    refetch: refetchRoleAccess,
    isLoading,
  } = useGetRoleAccessQuery({
    selectedRole: selectedRole,
    role: role,
  });
  const { data: roleListData } = useGetRoleQuery({ role: role });
  const [editRoleAccess] = useEditRoleAccessMutation({ role: role });

  useEffect(() => {
    if (roleData && roleData.data) {
      setData(roleData.data.modules);
      setRead(roleData.moduleAccess.read);
      setWrite(roleData.moduleAccess.write);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [roleData, read, write,error,isError]);
  

  useEffect(() => {
    if (roleListData && roleListData.data) {
      setRoles(roleListData.data);
      if (!roleListData.data.includes(selectedRole)) {
        setSelectedRole('Technician');
      }
    }
  }, [roleListData]);

  useEffect(() => {
    refetchRoleAccess({ role: selectedRole });
  }, [selectedRole]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleCheckboxChange = (moduleId, field) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item._id === moduleId) {
          const newItem = { ...item, [field]: !item[field] };
          if (field === 'fullAccess') {
            newItem.read = newItem.fullAccess;
            newItem.write = newItem.fullAccess;
          } else if (field === 'write') {
            newItem.read = true;
            newItem.fullAccess = false;
          } else if (field === 'read' && !newItem.read) {
            newItem.write = false;
            newItem.fullAccess = false;
          }
          return newItem;
        }
        return item;
      })
    );
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    console.log('Data before formatting:', data);

    const formattedData = {
      modules: data.map((module) => ({
        moduleName: module.moduleName,
        read: module.read,
        write: module.write,
        fullAccess: module.fullAccess,
      })),
    };
    try {
      const response = await editRoleAccess({
        selectedRole: selectedRole,
        data: formattedData,
        role: role,
      });

      if (response.data) {
        toast.success('Changes saved successfully', { autoClose: 1000 });
        refetchRoleAccess();
      } else {
        toast.error('Failed to save changes', { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const COLUMNS = [
    { Header: 'Module Name', accessor: 'name' },
    {
      Header: 'Read',
      accessor: 'read',
      Cell: ({ row }) => (
        <label className="custom-checkbox my-2">
          <input
            disabled={!write}
            type="checkbox"
            checked={row.original.read || false}
            onChange={() => handleCheckboxChange(row.original._id, 'read')}
          />
          <span className="checkmark"></span>
        </label>
      ),
    },
    {
      Header: 'Write',
      accessor: 'write',
      Cell: ({ row }) => (
        <label className="custom-checkbox my-2">
          <input
            type="checkbox"
            disabled={!write}
            checked={row.original.write || false}
            onChange={() => handleCheckboxChange(row.original._id, 'write')}
          />
          <span className="checkmark"></span>
        </label>
      ),
    },
    {
      Header: 'Full Access',
      accessor: 'fullAccess',
      Cell: ({ row }) => (
        <label className="custom-checkbox my-2">
          <input
            disabled={!write}
            type="checkbox"
            checked={row.original.fullAccess || false}
            onChange={() =>
              handleCheckboxChange(row.original._id, 'fullAccess')
            }
          />
          <span className="checkmark"></span>
        </label>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
        {hasServerError ? (
         <ServerError/>
        ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4 align-items-center">
                <Col xs={12} sm={6}>
                  <h4 className="fw-bold">Role & Module Access</h4>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  className="d-flex justify-content-end align-items-center"
                >
                  <Form.Select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="me-2"
                    style={{ width: '200px' }}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Select>
                  {write && (
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        'Save'
                      )}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="boxShadow p-4 mb-4">
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={data}
                  isPagination={false}
                  isHeading={false}
                />
              </Row>
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}
    </div>
  );
};

export default RoleBasedAccess;
