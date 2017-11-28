var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { render } from '@stencil/core/testing';
import { DaySpinner } from '../component';
describe('day-spinner', () => {
    it('should build', () => {
        expect(new DaySpinner()).toBeTruthy();
    });
    describe('rendering', () => {
        let element;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            element = yield render({
                components: [DaySpinner],
                html: '<day-spinner></day-spinner>'
            });
        }));
        it('should work without parameters', () => {
            expect(element.textContent).toMatch(/DaySpinner/);
        });
    });
});
