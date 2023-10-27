import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, SIZE, ROLE } from 'baseui/modal';
import { Button } from 'baseui/button';

const EventModal = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }

  const { title, start, commitData } = event;
  const { author, message } = commitData;

  return (
    <React.Fragment>
    <Modal onClose={onClose} isOpen={isOpen}
      closeable
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            'z-index': 20
          })
        }
      }}
      >
      <ModalHeader>Event Details</ModalHeader>
      <ModalBody>
        <p>Title: {title}'s commit</p>
        <p>Start Time: {start.toString()}</p>
        <p>Author: {author.name}</p>
        <p>Email: {author.email}</p>
        <p>Message: {message}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
    </React.Fragment>
  );
};

export default EventModal;
