import {
  Environment,
  CompiledBlock
} from '@glimmer/runtime';

import {
  Dict
} from '@glimmer/util';

interface StandaloneEnvironment extends Environment {
  compiledLayouts: Dict<CompiledBlock>;
};

export default StandaloneEnvironment;