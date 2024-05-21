import {
  Alert,
  Box,
  Button,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';
import './styles.css';
import { useEffect, useState } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Fade from '@mui/material/Fade';
import { Countdown } from '@/components/Countdown';
import { useJoke } from '@/hooks/useJoke';
import { JokeHookReturn } from '@/types/HookReturn';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';

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
export function MainContent({
  curJokeId,
  likedJokes,
  setLikedJokes,
}: {
  curJokeId: string;
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const [openAlert, setOpenAlert] = useState<AlertInterface>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    Transition: Fade,
  });
  const [path, setPath] = useState<URL | null>(null);

  useEffect(() => {
    if (window !== undefined) setPath(new URL(window.location.href));
  }, [curJokeId]);

  const { joke, isLoading, error }: JokeHookReturn = useJoke();

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      const basePath = path && path.origin;
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

  const { vertical, horizontal, open } = openAlert;
  const theme = useTheme();

  return (
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
      <JokeCard
        joke={joke}
        isLoading={isLoading}
        error={error}
        likedJokes={likedJokes}
        setLikedJokes={setLikedJokes}
      />
      {!error || (!isLoading && joke.joke.length > 0) ? (
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
      ) : null}

      {path && !/[?&]joke=/.test(path.search) ? (
        <Countdown />
      ) : !isLoading ? (
        <Button variant='contained'>Get another joke</Button>
      ) : null}
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
  );
}
