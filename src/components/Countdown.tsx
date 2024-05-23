import { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';

export function Countdown() {
  const [seconds, setSeconds] = useState<number>(10);
  const [progress, setProgress] = useState<number>(0);
  const [reset, setReset] = useState<boolean>(false);
  const { setFetchNewJoke } = useAppContext();
  const theme = useTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout = setInterval(() => {}, 0);
    let timeout: NodeJS.Timeout = setInterval(() => {}, 0);

    const updateProgress = () => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          setReset(true); // Activate reset flag
          setProgress(0);
          setSeconds(10);
          return 100;
        }
        return oldProgress + 1;
      });
    };

    const startIntervals = () => {
      interval = setInterval(() => {
        setSeconds((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);

      timeout = setInterval(updateProgress, 100);
    };

    if (reset) {
      setFetchNewJoke(true);
      clearInterval(interval);
      clearInterval(timeout);
      setTimeout(() => {
        // Wait 1 second before deactivate reset flag
        setReset(false);
        startIntervals();
      }, 1000);
    } else {
      startIntervals();
    }

    return () => {
      clearInterval(interval);
      clearInterval(timeout);
    };
  }, [reset]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <Typography variant='h6' color='black' paddingBlock='10px'>
        Next joke in {seconds} seconds
      </Typography>
      <LinearProgress
        variant='determinate'
        value={progress}
        sx={{
          width: '30rem',
          height: '10px',
          '&': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.primary.light,
          },
          borderRadius: '5px',
        }}
      />
    </Box>
  );
}
