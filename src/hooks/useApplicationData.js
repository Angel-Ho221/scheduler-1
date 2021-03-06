import { useState, useEffect } from 'react';

import axios from 'axios';

import 'components/Application.scss';

export default function useApplicationData() {
  const [state, setState] = useState({
    dayName: 'Monday',
    days: [],
    appointments: [],
    interviewers: {},
  });

  const setDay = (dayName) => setState((prev) => ({ ...prev, dayName }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,
        }));
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => axios.get('/api/days'))
      .then((response) => {
        const days = response.data;
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => axios.get('/api/days'))
      .then((response) => {
        const days = response.data;
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
