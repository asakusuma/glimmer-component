import {
  Environment,
  CompiledProgram
} from '@glimmer/runtime';

import {
  Dict
} from '@glimmer/util';

interface StandaloneEnvironment extends Environment {
  compiledLayouts: Dict<CompiledProgram>;
};

export default StandaloneEnvironment;