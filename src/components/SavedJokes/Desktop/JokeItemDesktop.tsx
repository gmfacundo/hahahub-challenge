import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import JokeInterface from '@/interfaces/JokeInterface';

function JokeItemDesktop({
  joke,
  likedJokes,
  setLikedJokes,
}: {
  joke: JokeInterface;
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = (jokeId: string) => {
    router.push(`/?joke=${jokeId}`);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    jokeId: string
  ) => {
    e.stopPropagation();
    const updatedJokes: JokeInterface[] = likedJokes!.filter(
      (joke: JokeInterface) => joke.id !== jokeId
    );
    setLikedJokes(updatedJokes);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: joke.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={6}
      sx={{ padding: '5px 2rem 5px 5px' }}
      style={{
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: theme.palette.primary.light,
        ...style,
      }}
      onClick={() => handleClick(joke.id)}>
      <Box display='flex' alignItems='center'>
        <IconButton>
          <DragIndicatorIcon
            {...attributes}
            {...listeners}
            fontSize='small'
            sx={{
              color: theme.palette.grey[700],
              cursor: 'grab',
              outline: 'none',
            }}
          />
        </IconButton>
        <Typography variant='subtitle2'>{joke.joke}</Typography>
        <IconButton
          onClick={(e) => handleDelete(e, joke.id)}
          style={{
            position: 'absolute',
            top: '1px',
            right: '1px',
            padding: '4px',
          }}>
          <DeleteIcon
            fontSize='medium'
            sx={{ color: theme.palette.grey[700] }}
          />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default JokeItemDesktop;
