import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import {
  Alert,
  Box,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface AlertInterface extends SnackbarOrigin {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}

export function Share({
  path,
  curJokeId,
}: {
  path: URL | null;
  curJokeId: string;
}) {
  const [openAlert, setOpenAlert] = useState<AlertInterface>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    Transition: Fade,
  });

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

  return (
    <>
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
    </>
  );
}
