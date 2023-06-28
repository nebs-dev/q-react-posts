import React from 'react';
import { render, screen } from '@testing-library/react';
import LogContext from '../src/context/LogContext';

describe('LogContext', () => {
  it('provides the log message to consumers', () => {
    render(
      <LogContext.Provider value={{ logMessage: 'Test message' }}>
        <LogContext.Consumer>
          {(value) => <div>{value.logMessage}</div>}
        </LogContext.Consumer>
      </LogContext.Provider>
    );

    const logMessageElement = screen.getByText('Test message');
    expect(logMessageElement).toBeInTheDocument();
  });

  it('uses the default log message if no provider is available', () => {
    render(
      <LogContext.Consumer>
        {(value) => <div>{value.logMessage}</div>}
      </LogContext.Consumer>
    );

    const defaultLogMessageElement = screen.getByText('Hello from');
    expect(defaultLogMessageElement).toBeInTheDocument();
  });
});
