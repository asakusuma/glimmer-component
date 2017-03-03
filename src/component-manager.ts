import {
  getOwner,
  setOwner
} from '@glimmer/di';
import {
  Bounds,
  CompiledProgram,
  ComponentManager as GlimmerComponentManager,
  Component as GlimmerComponent,
  EvaluatedArgs,
  PrimitiveReference,
  Simple,
  VM
} from '@glimmer/runtime';
import {
  UpdatableReference
} from '@glimmer/object-reference';
import {
  PathReference,
  VersionedPathReference
} from '@glimmer/reference';
import { Opaque } from '@glimmer/util';
import Component, { ComponentOptions } from './component';
import ComponentDefinition from './component-definition';
import Environment from './environment';

export function GlimmerID(vm: VM): PathReference<string> {
  let self = vm.getSelf().value() as { _guid: string };
  return PrimitiveReference.create(`glimmer${self._guid}`);
}

export default class ComponentManager<GlimmerComponent> implements GlimmerComponentManager<Component> {
  private env: Environment;

  static create(env: Environment) {
    return new ComponentManager(env);
  }

  constructor(env: Environment) {
    this.env = env;
  }

  prepareArgs(definition: ComponentDefinition<Component>, args: EvaluatedArgs): EvaluatedArgs {
    return args;
  }

  create(environment: Environment, definition: ComponentDefinition<Component>, args: EvaluatedArgs) {
    let options: ComponentOptions = {
      args: args.named.value()
    };
    setOwner(options, getOwner(this.env));

    let component = definition.componentFactory.create(options);

    // TODO
    // component.didInitAttrs({ attrs });
    // component.didReceiveAttrs({ oldAttrs: null, newAttrs: attrs });
    // component.willInsertElement();
    // component.willRender();

    return component;
  }

  layoutFor(definition: ComponentDefinition<Component>, component: Component, env: Environment): CompiledProgram {
    return env.compiledLayouts[definition.name];
  }

  templateFor(component: Component, env: Environment) {

  }

  getSelf(component: Component): VersionedPathReference<Opaque> {
    return new UpdatableReference(component);
  }

  didCreateElement(component: Component, element: Simple.Element) {
    component.element = element;
  }

  didRenderLayout(component: Component, bounds: Bounds) {
    // component.bounds = bounds;
  }

  didCreate(component: Component) {
    // TODO
    // component.didInsertElement();
    // component.didRender();
  }

  getTag() {
    return null;
  }

  update(component: Component, args: EvaluatedArgs) {
    component.args = args.named.value();
  }

  didUpdateLayout() {}

  didUpdate() {}

  getDestructor() {
    return null;
  }
}
