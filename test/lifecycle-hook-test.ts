import Component from '../src/component';
import buildApp from './test-helpers/test-app';

const { module, test } = QUnit;

module('Lifecycle Hooks');

test('Lifecycle hook ordering', (assert) => {
  assert.expect(6);

  let invocations: [string, string][] = [];

  abstract class HookLoggerComponent extends Component {
    abstract name: string;

    didInsertElement() {
      invocations.push([this.name, 'didInsertElement']);
      assert.ok(this.element instanceof Element);
    }
  }

  class Component1 extends HookLoggerComponent { name = 'component1' }
  class Component2 extends HookLoggerComponent { name = 'component2' }
  class Component3 extends HookLoggerComponent { name = 'component3' }
  class Component4 extends HookLoggerComponent { name = 'component4' }
  class Component5 extends HookLoggerComponent { name = 'component5' }

  buildApp()
    .template('main', '<div><component-one /></div>')
    .template('component-one', '<div><component-two /><component-three /></div>')
    .template('component-two', '<div><component-four /><component-five /></div>')
    .template('component-three', '<div></div>')
    .template('component-four', '<div></div>')
    .template('component-five', '<div></div>')
    .component('component-one', Component1)
    .component('component-two', Component2)
    .component('component-three', Component3)
    .component('component-four', Component4)
    .component('component-five', Component5)
    .boot();
  
  assert.deepEqual(invocations, [
    ['component4', 'didInsertElement'],
    ['component5', 'didInsertElement'],
    ['component2', 'didInsertElement'],
    ['component3', 'didInsertElement'],
    ['component1', 'didInsertElement'],
  ]);
});
