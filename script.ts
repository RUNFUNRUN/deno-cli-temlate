import { parseArgs } from 'jsr:@std/cli@1.0.6/parse-args';

const help = () => console.log('Your help message here');

const flags = parseArgs(Deno.args, {
  boolean: ['help', 'test'],
  string: ['name'],
  alias: {
    help: 'h',
    name: 'n',
    test: 't',
  },
  default: {
    test: true,
  },
  negatable: ['test'],
  unknown: (arg, key) => {
    if (key) {
      console.log(`script: illegal option ${arg}`);
      help();
      Deno.exit(1);
    }
  },
});

if (flags.help) {
  help();
  Deno.exit();
}

if (flags.name) {
  console.log(`Hello ${flags.name}!`);
}

if (flags.test) {
  console.log('test is true default.');
}

if (flags._.length > 0) {
  for (const arg of flags._) {
    console.log(`no option arg: ${arg}`);
  }
}
