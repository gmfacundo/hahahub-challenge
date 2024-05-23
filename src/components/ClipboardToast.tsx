import { Alert, Snackbar, useTheme } from '@mui/material';
import { AlertInterface } from '@/interfaces/AlertInterface';

export function ClipboardToast({
  openAlert,
  setOpenAlert,
}: {
  openAlert: AlertInterface;
  setOpenAlert: React.Dispatch<React.SetStateAction<AlertInterface>>;
}) {
  const theme = useTheme();
  const handleClose = () => {
    setOpenAlert({
      ...openAlert,
      open: false,
    });
  };

  const { vertical, horizontal, open } = openAlert;
  return (
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
        severity='success'
        variant='outlined'
        sx={{
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.dark}`,
          color: 'black',
        }}>
        Link copied to clipboard!
      </Alert>
    </Snackbar>
  );
}
