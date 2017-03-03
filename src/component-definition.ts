import {
  ComponentClass,
  ComponentDefinition as GlimmerComponentDefinition,
  Component as GlimmerComponent
} from '@glimmer/runtime';
import ComponentManager from './component-manager';
import Component from './component';
import ComponentFactory from './component-factory';

export default class ComponentDefinition<GlimmerComponent> extends GlimmerComponentDefinition<Component> {
  public name: string;
  public manager: ComponentManager<Component>;
  public ComponentClass: ComponentClass;
  public componentFactory: ComponentFactory;

  constructor(name: string, manager: ComponentManager<Component>, ComponentClass: ComponentClass) {
    super(name, manager, ComponentClass);
    this.componentFactory = new ComponentFactory(ComponentClass);
  }
}
