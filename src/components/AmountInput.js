import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    zIndex: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
}));

function AmountInput({id, label, onChange, value}) {
  const classes = useStyles();

  return (
      <TextField
        id={id}
        label={label}
        className={classes.textField}
        value={value}
        onChange={onChange}
        margin="normal"
        variant="filled"
      />
  );
}

export default AmountInput;
