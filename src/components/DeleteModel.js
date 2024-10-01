import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

const DeleteModel = (props) => {
  const [loading, setLoading] = useState(false);

  const handleYesClick = async () => {
    setLoading(true);
    try {
      await props.YES();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal show={props.DELETESTATE} onHide={props.ONCLICK} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.DELETETITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.DESCRIPTION} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleYesClick} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  className="mx-1"
                />
                Deleting...
              </>
            ) : (
              'Yes'
            )}
          </Button>
          <Button variant="secondary" onClick={props.ONCLICK}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModel;
