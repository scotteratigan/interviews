/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Interviews({ interviews, performInterview }) {
  const classes = useStyles();
  if (interviews.length === 0) {
    return null;
  }
  const totals = interviews.reduce(
    (total, current) => ({
      distance: total.distance + current.distance,
      travelHours: total.travelHours + current.travelHours,
    }),
    { distance: 0, travelHours: 0 },
  );

  return (
    <section>
      <h2>Scheduled Interviews</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Travel Method</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>Travel Time</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map(
              ({
                location,
                distance,
                transport,
                travelHours,
                interviewed,
                // offeredJob,
              }) => (
                <TableRow key={location}>
                  <TableCell>{location}</TableCell>
                  <TableCell>{transport}</TableCell>
                  <TableCell>{distance} mi</TableCell>
                  <TableCell>{travelHours} hours</TableCell>
                  <TableCell>
                    {!interviewed && (
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => performInterview(location)}
                      >
                        Interview
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ),
            )}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell>{totals.distance} mi</TableCell>
              <TableCell>{totals.travelHours} hours</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

Interviews.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  performInterview: PropTypes.func.isRequired,
};
