import React, { useState } from 'react';
import { ModalDialog, Button, Form, Icon } from '@openedx/paragon';
import { Error } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import messages from './messages';

export const EnrollmentCodeModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const intl = useIntl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      setErrorMessage(intl.formatMessage(messages.errorEmptyCode));
      setIsSubmitting(false);
      return;
    }

    try {
      const client = getAuthenticatedHttpClient();
      const response = await client.post(`${getConfig().LMS_BASE_URL}/remote_authn/verify_entitlements_code/`, {
        redeem_code: trimmedCode,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        if (typeof data.details === 'string') {
          setErrorMessage(data.details);
        } else {
          setErrorMessage(intl.formatMessage(messages.errorUnexpected));
        }
      } else {
        setErrorMessage(intl.formatMessage(messages.errorUnexpected));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = () => {
    if (!errorMessage) return null;
    
    return (
      <div className="alert alert-danger border-0 bg-light-danger mb-4" role="alert">
        <div className="d-flex">
          <div className="flex-shrink-0">
            <Icon
              src={Error}
              className="text-danger-500"
              size="sm"
            />
          </div>
          <div className="flex-grow-1 ms-2 ml-2">
            <h3 className="h4 alert-heading mb-2">
              {intl.formatMessage(messages.errorTitle)}
            </h3>
            <p className="mb-2">
              {intl.formatMessage(messages.errorTryAgain)}
            </p>
            <p className="mb-0">
              {intl.formatMessage(messages.errorContactSupport)}{' '}
              <a 
                href={`mailto:${intl.formatMessage(messages.errorSupportEmail)}`}
                className="text-danger"
              >
                {intl.formatMessage(messages.errorSupportEmail)}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ModalDialog
      title={!isSuccess ? intl.formatMessage(messages.title) : intl.formatMessage(messages.success)}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      hasCloseButton
      isFullscreenOnMobile={false}
      renderFooter={false}
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {!isSuccess ? intl.formatMessage(messages.title) : intl.formatMessage(messages.success)}
        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        {!isSuccess ? (
          <>
            <p className="mb-4">
              {intl.formatMessage(messages.description)}
            </p>
            
            {renderError()}

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="sr-only">
                  {intl.formatMessage(messages.codePlaceholder)}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="redeem_code"
                  placeholder={intl.formatMessage(messages.codePlaceholder)}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={32}
                  required
                />
                <Form.Text className="text-muted">
                  {intl.formatMessage(messages.codeNote)}
                </Form.Text>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-4"
                disabled={isSubmitting}
              >
                {intl.formatMessage(isSubmitting ? messages.submitting : messages.submit)}
              </Button>
            </Form>
          </>
        ) : (
          <>
            <p className="success-message">
              {intl.formatMessage(messages.successMessage)}
            </p>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => window.location.reload()}
            >
              {intl.formatMessage(messages.goToDashboard)}
            </Button>
          </>
        )}
      </ModalDialog.Body>
    </ModalDialog>
  );
}; 