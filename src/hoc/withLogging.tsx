import React, { useContext, useEffect } from 'react';
import LogContext from './../context/LogContext';

type ComponentType<P = undefined> = React.ComponentType<P>;

interface WithLoggingProps {
  logMessage?: string;
}

const withLogging = <P extends object>(
  WrappedComponent: ComponentType<P & WithLoggingProps>
): React.FC<P & WithLoggingProps> => {
  const WithLogging: React.FC<P & WithLoggingProps> = (props) => {
    const { logMessage: contextLogMessage } = useContext(LogContext);
    const { logMessage = contextLogMessage } = props;

    useEffect(() => {
      console.log(`${logMessage} ${getComponentName(WrappedComponent)}`);
    }, [logMessage]);

    return <WrappedComponent {...props} />;
  };

  WithLogging.displayName = `WithLogging(${getComponentName(WrappedComponent)})`;

  return WithLogging;
};

const getComponentName = (WrappedComponent: ComponentType<any>) => {  
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withLogging;
