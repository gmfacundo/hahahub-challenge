'use client';

import {
  Alert,
  Box,
  Container,
  Snackbar,
  SnackbarOrigin,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';
import './styles.css';
import { useAppContext } from '@/hooks/useAppContext';
import { Sidebar } from '@/components/Sidebar';
import { useState } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Fade from '@mui/material/Fade';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}

interface AlertInterface extends SnackbarOrigin {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

export default function MainPage() {
  const [openAlert, setOpenAlert] = useState<AlertInterface>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    Transition: Fade,
  });

  const { likedJokes, setLikedJokes, curJokeId } = useAppContext();

  const { vertical, horizontal, open } = openAlert;
  const theme = useTheme();

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      const basePath = new URL(window.location.href).origin;
      const url = `${basePath}/?joke=${curJokeId}`;
      navigator.clipboard.writeText(url);

      setOpenAlert({ ...openAlert, open: true, Transition });
    };

  const handleClose = () => {
    setOpenAlert({
      ...openAlert,
      open: false,
    });
  };

  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        margin: '0px',
      }}
      className='app-container'>
      <Box
        component='main'
        sx={{
          p: 3,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginRight: '-30vw',
          ...(likedJokes &&
            likedJokes?.length > 0 && {
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginRight: 0,
            }),
          position: 'relative',
        }}
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Header />
        <JokeCard />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '1.5rem',
          }}>
          <Typography variant='h5' color='#5C5C5C'>
            You really liked this one?{' '}
            <span
              onClick={handleClick(SlideTransition)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Share it with a friend!
            </span>
          </Typography>
        </Box>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={2000}
          onClose={handleClose}
          TransitionComponent={openAlert.Transition}
          key={openAlert.Transition.name}
          sx={{
            position: 'absolute',
          }}>
          <Alert
            icon={false}
            // onClose={handleClose}
            severity='success'
            variant='outlined'
            color='warning'
            sx={{
              width: '100%',
              backgroundColor: '#FECCA7',
              border: '1px solid #8F3C1E',
              color: 'black',
            }}>
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
      <Box component='nav'>
        <Sidebar likedJokes={likedJokes} setLikedJokes={setLikedJokes} />
      </Box>
    </Container>
  );
}
