import React from 'react';
import {
  AppBar,
  fade,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `rgba(0,0,0,.32)`,
  },
  heading: {
    flex: 1,
  },
  button: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    padding: `4px 10px`,
    marginRight: '5px',
    color: 'white',
  },
  [theme.breakpoints.up('xs')]: {},
  searchContainer: {
    position: 'relative',
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    transition: `width 0.1s linear`,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('xs')]: {
      width: '45%',
    },
  },
  search: {
    position: 'relative',
    marginLeft: 0,
    flex: 1,
    [theme.breakpoints.up('xs')]: {},
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerWidth: {
    width: '300px',
    padding: '10px',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.heading}>
          Yoo
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
