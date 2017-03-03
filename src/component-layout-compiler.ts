import {
  ComponentLayoutBuilder,
  templateFactory
} from '@glimmer/runtime';

export default class ComponentLayoutCompiler {
  static id: string = 'glimmer';
  
  template: string;

  constructor(template: string) {
    this.template = template;
  }

  compile(builder: ComponentLayoutBuilder) {
    let env = builder.env;
    let factory = templateFactory(JSON.parse(this.template));
    let layout = factory.create(env).asLayout();
    builder.fromLayout(layout);
    builder.attrs.static('class', 'glimmer-component');
    // TODO builder.attrs.dynamic('role', ariaRole);
  }
}
