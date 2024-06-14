import { compose } from '@reduxjs/toolkit';
import { withStore } from './with-store';
import { withRouter } from './with-router';

export const withProviders = compose<() => JSX.Element>(withRouter, withStore);
