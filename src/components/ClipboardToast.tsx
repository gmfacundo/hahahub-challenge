import { AlertInterface } from '@/interfaces/AlertInterface';
import { Alert, Snackbar } from '@mui/material';

export function ClipboardToast({
  openAlert,
  setOpenAlert,
}: {
  openAlert: AlertInterface;
  setOpenAlert: React.Dispatch<React.SetStateAction<AlertInterface>>;
}) {
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
          backgroundColor: '#FECCA7',
          border: '1px solid #8F3C1E',
          color: 'black',
        }}>
        Link copied to clipboard!
      </Alert>
    </Snackbar>
  );
}
