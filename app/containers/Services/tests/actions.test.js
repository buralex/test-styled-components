
import {LOAD_CATEGORIES} from '../constants/types';

import {changeUsername} from '../actions';

describe('Home Actions', () => {
    describe('changeUsername', () => {
        it('should return the correct type and the passed name', () => {
            const fixture = 'Max';
            const expectedResult = {
                type: LOAD_CATEGORIES,
                name: fixture,
            };

            expect(changeUsername(fixture)).toEqual(expectedResult);
        });
    });
});
