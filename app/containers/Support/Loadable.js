/**
 * Asynchronously loads component
 */
import Loadable from 'react-loadable';
import LoadingForComponent from 'components/LoadingBeat';

export default Loadable({
    loader: () => import('./index'),
    loading: LoadingForComponent,
});
