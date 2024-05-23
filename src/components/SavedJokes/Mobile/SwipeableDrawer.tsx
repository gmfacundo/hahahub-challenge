import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Global, css } from '@emotion/react';
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import { SearchBar } from '../SearchBar';
import { EmptyList } from '../EmptyList';
import SwipePuller from './SwipePuller';

const drawerBleeding = 56;

export default function SwipeableEdgeDrawer({
  likedJokes,
  setLikedJokes,
}: {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [filteredJokes, setFilteredJokes] = useState<LikedJokes | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    likedJokes && setFilteredJokes(filterJokes(likedJokes, searchValue));
  }, [likedJokes, searchValue]);

  const filterJokes = (jokes: LikedJokes, value: string) => {
    return jokes!.filter((joke) =>
      joke.joke.toLowerCase().includes(value.toLowerCase())
    );
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClick = (jokeId: string) => {
    router.push(`/?joke=${jokeId}`);
    setOpen(false);
  };

  const handleDelete = (jokeId: string) => {
    const updatedJokes = likedJokes!.filter((joke) => joke.id !== jokeId);
    setLikedJokes(updatedJokes);
  };

  const leadingActions = (jokeId: string) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleDelete(jokeId)} destructive={true}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            backgroundColor: '#F34D11',
            display: 'flex',
            justifyContent: 'flex-end !important',
            alignItems: 'center',
            height: '100%',
          }}>
          <DeleteIcon
            style={{
              color: theme.palette.primary.dark,
              fontSize: '3.5rem',
            }}
          />
        </Box>
      </SwipeAction>
    </LeadingActions>
  );

  const style = css`
    .MuiDrawer-root > .MuiPaper-root {
      height: calc(50% - ${drawerBleeding}px);
      overflow: visible;
    }

    .swipeable-list-item {
      margin-bottom: 5px;
    }
    #listItem-${item} .swipeable-list-item__leading-actions {
      z-index: 1;
      border-radius: 0px 5px 5px 0px;
      box-shadow: 3px 0px 5px 1px rgba(0, 0, 0, 0.32);
    }

    #listItem-${item} .swipeable-list-item__content {
      margin-left: ${isSwiping ? '-5px' : '0px'};
    }
  `;

  return (
    <>
      <CssBaseline />
      <Global styles={style} />
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}>
        <SwipePuller />
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            paddingBottom: 2,
            height: '100%',
            overflow: 'auto',
          }}>
          {open && (
            <SwipeableList threshold={0.35} destructiveCallbackDelay={500}>
              <SearchBar
                likedJokes={likedJokes}
                setFilteredJokes={setFilteredJokes}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isMobile
              />
              {filteredJokes && filteredJokes.length ? (
                filteredJokes.map((joke, index) => (
                  <SwipeableListItem
                    key={joke.id}
                    leadingActions={leadingActions(joke.id)}
                    fullSwipe={false}
                    onSwipeStart={() => {
                      setIsSwiping(true);
                      setItem(index + 1);
                    }}
                    onSwipeEnd={() => setIsSwiping(false)}>
                    <Card
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        width: '100%',
                      }}
                      onClick={() => handleClick(joke.id)}>
                      <CardContent
                        sx={{
                          '&:last-child': { paddingBottom: '16px' },
                        }}>
                        <Typography variant='h6'>{joke.joke}</Typography>
                      </CardContent>
                    </Card>
                  </SwipeableListItem>
                ))
              ) : likedJokes && likedJokes.length ? (
                <EmptyList />
              ) : null}
            </SwipeableList>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
}
