const { BrowserRouter, Route, Redirect } = require('react-router-dom');
const h = require('react-hyperscript');
const _ = require('lodash');
const uuid = require('uuid');

const Home = require('./components/home');
const Editor = require('./components/editor');
const Debug = require('./components/debug');
const DocumentFiller = require('./components/document-filler');
const ExampleDocument = require('./components/example-document');

const { MFE0, MFE1, MFE2 } = require('./components/multi-form-editor/');
const LandingPage = require('./components/multi-form-editor/landing-page');

let routes = [
  {
    path: '/',
    render: () => {
      return h(LandingPage);
    }
  },
  {
    path: '/home',
    render: () => {
      return h(Home);
    }
  },
  {
    path: '/edit0/:id',
    render: props => {
      let params = props.match.params;

      return h( MFE0, {
        id: params.id
      } );
    }
  },
  {
    path: '/edit0/:id/:secret',
    render: props => {
      let params = props.match.params;

      return h( MFE0, {
        id: params.id,
        secret: params.secret
      } );
    }
  },
  {
    path: '/edit1/:id/:secret',
    render: props => {
      let params = props.match.params;

      return h( MFE1, {
        id: params.id,
        secret: params.secret
      } );
    }
  },
  {
    path: '/edit2/:id/:secret',
    render: props => {
      let params = props.match.params;

      return h( MFE2, {
        id: params.id,
        secret: params.secret
      } );
    }
  },
  {
    path: '/debug',
    render: () => {
      return h(Debug);
    }
  },
  {
    path: '/example-document',
    render: props => {
      return h( ExampleDocument, props );
    }
  },
  {
    path: '/debug/new-document',
    render: () => {
      let id = uuid();
      let secret = uuid();

      return h( Redirect, {
        to: {
          pathname: `/document/${id}/${secret}`
        }
      } );
    }
  },
  {
    path: '/debug/new-document/fill',
    render: () => {
      return h( DocumentFiller );
    }
  },
  {
    path: '/document/:id',
    render: props => {
      let params = props.match.params;

      return h( Editor, {
        id: params.id
      } );
    }
  },
  {
    path: '/document/:id/:secret',
    render: props => {
      let params = props.match.params;

      return h( Editor, {
        id: params.id,
        secret: params.secret
      } );
    }
  }
].map( spec => {
  spec = _.defaults( spec, {
    exact: true
  } );

  return h( Route, spec );
} );

module.exports = () => (
  h( BrowserRouter, [
    h( 'div', routes )
  ] )
);
