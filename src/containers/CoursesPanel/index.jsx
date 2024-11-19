import React, { useState } from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Button,
} from '@openedx/paragon';
import { reduxHooks } from 'hooks';
import {
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import NoCoursesView from './NoCoursesView';

import CourseList from './CourseList';

import { useCourseListData } from './hooks';

import messages from './messages';

import './index.scss';
import { EnrollmentCodeModal } from '../../components/EnrollmentCodeModal/index'

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="course-list-container">
      <div className="course-list-heading-container py-4">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container flex justify-content-end">
          <Button variant="outline-primary" className="mr-2" onClick={() => setIsModalOpen(true)}>Enrollment Code</Button>
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>
      {hasCourses ? (
        <PluginSlot
          id="course_list"
        >
          <CourseList {...courseListData} />
        </PluginSlot>
      ) : (
        <PluginSlot
          id="no_courses_view"
        >
          <NoCoursesView />
        </PluginSlot>
      )}
      <EnrollmentCodeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
