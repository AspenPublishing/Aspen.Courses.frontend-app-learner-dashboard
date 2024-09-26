import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Card,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const RedeemEntitlementCode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const intl = useIntl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const client = getAuthenticatedHttpClient();
      const response = await client.post('/remote_authn/verify_entitlements_code/', {
        redeem_code: code,
      });

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setErrorMessage(intl.formatMessage({ id: 'dashboard.invalidCode', defaultMessage: 'Invalid code. Please try again.' }));
      }
    } catch (error) {
      setErrorMessage(intl.formatMessage({ id: 'dashboard.errorOccurred', defaultMessage: 'An error occurred. Please try again later.' }));
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCode('');
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <Card className="mb-4 shadow-md p-4 bg-primary-light">
      <Card.Body>
        <h3>{intl.formatMessage({ id: 'dashboard.haveEnrollmentCode', defaultMessage: 'Have an Enrollment Code?' })}</h3>
        <p>
          {intl.formatMessage({
            id: 'dashboard.enrollmentCodeInstructions',
            defaultMessage: 'If you have an enrollment code, click on Redeem Enrollment Code to get started.',
          })}
        </p>
        <Button onClick={() => setIsModalOpen(true)} className="mb-3">
          {intl.formatMessage({ id: 'dashboard.redeemEnrollmentCode', defaultMessage: 'Redeem Enrollment Code' })}
        </Button>
        <p className="small text-muted">
          {intl.formatMessage({ id: 'dashboard.codeRedeemOnce', defaultMessage: 'Note: Your enrollment code can only be redeemed once.' })}
        </p>
      </Card.Body>

      <Modal
        size="lg"
        className="modal-dialog-centered"
        open={isModalOpen}
        title={
          intl.formatMessage({ id: 'dashboard.enterEnrollmentCode', defaultMessage: 'Enter Your Enrollment Code' })
        }
        body={(
          !isSuccess ? (
            <>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({ id: 'dashboard.placeCodeHere', defaultMessage: 'Place code here' })}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={32}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Button type="submit">
                    {intl.formatMessage({ id: 'dashboard.redeemEnrollmentCode', defaultMessage: 'Redeem Enrollment Code' })}
                  </Button>
                </Form.Group>
              </Form>
              <p className="small text-muted mt-3">
                {intl.formatMessage({ id: 'dashboard.codeRedeemOnce', defaultMessage: 'Note: Your enrollment code can only be redeemed once.' })}
              </p>
            </>
          ) : (
            <>
              <h2>{intl.formatMessage({ id: 'dashboard.success', defaultMessage: 'Success!' })}</h2>
              <p>
                {intl.formatMessage({ id: 'dashboard.codeAccepted', defaultMessage: 'The code you entered was accepted and you are enrolled in the course. You can access your course from your dashboard.' })}
              </p>
              <Button variant="primary" onClick={handleClose}>
                {intl.formatMessage({ id: 'dashboard.goToDashboard', defaultMessage: 'Go to My Dashboard' })}
              </Button>
            </>
          )
        )}
        onClose={handleClose}
        footerNode={null}
      />
    </Card>
  );
};

export default RedeemEntitlementCode;
