import React from 'react';

interface LogContextProps {
  logMessage: string;
}

const LogContext = React.createContext<LogContextProps>({
  logMessage: 'Hello from',
});

export default LogContext;
