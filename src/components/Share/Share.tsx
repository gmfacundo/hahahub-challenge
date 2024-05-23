import { useState } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { Box, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ClipboardToast } from '../ClipboardToast';
import { AlertInterface } from '@/interfaces/AlertInterface';

import './styles.css';

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '1.5rem',
        }}>
        <Typography variant='h5' color='black'>
          You really liked this one?{' '}
          <span onClick={handleClick(SlideTransition)} className='share'>
            Share it with a friend!
          </span>
        </Typography>
      </Box>
      <ClipboardToast openAlert={openAlert} setOpenAlert={setOpenAlert} />
    </>
  );
}
