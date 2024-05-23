import { Box, useMediaQuery, useTheme } from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Sidebar } from './Desktop/Sidebar';
import SwipeableEdgeDrawer from './Mobile/SwipeableDrawer';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';

export function SavedJokes({
  likedJokes,
  setLikedJokes,
}: {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLikedJokes((prev) => {
        const oldIndex = prev!.findIndex((joke) => joke.id === active.id);
        const newIndex = prev!.findIndex((joke) => joke.id === over.id);

        return arrayMove(prev!, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const open: boolean = likedJokes !== null && likedJokes.length > 0;
  return (
    <>
      {isMobile && open ? (
        <SwipeableEdgeDrawer
          likedJokes={likedJokes}
          setLikedJokes={setLikedJokes}
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}>
          <SortableContext
            items={likedJokes ? likedJokes : []}
            strategy={verticalListSortingStrategy}>
            <Box component='nav'>
              <Sidebar
                likedJokes={likedJokes}
                setLikedJokes={setLikedJokes}
              />
            </Box>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
}
