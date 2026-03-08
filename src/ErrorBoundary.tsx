import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div id="crash-report" style={{ padding: 20, background: 'white', color: 'red' }}>
                    <h1>CRASH_REPORT_START</h1>
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                    <h1>CRASH_REPORT_END</h1>
                </div>
            );
        }
        return this.props.children;
    }
}
