import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { Button } from '@openedx/paragon';

import useCardDetailsData from './hooks';
import './index.scss';

export const CourseCardDetails = ({ cardId }) => {
  const {
    accessMessage,
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    changeOrLeaveSessionMessage,
  } = useCardDetailsData({ cardId });
  
  const courseRunData = reduxHooks.useCardCourseRunData(cardId);
  const now = new Date();
  const startDate = courseRunData?.startDate ? new Date(courseRunData.startDate) : null;
  const endDate = courseRunData?.endDate ? new Date(courseRunData.endDate) : null;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <span className="small" data-testid="CourseCardDetails">
      {startDate && (
        <span style={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ 
            color: '#209C48',
            display: 'inline-flex',
            alignItems: 'flex-start',
            gap: '4px'
          }}>
            <svg width="18" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2px' }}>
              <path d="M6.75313 12.7531C6.4875 13.0719 6.0125 13.0719 5.71875 12.7531L3.71875 10.7531C3.42812 10.4875 3.42812 10.0125 3.71875 9.71875C4.0125 9.42813 4.4875 9.42813 4.75313 9.71875L6.25 11.1906L9.21875 8.21875C9.5125 7.92812 9.9875 7.92812 10.2531 8.21875C10.5719 8.5125 10.5719 8.9875 10.2531 9.25313L6.75313 12.7531ZM4 0C4.41563 0 4.75 0.335938 4.75 0.75V2H9.25V0.75C9.25 0.335938 9.58438 0 10 0C10.4156 0 10.75 0.335938 10.75 0.75V2H12C13.1031 2 14 2.89531 14 4V14C14 15.1031 13.1031 16 12 16H2C0.895313 16 0 15.1031 0 14V4C0 2.89531 0.895313 2 2 2H3.25V0.75C3.25 0.335938 3.58437 0 4 0ZM12.5 6H1.5V14C1.5 14.275 1.72375 14.5 2 14.5H12C12.275 14.5 12.5 14.275 12.5 14V6Z" fill={startDate < now ? "#209C48" : "#00262B"} />
            </svg>
            <span style={{ letterSpacing: '0.14em' }}>
              <span>{startDate < now ? 'Started ' : 'Starts '}</span>
              <span style={{ color: '#3C3734' }}>{formatDate(startDate)}</span>
            </span>
          </span>

          {endDate && (
            <>
              <div style={{
                height: '24px',
                width: '1px',
                backgroundColor: '#BDC2C8',
                margin: '0 8px'
              }} />
              
              <span style={{ 
                color: '#DC2B2B',
                display: 'inline-flex',
                alignItems: 'flex-start',
                gap: '4px'
              }}>
                <svg width="18" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2px' }}>
                  <path d="M6.75313 12.7531C6.4875 13.0719 6.0125 13.0719 5.71875 12.7531L3.71875 10.7531C3.42812 10.4875 3.42812 10.0125 3.71875 9.71875C4.0125 9.42813 4.4875 9.42813 4.75313 9.71875L6.25 11.1906L9.21875 8.21875C9.5125 7.92812 9.9875 7.92812 10.2531 8.21875C10.5719 8.5125 10.5719 8.9875 10.2531 9.25313L6.75313 12.7531ZM4 0C4.41563 0 4.75 0.335938 4.75 0.75V2H9.25V0.75C9.25 0.335938 9.58438 0 10 0C10.4156 0 10.75 0.335938 10.75 0.75V2H12C13.1031 2 14 2.89531 14 4V14C14 15.1031 13.1031 16 12 16H2C0.895313 16 0 15.1031 0 14V4C0 2.89531 0.895313 2 2 2H3.25V0.75C3.25 0.335938 3.58437 0 4 0ZM12.5 6H1.5V14C1.5 14.275 1.72375 14.5 2 14.5H12C12.275 14.5 12.5 14.275 12.5 14V6Z" fill="#DC2B2B" />
                </svg>
                <span style={{ letterSpacing: '0.14em' }}>
                  <span>{endDate < now ? 'Ended ' : 'Ends '}</span>
                  <span style={{ color: '#3C3734' }}>{formatDate(endDate)}</span>
                </span>
              </span>
            </>
          )}
        </span>
      )}

      {isEntitlement && isFulfilled && canChange ? (
        <>
          {' • '}
          <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
            {changeOrLeaveSessionMessage}
          </Button>
        </>
      ) : null}
    </span>
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
