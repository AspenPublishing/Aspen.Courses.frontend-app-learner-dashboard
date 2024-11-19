import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  Form,
  ModalDialog,
} from '@openedx/paragon';

import { nullMethod } from 'utils';

import useEmailData from './hooks';
import messages from './messages';

const CustomSwitch = ({ checked, onChange }) => {
  return (
    <div 
      onClick={onChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <div style={{
        width: '44px',
        height: '24px',
        backgroundColor: checked ? '#00262B' : '#E9ECEF',
        borderRadius: '12px',
        position: 'relative',
        transition: 'background-color 0.2s',
        marginRight: '8px'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {checked ? (
            <span style={{ 
              color: '#00262B',
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: 1
            }}>✓</span>
          ) : (
            <span style={{ 
              color: '#454545',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: 1
            }}>×</span>
          )}
        </div>
      </div>
      <span style={{ color: '#454545' }}>
        {checked ? 'Course emails are on' : 'Course emails are off'}
      </span>
    </div>
  );
};

export const EmailSettingsModal = ({
  closeModal,
  show,
  cardId,
}) => {
  const {
    isOptedOut,
    onToggle,
    save,
  } = useEmailData({ closeModal, cardId });
  const { formatMessage } = useIntl();

  return (
    <ModalDialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
      title=""
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
        <h4>{formatMessage(messages.header)}</h4>
        <CustomSwitch 
          checked={!isOptedOut} 
          onChange={() => onToggle()}
        />
        <p>{formatMessage(messages.description)}</p>
        <ActionRow>
          <Button variant="tertiary" onClick={closeModal}>
            {formatMessage(messages.nevermind)}
          </Button>
          <Button onClick={save}>{formatMessage(messages.save)}</Button>
        </ActionRow>
      </div>
    </ModalDialog>
  );
};
EmailSettingsModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EmailSettingsModal;
