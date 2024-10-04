import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';

import {
  Chip,
  Form,
  FormControl,
  FormControlFeedback,
  FormLabel,
  FormGroup,
  StatefulButton,
  Icon,
} from '@openedx/paragon';
import { Close, PersonSearch } from '@openedx/paragon/icons';

import messages from './messages';
import { useMasqueradeBarData } from './hooks';
import './index.scss';

export const MasqueradeBar = () => {
  const { authenticatedUser } = React.useContext(AppContext);

  const {
    canMasquerade,
    isMasquerading,
    isMasqueradingFailed,
    isMasqueradingPending,
    masqueradeInput,
    masqueradeErrorMessage,
    handleMasqueradeInputChange,
    handleClearMasquerade,
    handleMasqueradeSubmit,
    formatMessage,
  } = useMasqueradeBarData({ authenticatedUser });

  if (!canMasquerade) { return null; }

  return (
    <div className="w-100 shadow-sm px-2 d-flex justify-content-center">
      <Form className="masquerade-bar d-flex align-items-center">
        {isMasquerading ? (
          <>
            <FormLabel inline className="masquerade-form-label mb-0 mr-2">
              <Icon src={PersonSearch} className="mr-2" />
              {formatMessage(messages.ViewingAs)}
            </FormLabel>
            <Chip
              className="masquerade-chip"
              iconAfter={Close}
              onClick={handleClearMasquerade}
            >
              {masqueradeInput}
            </Chip>
          </>
        ) : (
          <>
            <FormLabel inline id="masquerade-form-label" className="masquerade-form-label mb-0 mr-2">
              <Icon src={PersonSearch} className="mr-2" />
              {formatMessage(messages.ViewAs)}
            </FormLabel>
            <FormGroup isInvalid={isMasqueradingFailed} className="masquerade-form-input mb-0 mr-2">
              <FormControl
                value={masqueradeInput}
                onChange={handleMasqueradeInputChange}
                floatingLabel={formatMessage(messages.StudentNameInput)}
                aria-labelledby="masquerade-form-label"
              />
              {isMasqueradingFailed && (
                <FormControlFeedback type="invalid" hasIcon={false}>
                  {formatMessage(masqueradeErrorMessage)}
                </FormControlFeedback>
              )}
            </FormGroup>
            <StatefulButton
              disabled={!masqueradeInput.length}
              variant="brand"
              onClick={handleMasqueradeSubmit(masqueradeInput)}
              labels={{
                default: formatMessage(messages.SubmitButton),
              }}
              className="ml-2"
              state={isMasqueradingPending ? 'pending' : 'default'}
              type="submit"
            />
          </>
        )}
      </Form>
    </div>
  );
};

export default MasqueradeBar;
