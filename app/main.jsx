import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import route from './route/route';
import store from './redux/store';
import { Provider } from 'react-redux';

store.subscribe(function () {
    //    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('app')
);

