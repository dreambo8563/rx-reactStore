import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';
import deepEqual from 'deep-equal';
export Provider from './provider'
export injectProps from './injectProps'

export const store = new ReplaySubject(1)
    .map(subStore => Object({
    ...subStore
}))
    .distinctUntilChanged((a, b) => deepEqual(a, b))

export const createStore = (initialState, name, parnetStore = store) => {
    const keys = Object.keys(initialState)
    parnetStore.next({[name]: initialState})
    const selfStream = new ReplaySubject(1)
    selfStream.next(initialState)

    let result = {
        updateStore: new ReplaySubject(1)
    }
    keys.forEach(key => {
        if (!!initialState[key] && typeof(initialState[key]) === 'object' && !Array.isArray(initialState[key])) {

            const subNode = createStore(initialState[key], key, selfStream)
            result[key] = {
                ...subNode
            }
        } else {
            result[key] = new Subject()
        }

    })
    selfStream.subscribe(result.updateStore)

    result
        .updateStore
        .withLatestFrom(parnetStore, selfStream, (change, store, nextStore) => {
            return {
                [name]: {
                    ...store[name],
                    ...nextStore,
                    ...change
                }
            }
        })
        .subscribe(parnetStore)
    return result
}
