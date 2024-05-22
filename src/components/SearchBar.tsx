import { useState } from 'react';
import { LikedJokes } from '@/context/types/Context';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar({
  likedJokes,
  setFilteredJokes,
  isMobile = false,
}: {
  likedJokes: LikedJokes;
  setFilteredJokes: React.Dispatch<React.SetStateAction<LikedJokes>>;
  isMobile?: boolean;
}) {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handleChange = (value: string) => {
    setIsLoading(true);
    setValue(value);
    debouncedFilter(value);
  };

  const debouncedFilter = useDebouncedCallback((search) => {
    const filteredJokes = likedJokes!.filter((joke) =>
      joke.joke.includes(search)
    );
    setFilteredJokes(filteredJokes);
    setIsLoading(false);
  }, 1000);
  return (
    <>
      <Box marginTop='1rem' paddingBottom='1rem'>
        <TextField
          hiddenLabel
          variant='filled'
          value={value}
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.light,
            borderRadius: `${isMobile ? 0 : '4px'}`,
            '.MuiInputBase-root': {
              borderRadius: `${isMobile ? 0 : '4px'}`,
            },
            '& label': {
              paddingLeft: '2.5rem',
              '&.Mui-focused': {
                color: theme.palette.grey[700],
              },
            },
          }}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: `${isMobile && '2rem'}` },
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '2rem',
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {isLoading ? (
                  <CircularProgress size='2rem' />
                ) : (
                  value && (
                    <IconButton onClick={() => handleChange('')}>
                      <CancelRoundedIcon
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '2rem',
                        }}
                      />
                    </IconButton>
                  )
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Box>
      <Divider />
    </>
  );
}
