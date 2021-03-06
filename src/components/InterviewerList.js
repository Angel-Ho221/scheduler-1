import React from 'react';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewer = props.interviewers.map((int) => (
    <InterviewerListItem
      key={int.id}
      name={int.name}
      avatar={int.avatar}
      selected={int.id === props.interviewer}
      setInterviewer={(event) => props.setInterviewer(int.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
