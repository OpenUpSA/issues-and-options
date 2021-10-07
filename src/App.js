import ReactGA from 'react-ga';
import Index from './components/issues_and_options';

function App() {
  ReactGA.initialize('UA-47810266-2');
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <Index />
  );
}

export default App;
