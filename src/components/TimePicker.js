import React from 'react';
import { Form } from 'react-bootstrap';

const TimePicker = ({ hour, minute, ampm, onHourChange, onMinuteChange, onAmPmChange,name }) => {
  return (
    <div>
      <Form.Group controlId="timeInput">
        <Form.Label>Time</Form.Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Control
             name={name}
            as="select"
            value={hour}
            onChange={onHourChange}
            style={{ marginRight: '5px' }}
          >
            {[...Array(12).keys()].map((hour) => (
              <option key={hour + 1}>{hour + 1}</option>
            ))}
          </Form.Control>
          <span>:</span>
          <Form.Control
          name={name}
            as="select"
            value={minute}
            onChange={onMinuteChange}
            style={{ margin: '0 5px' }}
          >
            {['00', '15', '30', '45'].map((minute) => (
              <option key={minute}>{minute}</option>
            ))}
          </Form.Control>
          <Form.Select
             name={name}
            value={ampm}
            onChange={onAmPmChange}
            style={{ marginLeft: '5px' }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Form.Select>
        </div>
      </Form.Group>
    </div>
  );
}

export default TimePicker;