import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <span className="text-4xl">⚠️</span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                An unexpected error occurred. You can try reloading this page or going back to the
                dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Try again
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="w-full flex justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Return to Dashboard
              </button>
            </div>

            {/* Optional: Show error message in dev mode or for easier debugging */}
            {import.meta.env?.MODE === 'development' && this.state.error && (
              <div className="mt-6 text-left">
                <p className="text-xs font-semibold text-red-600 mb-2">
                  Error details (Development only):
                </p>
                <pre className="text-[10px] overflow-auto bg-red-50 text-red-900 p-4 rounded-xl max-h-48 border border-red-100">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
