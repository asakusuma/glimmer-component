import { Simple } from '@glimmer/runtime';

/**
 * The `Component` class defines an encapsulated UI element that is rendered to
 * the DOM. A component is made up of a template and, optionally, this component
 * object.
 *
 * ## Defining a Component
 * 
 * To define a component, subclass `Component` and add your own properties,
 * methods and lifecycle hooks:
 *
 * ```ts
 * import Component from '@glimmer/component';
 *
 * export default class extends Component {
 * }
 * ```
 *
 * ## Lifecycle Hooks
 *
 * Lifecycle hooks allow you to respond to changes to a component, such as when
 * it gets created, rendered, updated or destroyed. To add a lifecycle hook to a
 * component, implement the hook as a method on your component subclass.
 *
 * For example, to be notified when Glimmer has rendered your component so you
 * can attach a legacy jQuery plugin, implement the `didInsertElement()` method:
 *
 * ```ts
 * import Component from '@glimmer/component';
 *
 * export default class extends Component {
 *   didInsertElement() {
 *     $(this.element).pickadate();
 *   }
 * }
 * ```
 *
 * ## Data for Templates
 *
 * `Component`s have two different kinds of data, or state, that can be
 * displayed in templates:
 *
 * 1. Arguments
 * 2. Properties
 *
 * Arguments are data that is passed in to a component from its parent
 * component. For example, if I have a `user-greeting` component, I can pass it
 * a name and greeting to use:
 *
 * ```hbs
 * <user-greeting @name="Ricardo" @greeting="Olá">
 * ```
 *
 * Inside my `user-greeting` template, I can access the `@name` and `@greeting`
 * arguments that I've been given:
 *
 * ```hbs
 * {{@greeting}}, {{@name}}!
 * ```
 *
 * Arguments are also available inside my component:
 *
 * ```ts
 * console.log(this.args.greeting); // prints "Olá"
 * ```
 *
 * Properties, on the other hand, are internal to the component and declared in
 * the class. You can use properties to store data that you want to show in the
 * template, or pass to another component as an argument.
 * 
 * ```ts
 * import Component from '@glimmer/component';
 * 
 * export default class extends Component {
 *   user = {
 *     name: 'Robbie'
 *   }
 * }
 * ```
 * 
 * In the above example, we've defined a component with a `user` property that
 * contains an object with its own `name` property.
 * 
 * We can render that property in our template:
 * 
 * ```hbs
 * Hello, {{user.name}}!
 * ```
 * 
 * We can also take that property and pass it as an argument to the
 * `user-greeting` component we defined above:
 * 
 * ```hbs
 * <user-greeting @greeting="Hello" @name={{user.name}} /> 
 * ```
 * 
 * ## Arguments vs. Properties
 * 
 * Remember, arguments are data that was given to your component by its parent
 * component, and properties are data your component has defined for itself.
 * 
 * You can tell the difference between arguments and properties in templates
 * because arguments always start with an `@` sign (think "A is for arguments"):
 * 
 * ```hbs
 * {{@firstName}}
 * ```
 * 
 * We know that `@firstName` came from the parent component, not the current
 * component, because it starts with `@` and is therefore an argument.
 * 
 * On the other hand, if we see:
 * 
 * ```hbs
 * {{name}}
 * ```
 * 
 * We know that `name` is a property on the component. If we want to know where
 * the data is coming from, we can go look at our component class to find out.
 * 
 * Inside the component itself, arguments always show up inside the component's
 * `args` property. For example, if `{{@firstName}}` is `Tom` in the template,
 * inside the component `this.args.firstName` would also be `Tom`.
 */
class Component {
  /**
   * The element corresponding to the top-level element of the component's template.
   * You should not try to access this property until after the component's `didInsertElement()`
   * lifecycle hook is called.
   */
  element: Simple.Element = null;

  /**
   * Development-mode only name of the component, useful for debugging.
   */
  debugName: string = null;

  /**
   * Named arguments passed to the component from its parent component.
   * They can be accessed in JavaScript via `this.args.argumentName` and in the template via `@argumentName`.
   *
   * Say you have the following component, which will have two `args`, `firstName` and `lastName`:
   *
   * ```hbs
   * <my-component @firstName="Arthur" @lastName="Dent" />
   * ```
   *
   * If you needed to calculate `fullName` by combining both of them, you would do:
   *
   * ```ts
   * didInsertElement() {
   *   console.log("Hi,My full name is ${this.args.firstName} ${this.args.lastName");
   * }
   * ```
   *
   * While in the template you could do:
   *
   * ```hbs
   * <p>Welcome, {{@firstName}} {{@lastName}}!</p>
   * ```
   *
   */
  args: object;

  static create(injections: any) {
    return new this(injections);
  }

  /**
   * Constructs a new component and assigns itself the passed properties. You
   * should not construct new components yourself. Instead, Glimmer will
   * instantiate new components automatically as it renders.
   *
   * @param options
   */
  constructor(options: object) {
    Object.assign(this, options);
  }

  /**
   * Called when the component has been inserted into the DOM.
   * Override this function to do any set up that requires an element in the document body.
   */
  didInsertElement() { }

  /**
   * Called when the component has updated and rerendered itself.
   * Called only during a rerender, not during an initial render.
   */
  didUpdate() { }

  toString() {
    return `${this.debugName} component`;
  }
}

export default Component;

export interface ComponentFactory {
  create(injections: object): Component;
}
