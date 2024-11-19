import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'enrollment.modal.title',
    defaultMessage: 'Have an Enrollment Code?',
  },
  description: {
    id: 'enrollment.modal.description',
    defaultMessage: 'If you have an enrollment code, click on Redeem Enrollment Code to get started.',
  },
  codeLabel: {
    id: 'enrollment.code.label',
    defaultMessage: 'Code',
  },
  codePlaceholder: {
    id: 'enrollment.code.placeholder',
    defaultMessage: 'Enter Code Here',
  },
  codeNote: {
    id: 'enrollment.code.note',
    defaultMessage: 'Note: Your enrollment code can only be redeemed once.',
  },
  submit: {
    id: 'enrollment.submit',
    defaultMessage: 'REDEEM ENROLLMENT CODE',
  },
  submitting: {
    id: 'enrollment.submitting',
    defaultMessage: 'Redeeming...',
  },
  errorEmptyCode: {
    id: 'enrollment.error.emptyCode',
    defaultMessage: 'Please enter an enrollment code.',
  },
  errorUnexpected: {
    id: 'enrollment.error.unexpected',
    defaultMessage: 'An unexpected error occurred. Please try again.',
  },
  errorTitle: {
    id: 'enrollment.error.title',
    defaultMessage: 'Could not redeem enrollment code',
  },
  errorTryAgain: {
    id: 'enrollment.error.tryAgain',
    defaultMessage: 'Please try again.',
  },
  errorContactSupport: {
    id: 'enrollment.error.contactSupport',
    defaultMessage: 'If you need additional assistance, contact us at',
  },
  errorSupportEmail: {
    id: 'enrollment.error.supportEmail',
    defaultMessage: 'jd.next@aspenpublishing.com',
  },
});

export default messages;
