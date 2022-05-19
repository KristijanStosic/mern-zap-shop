import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Message({ severity, children }) {
  return (
    <Stack  spacing={2}>
      <Alert sx={{ alignItems: 'center',  width: '100%', mt: 2 }} severity={severity}>{children}</Alert>
    </Stack>
  )
}

export default Message
