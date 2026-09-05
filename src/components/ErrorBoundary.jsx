import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Catches render errors so a fault in one page section cannot white-screen the
 * whole site. Wraps <Routes> in App.jsx.
 */
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Replace with your error reporting service (Sentry, etc.) when available.
        if (import.meta.env.DEV) {
            console.error('Unhandled render error:', error, info);
        }
    }

    handleRetry = () => this.setState({ hasError: false });

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-ivory">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze mb-4">
                    Something went wrong
                </p>
                <h1 className="text-navy text-3xl md:text-4xl font-serif mb-4">
                    We hit an unexpected error
                </h1>
                <p className="text-steel max-w-md mb-8">
                    Please try again. If the problem continues, contact our team and we will
                    help you directly.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        type="button"
                        onClick={this.handleRetry}
                        className="px-6 py-3 rounded-full bg-navy text-white text-sm hover:bg-navy-light transition-colors"
                    >
                        Try again
                    </button>
                    <Link
                        to="/contact"
                        className="px-6 py-3 rounded-full border border-navy/20 text-navy text-sm hover:bg-navy/5 transition-colors"
                    >
                        Contact us
                    </Link>
                </div>
            </section>
        );
    }
}

export default ErrorBoundary;
